import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Solar Energy | Giải pháp điện mặt trời',
  description: 'Giải pháp điện mặt trời cho gia đình và doanh nghiệp. Tính toán hệ thống và nhận tư vấn theo nhu cầu thực tế.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
