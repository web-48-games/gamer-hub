
import { useEffect, useRef } from "react";
import gsap from "gsap";

export type TitleProps = {
    mode: string;
};

export function TitleComponent({ mode }: TitleProps) {
    const gameRef = useRef<HTMLSpanElement>(null);
    const awayRef = useRef<HTMLSpanElement>(null);
    const aRef = useRef<HTMLSpanElement>(null);
    const explosionRef = useRef<HTMLDivElement>(null);
    const sparksRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        const game = gameRef.current;
        const away = awayRef.current;
        const a = aRef.current;
        const explosion = explosionRef.current;
        const sparks = sparksRef.current;

        if (game && away && a && explosion && sparks) {
            // Move words toward each other (collision)
            gsap.to(game, { x: 30, duration: 0.5, ease: "power2.inOut" });
            gsap.to(away, { x: -30, duration: 0.5, ease: "power2.inOut" });

            // Show explosion briefly
            gsap.set(explosion, { opacity: 1, scale: 0 });
            gsap.to(explosion, { scale: 3, duration: 0.3, ease: "power1.out", delay: 0.5 });
            gsap.to(explosion, { opacity: 0, duration: 0.3, delay: 0.8 });

            // "A" launches upward
            gsap.to(a, { y: -120, scale: 1.5, duration: 1, ease: "power2.out", delay: 0.6 });

            // Sparks animation
            gsap.set(sparks, { opacity: 1, y: 0 });
            gsap.to(sparks, { y: -120, opacity: 0, duration: 1, ease: "power2.out", delay: 0.6 });

            // Reset everything
            gsap.to(game, { x: 0, duration: 1, ease: "power2.out", delay: 2 });
            gsap.to(away, { x: 0, duration: 1, ease: "power2.out", delay: 2 });
            gsap.to(a, { y: 0, scale: 1, duration: 1, ease: "bounce.out", delay: 2.5 });
            gsap.to(sparks, { opacity: 0, duration: 0.2, delay: 2.5 });
        }
    }, []);

    return (
        <div className="container mx-auto text-center relative">
            <p className="text-lg text-green-800">{mode}</p>
            <p className="text-md text-green-800">You're only...</p>
            <p className="font-bold text-2xl text-green-800 relative">
                <span ref={aRef} className="inline-block relative">A</span>
                <span ref={gameRef} className="inline-block ml-1">Game</span>
                <span ref={awayRef} className="inline-block ml-1">Away</span>
            </p>
                {/*/!* Explosion Effect *!/*/}
                {/*<div*/}
                {/*    ref={explosionRef}*/}
                {/*    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-orange-500 rounded-full opacity-0"*/}
                {/*    style={{ boxShadow: "0 0 50px 20px rgba(255, 140, 0, 0.8)" }}*/}
                {/*></div>*/}

                {/*/!* Sparks Trail *!/*/}
                {/*<div*/}
                {/*    ref={sparksRef}*/}
                {/*    className="absolute left-0 top-0 w-2 h-2 bg-yellow-400 opacity-0"*/}
                {/*    style={{*/}
                {/*        filter: "blur(3px)",*/}
                {/*        boxShadow: "0 0 10px rgba(255, 255, 0, 0.8)",*/}
                {/*    }}*/}
                {/*></div>*/}
        </div>
    );
}
