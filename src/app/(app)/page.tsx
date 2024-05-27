'use client';

import { Mail } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';
import { GlobeDemo } from '@/components/Globe';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';

export default function Home() {
    return (
        <>
            <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 pt-12">
                
                <section className="text-center mb-8 md:mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold">
                         World of Anonymous Feedback
                    </h1>
                    <p className="mt-3 md:mt-4 text-base md:text-lg">
                        SomeThink - Where your identity remains a secret.
                    </p>
                </section>

                {/* Carousel for Messages */}
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
                <GlobeDemo />
            </main>

        </>
    );
}