import type { Metadata } from 'next';
import '../styles.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Thai Spa | Relax. Rejuvenate. Rediscover Yourself.',
  description: 'Thai-inspired wellness therapies, massage rituals, and deeply restorative care.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
