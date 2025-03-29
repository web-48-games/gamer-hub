import React from 'react';

export function PageIntro() {
    return (
        <>
            {/*<section>*/}
            {/*    <div>*/}
            {/*        <div className="relative overflow-hidden h-[15rem] w-full">*/}
            {/*            <img className="size-full absolute object-cover object-center blur-[4px]"*/}
            {/*                 src="/play-and-explore-placeholder.jpg" alt=""/>*/}
            {/*            <div className="size-full bg-black opacity-25"></div>*/}

            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}


            <section className="p-40 bg-lightYellow text-center font-semibold">
                <h1 className="pb-4 text-[4.5rem] text-redBrown">Welcome to A Game Away</h1>
                <p className="text-[2.5rem] text-redBrown">Find your table, adventures await!</p>
            </section>

            <section className="container mx-auto mt-8 p-6 grid grid-cols-1 md:grid-cols-2 gap-4 rounded-[1rem] bg-lightYellow">
                <h1 className="text-[4rem] text-charcoal">Play & Explore!</h1>
                <div className="relative overflow-hidden rounded-full">
                    <img src="/play-and-explore-placeholder.jpg" alt="Play"/>
                </div>
            </section>
            <section className="container m-8 mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4 rounded-[1rem] bg-lightYellow text-redBrown">
                <div className="relative overflow-hidden rounded-full">
                    <img src="/play-and-explore-placeholder.jpg" alt="Play"/>
                </div>
                <h1 className="text-[4rem] text-charcoal">Connect & Make Memories!</h1>
            </section>
        </>
    )
}