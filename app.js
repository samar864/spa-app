const form = document.querySelector('#booking-form');
const modal = document.querySelector('#confirmation');
const details = document.querySelector('#confirmation-details');
const dateInput = document.querySelector('#booking-date');
dateInput.min = new Date().toISOString().split('T')[0];

document.querySelector('.menu-button').addEventListener('click', (event) => {
  const nav = document.querySelector('.main-nav');
  nav.classList.toggle('open');
  event.currentTarget.setAttribute('aria-expanded', nav.classList.contains('open'));
});

document.querySelectorAll('.main-nav a').forEach(link => link.addEventListener('click', () => document.querySelector('.main-nav').classList.remove('open')));

document.querySelectorAll('.filters button').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filters button').forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  document.querySelectorAll('.service-card').forEach(card => card.style.display = filter === 'all' || card.dataset.category === filter ? '' : 'none');
}));

document.querySelectorAll('.book-service').forEach(button => button.addEventListener('click', () => {
  const service = document.querySelector('#service-select');
  const match = [...service.options].find(option => option.value === button.dataset.service);
  if (match) service.value = match.value;
  document.querySelector('#booking').scrollIntoView({behavior: 'smooth'});
}));

document.querySelectorAll('.claim-offer').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#booking').scrollIntoView({behavior: 'smooth'});
  setTimeout(() => alert(`Offer ${button.dataset.code} will be applied when you confirm your appointment.`), 400);
}));

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const service = document.querySelector('#service-select');
  const selected = service.options[service.selectedIndex];
  const date = new Date(dateInput.value + 'T12:00:00').toLocaleDateString('en-IN', {day:'numeric', month:'long', year:'numeric'});
  const time = document.querySelector('#time-select').value;
  const guests = document.querySelector('#guests').value;
  const bookingId = `TS-${Math.floor(100000 + Math.random() * 899999)}`;
  details.innerHTML = `<strong>${selected.value}</strong><br>${date} · ${time}<br>${guests} · <strong>₹${Number(selected.dataset.price).toLocaleString('en-IN')}</strong><br><small>Booking ID: ${bookingId}</small>`;
  document.querySelector('#whatsapp-confirm').href = `https://wa.me/910000000000?text=${encodeURIComponent(`Hi Thai Spa, I would like to confirm booking ${bookingId}: ${selected.value} on ${date} at ${time}.`)}`;
  modal.classList.add('show'); modal.setAttribute('aria-hidden', 'false');
});

document.querySelector('.close-modal').addEventListener('click', () => { modal.classList.remove('show'); modal.setAttribute('aria-hidden','true'); });
modal.addEventListener('click', event => { if(event.target === modal) document.querySelector('.close-modal').click(); });
