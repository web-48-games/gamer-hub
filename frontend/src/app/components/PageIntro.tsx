import React from 'react';

export function PageIntro() {
    return (
        <>
            {/*<section>*/}
            {/*    <div>*/}
            {/*        <div className="relative overflow-hidden h-[30rem] w-full">*/}
            {/*            <img className="size-full absolute object-cover object-center blur-[2px]"*/}
            {/*                 src="/sandia-river.jpg" alt=""/>*/}
            {/*            <div className="size-full bg-black opacity-25"></div>*/}

            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}


            <section className="p-40 my-10 bg-lightYellow shadow-lg shadow-redBrown text-center font-semibold">
                <h1 className="pb-4 text-[2.75rem] md:text-[5rem] font-normal text-redBrown">Welcome to A Game Away</h1>
                <p className="text-[1.75rem] md:text-[3rem] font-normal text-redBrown">Find your table, adventures await!</p>
            </section>

            <section className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-items-center rounded-[1rem] border-b-redBrown shadow-lg shadow-redBrown bg-paleRed">
                <h1 className="text-[4rem] font-thin text-redBrown">Play & Explore!</h1>
                <div className="relative overflow-hidden rounded-[2.5rem] w-[30rem] h-[20rem]">
                    <img src="/play-and-explore-placeholder.jpg" alt="Play" className="absoltue object-cover object-center size-full" />
                </div>
            </section>
            <section className="container my-10 mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-items-center rounded-[1rem] border-b-redBrown shadow-lg shadow-redBrown bg-paleRed">
                <div className="relative overflow-hidden rounded-[2.5rem] w-[30rem] h-[20rem]">
                    <img src="/play-and-explore-placeholder.jpg" alt="Play"
                         className="absoltue object-cover object-center size-full"/>
                </div>
                <h1 className="text-[4rem] font-thin">Connect & Make Memories!</h1>
            </section>
        </>
    )
}