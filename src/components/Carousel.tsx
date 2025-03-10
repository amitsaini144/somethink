'use client';

import { Mail } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';

export default function CarouselSection() {
    return (
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
    )
}