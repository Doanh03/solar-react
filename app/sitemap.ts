import type { MetadataRoute } from 'next';

const routes = ['', '/lap-dat-dien-mat-troi', '/san-pham', '/du-an', '/kien-thuc', '/gioi-thieu', '/lien-he', '/giai-phap/hybrid', '/giai-phap/doanh-nghiep', '/giai-phap/nha-xuong', '/san-pham/pin-luu-tru', '/dich-vu/bao-tri'];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({ url: `https://solar-react-swart.vercel.app${path}`, lastModified: new Date(), changeFrequency: 'weekly', priority: path === '' ? 1 : 0.8 }));
}
