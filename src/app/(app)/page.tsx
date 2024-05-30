'use client';

import { Mail } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';
import GradualSpacing from "@/components/magicui/gradual-spacing";
import { FadeText } from "@/components/magicui/fade-text";
import LinearGradient from "@/components/magicui/linear-gradient";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';

export default function Home() {
    return (
        <>
            <main className="flex flex-col min-h-screen items-center justify-center px-4 relative">
                <section className="text-center mb-8 md:mb-12">
                    <GradualSpacing
                        className="font-display text-center text-4xl font-bold tracking-[-0.1em]  text-black dark:text-white md:text-7xl md:leading-[5rem]"
                        text="Anonymous Feedback"
                    />
                    <FadeText
                        className="mt-3 md:mt-4 text-sm md:text-lg  text-black dark:text-white"
                        direction="down"
                        framerProps={{
                            show: { transition: { delay: 0.6 } },
                        }}
                        text="SomeThink - Where your identity remains a secret."
                    />
                </section>

                <Carousel
                    plugins={[Autoplay({ delay: 3000 })]}
                    className="w-full max-w-lg md:max-w-xl"
                >
                    <CarouselContent>
                        {messages.map((message, index) => (
                            <CarouselItem key={index} className="p-4">
                                <Card className='rounded-xl'>
                                    <CardHeader>
                                        <CardTitle>{message.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                                        <Mail className="flex-shrink-0" />
                                        <div>
                                            <p>{message.content}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {message.received}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            <LinearGradient />
            </main>
        </>
    );
}