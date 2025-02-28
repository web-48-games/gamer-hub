import React from 'react';

export function PageIntro() {
    return (
        <>


            <div className="relative overflow-hidden h-[15rem] w-full">
                <img className="size-full absolute object-cover object-center blur-[4px]" src="/play-and-explore-placeholder.jpg" alt=""/>
                <div className="size-full bg-black opacity-25"></div>
            </div>



            <section className="p-14 border-4 bg-amber-200  border-amber-800">
                <h1 className="text-[2.5rem] text-amber-950">Welcome to A Game Away</h1>
                <p className="text-[1.5rem] text-amber-950">Find your table, adventures await!</p>
            </section>
            <section className="flex justify-center justify-evenly ">
                <h1 className="text-[4rem]">Play & Explore!</h1>
                <img className="rounded-[.5rem] " src="/play-and-explore-placeholder.jpg" alt="Play"/>
            </section>
            <section className="flex justify-center justify-evenly ">
                <h1 className="text-[4rem]">Connect & Make Memories!</h1>
                <img className="rounded-[.5rem] " src="/connect-and-make-memories-placeholder.jfif" alt="Connect"/>
            </section>
        </>
    )
}