import PortfolioGallery from "@/components/PortfolioGallery";
import PageHeader from "@/components/PageHeader";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-[var(--color-brand-dark)]">
      <PageHeader 
        title="Our Portfolio"
        description="Explore our gallery of stunning aerial cinematography, high-resolution photography, and precision mapping projects."
        bgVideo="/videos/hero-bg.MP4"
        showOverlay={false}
      />
      <PortfolioGallery />
    </div>
  );
}
