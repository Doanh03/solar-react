import { SolarCalculator } from '@/app/components/solar-calculator';
import { HeroSection } from '@/app/components/hero-section';
import { LeadSection } from '@/app/components/lead-section';
import { ProjectsSection } from '@/app/components/projects-section';
import { SiteFooter } from '@/app/components/site-footer';
import { SiteHeader } from '@/app/components/site-header';
import { SolutionsSection } from '@/app/components/solutions-section';

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <HeroSection />
      <SolutionsSection />
      <SolarCalculator />
      <ProjectsSection />
      <LeadSection />
      <SiteFooter />
    </main>
  );
}
