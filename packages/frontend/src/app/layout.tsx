import type { Metadata, Viewport } from 'next';
import { ToastProvider } from '@/components/Toast';
import './globals.css';

export const metadata: Metadata = {
  title: 'Qlink - Онлайн-запись в заведения',
  description:
    'Быстрая запись в салоны красоты, парикмахерские и другие заведения. Найдите ближайшее заведение и запишитесь онлайн за 30 секунд.',
  keywords: [
    'онлайн запись',
    'салон красоты',
    'парикмахерская',
    'барбершоп',
    'запись онлайн',
    'qlink',
  ],
  authors: [{ name: 'Qlink' }],
  creator: 'Qlink',
  publisher: 'Qlink',
  icons: {
    icon: '/logo-original.png',
    apple: '/logo-original.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://qlink.ru',
    title: 'Qlink - Онлайн-запись в заведения',
    description:
      'Быстрая запись в салоны красоты, парикмахерские и другие заведения',
    siteName: 'Qlink',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Qlink - Онлайн-запись в заведения',
    description:
      'Быстрая запись в салоны красоты, парикмахерские и другие заведения',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#2563EB',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className="antialiased">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
