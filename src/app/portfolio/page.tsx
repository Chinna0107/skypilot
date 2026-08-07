import PortfolioGallery from "@/components/PortfolioGallery";
import PageHeader from "@/components/PageHeader";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-[var(--color-brand-dark)]">
      <PageHeader 
        title="Our Portfolio"
        description="Explore our gallery of stunning aerial cinematography, high-resolution photography, and precision mapping projects."
        bgVideo="https://res.cloudinary.com/p8auppz8/video/upload/v1786115590/hero-bg-compressed_wlgi5s.mp4"
        showOverlay={false}
      />
      <PortfolioGallery />
    </div>
  );
}
