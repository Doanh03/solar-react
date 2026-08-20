import type { Metadata } from 'next';
import './globals.css';
import './business-motion.css';
import './hero-electric.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mtsolar.vn';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'MT Solar | Giải pháp điện mặt trời',
    template: '%s | MT Solar',
  },
  description: 'Giải pháp điện mặt trời cho gia đình, doanh nghiệp và nhà xưởng. Tư vấn, thiết kế, thi công và đồng hành vận hành.',
  keywords: ['điện mặt trời', 'lắp đặt điện mặt trời', 'điện mặt trời gia đình', 'điện mặt trời doanh nghiệp', 'pin lưu trữ', 'MT Solar'],
  openGraph: {
    title: 'MT Solar | Giải pháp điện mặt trời',
    description: 'Thiết kế và lắp đặt hệ thống điện mặt trời theo nhu cầu sử dụng thực tế.',
    type: 'website',
    locale: 'vi_VN',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
