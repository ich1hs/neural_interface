import { Preloader } from "@/components/ui/Preloader";
import { Navigation } from "@/components/ui/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { DemoSection } from "@/components/sections/DemoSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
    return (
        <>
            <Preloader />
            <Navigation />
            <main className="relative">
                <HeroSection />
                <FeaturesSection />
                <DemoSection />
                <ContactSection />
            </main>
        </>
    );
}
