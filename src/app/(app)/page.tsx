import CarouselSection from '@/components/Carousel';
import HeaderSection from '@/components/HeaderSection';

export default function Home() {
    return (
        <main className="flex flex-col min-h-screen items-center justify-center px-4 relative">
            <HeaderSection />
            <CarouselSection />
        </main>
    );
}