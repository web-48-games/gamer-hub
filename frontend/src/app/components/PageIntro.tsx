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


            <section className=" p-14 bg-burntSienna">
                <h1 className="text-[2.5rem] ">Welcome to A Game Away</h1>
                <p className="text-[1.5rem] ">Find your table, adventures await!</p>
            </section>

            <section className="">
                <h1 className="text-[4rem] text-charcoal">Play & Explore!</h1>
                <div className="relative overflow-hidden rounded-full">
                    <img src="/play-and-explore-placeholder.jpg" alt="Play"/>
                </div>
            </section>
            <section>
                <div className="relative overflow-hidden rounded-full ">
                    <img src="/play-and-explore-placeholder.jpg" alt="Play"/>
                </div>
                <h1 className="text-[4rem] text-charcoal">Connect & Make Memories!</h1>
            </section>
        </>
    )
}