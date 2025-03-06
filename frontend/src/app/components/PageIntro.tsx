import React from 'react';

export function PageIntro() {
    return (
        <>
            <section>
                <div>
                    <div className="relative overflow-hidden h-[15rem] w-full">
                        <img className="size-full absolute object-cover object-center blur-[4px]"
                             src="/play-and-explore-placeholder.jpg" alt=""/>
                        <div className="size-full bg-black opacity-25"></div>

                    </div>
                </div>
            </section>


            <section className="w-full p-14 bg-burntSienna">
                <h1 className="text-[2.5rem] text-charcoal">Welcome to A Game Away</h1>
                <p className="text-[1.5rem] text-charcoal">Find your table, adventures await!</p>
            </section>
            <section className="container mx-auto grid grid-cols-1 sm:grid-cols-2 items-center">
                <h1 className="text-[4rem]">Play & Explore!</h1>
                <div className="relative overflow-hidden rounded-full size-[75%]">
                    <img src="/play-and-explore-placeholder.jpg" alt="Play"/>
                </div>
                <div className="relative overflow-hidden rounded-full size-[75%]">
                    <img src="/play-and-explore-placeholder.jpg" alt="Play"/>
                </div>
                <h1 className="text-[4rem]">Connect & Make Memories!</h1>
            </section>
        </>
    )
}