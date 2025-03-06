import GradualSpacing from "@/components/magicui/gradual-spacing";
import { FadeText } from "@/components/magicui/fade-text";

export default function HeaderSection() {
    return (
        <section className="text-center mb-8 md:mb-12">
            <GradualSpacing
                className="font-display text-center text-4xl font-bold tracking-[-0.1em]  text-black dark:text-white md:text-7xl md:leading-[5rem]"
                text="Anonymous Feedback"
            />
            <FadeText
                className="mt-3 md:mt-4 text-sm md:text-lg  text-black dark:text-white"
                direction="down"
                framerProps={{
                    show: { transition: { delay: 0.8 } },
                }}
                text="SomeThink - Where your identity remains a secret."
            />
        </section>
    )
}