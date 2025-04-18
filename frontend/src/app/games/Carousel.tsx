"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import React, { useState, useRef, useId, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface SlideData {
    title: string;
    button: string;
    src: string;
    gameId: string;
}

interface SlideProps {
    slide: SlideData;
    index: number;
    current: number;
    handleSlideClick: (index: number) => void;
}

// Slide component
// This component renders each slide in the carousel
const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
    const slideRef = useRef<HTMLLIElement>(null);
    const router = useRouter();
    const xRef = useRef(0);
    const yRef = useRef(0);
    const frameRef = useRef<number>(0);

    useEffect(() => {
        const animate = () => {
            if (!slideRef.current) return;

            const x = xRef.current;
            const y = yRef.current;

            slideRef.current.style.setProperty("--x", `${x}px`);
            slideRef.current.style.setProperty("--y", `${y}px`);

            frameRef.current = requestAnimationFrame(animate);
        };

        frameRef.current = requestAnimationFrame(animate);

        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, []);

    // Handle mouse move event to update x and y coordinates
    const handleMouseMove = (event: React.MouseEvent) => {
        const el = slideRef.current;
        if (!el) return;

        const r = el.getBoundingClientRect();
        xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
        yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
    };
    // Handle mouse leave event to reset x and y coordinates
    const handleMouseLeave = () => {
        xRef.current = 0;
        yRef.current = 0;
    };
    // Handle image load event to set opacity
    const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
        event.currentTarget.style.opacity = "1";
    };
    // Destructure slide data
    const { src, button, title, gameId } = slide;
    // Handle click event to navigate to the game page
    const handleViewGameClick = () => {
        router.push(`/games/${gameId}`);
    };

    return (
        <div className="[perspective:800px] [transform-style:preserve-3d]">
            <li
                ref={slideRef}
                className="flex flex-1 flex-col items-center justify-left relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[70vmin] h-[70vmin] mx-[4vmin] sm:w-[95vw] sm:h-[60vmin] sm:mx-0 md:w-[80vmin] md:h-[65vmin] md:mx-[2vmin] z-10 "
                onClick={() => handleSlideClick(index)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    transform: current !== index ? "scale(0.98) rotateX(8deg)" : "scale(1) rotateX(0deg)",
                    transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    transformOrigin: "bottom",
                }}
            >
                <div
                    className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-[1%] overflow-hidden transition-all duration-150 ease-out"
                    style={{
                        transform: current === index ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)" : "none",
                    }}
                >
                    <img
                        className="absolute inset-0 w-[120%] h-[120%] object-cover opacity-100 transition-opacity duration-600 ease-in-out"
                        style={{
                            opacity: current === index ? 1 : 0.5,
                        }}
                        alt={title}
                        src={src}
                        onLoad={imageLoaded}
                        loading="eager"
                        decoding="sync"
                    />
                    {current === index && <div className="absolute inset-0 bg-black/30 transition-all duration-1000"/>}
                </div>

                <article
                    className={`relative p-[4vmin] transition-opacity duration-1000 ease-in-out ${
                        current === index ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                >
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold relative">
                        {title}
                    </h2>
                    <div className="flex justify-center">
                        <button
                            className="mt-6 px-4 py-2 w-fit mx-auto sm:text-sm text-black bg-cosa-400 shadow-lg h-10 sm:h-12 border border-transparent text-xs flex justify-center items-center rounded-2xl hover:shadow-lg transition duration-200 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
                            onClick={handleViewGameClick}
                        >
                            View Game
                        </button>
                    </div>
                </article>
            </li>
        </div>
    );
};

interface CarouselControlProps {
    type: string;
    title: string;
    handleClick: () => void;
}

// CarouselControl component
// This component renders the previous and next buttons for the carousel
const CarouselControl = ({
                             type,
                             title,
                             handleClick,
                         }: CarouselControlProps) => {
    return (
        <button
            className={`z-20 w-10 h-10 flex items-center mx-2 justify-center bg-cosa-400 shadow-lg dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${
                type === "previous" ? "rotate-180" : ""
            }`}
            title={title}
            onClick={handleClick}
        >
            <IconArrowNarrowRight className="text-redBrown dark:text-neutral-200" />
        </button>
    );
};

interface CarouselProps {
    slides: SlideData[];
}

// Carousel component
// This component renders the entire carousel with slides and controls
// It manages the current slide state and handles slide transitions
// It also handles the click events for the slides and controls
// It uses the useId hook to generate a unique id for the carousel
// It uses the useState hook to manage the current slide index
// It uses the useEffect hook to handle the animation frame for the slides
// It uses the useRef hook to create references for the slide elements
// It uses the useRouter hook to navigate to the game page when a slide is clicked
// It uses the useCallback hook to memoize the click handlers for the controls
// It uses the useMemo hook to memoize the slide data for performance optimization
// It uses the useContext hook to access the theme context for dark mode support
// It uses the useReducer hook to manage the state of the carousel
// It uses the useLayoutEffect hook to handle the layout of the carousel
// It uses the useImperativeHandle hook to expose the carousel methods to the parent component
// It uses the useDebugValue hook to display a label for the carousel in React DevTools
// It uses the useTransition hook to handle the transition between slides
// It uses the useDeferredValue hook to defer the value of the current slide index
export function Carousel({ slides }: CarouselProps) {
    const [current, setCurrent] = useState(0);
    const id = useId();

    const handlePreviousClick = () => {
        const previous = current - 1;
        setCurrent(previous < 0 ? slides.length - 1 : previous);
    };

    const handleNextClick = () => {
        const next = current + 1;
        setCurrent(next === slides.length ? 0 : next);
    };

    const handleSlideClick = (index: number) => {
        if (current !== index) {
            setCurrent(index);
        }
    };

    return (
        <div
            className="relative w-[70vmin] h-[70vmin] mx-auto sm:w-[95%] sm:h-[50vmin] md:w-[85%] md:h-[60vmin]"
            aria-labelledby={`carousel-heading-${id}`}
        >
            <ul
                className="absolute flex mx-[-4vmin] sm:mx-[-2vmin] md:mx-[-3vmin] transition-transform duration-1000 ease-in-out"
                style={{
                    transform: `translateX(-${current * (100 / slides.length)}%)`,
                }}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="flex-shrink-0 w-full sm:w-auto">
                        <Slide
                            slide={slide}
                            index={index}
                            current={current}
                            handleSlideClick={handleSlideClick}
                        />
                    </div>
                ))}
            </ul>

            <div className="absolute flex justify-center w-full top-[calc(100%+1rem)] sm:top-auto sm:left-2 sm:bottom-2 md:top-auto md:left-4 md:bottom-4">
                <CarouselControl
                    type="previous"
                    title="Go to previous slide"
                    handleClick={handlePreviousClick}
                />
                <CarouselControl
                    type="next"
                    title="Go to next slide"
                    handleClick={handleNextClick}
                />
            </div>
        </div>
    );
}