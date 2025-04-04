import React from 'react';

export function PageIntro() {
    return (
        <>

            <div className="flex flex-col-1 relative overflow-hidden h-[35rem] w-full">
                <img className={"size-full absolute object-cover object-center blur-[4px]"} src="/jensine-odom-sandia.jpg" alt="Sandia Mountain Top"/>
                <div className="w-full absolute top-[15%] md:top-[22%] text-center md:text-left md:left-10 mt-10">
                    <h2 className={"font-normal text-white md:text-wasa-600 text-[1.75rem] md:text-[1.75rem] xl:text-[5.25rem]"}>Welcome to A Game Away</h2>
                    <h1 className={"font-normal md:text-white text-[1.25rem] md:text-[1.75rem] xl:text-[3rem]"}>Find your table, adventures await!</h1>
                </div>
            </div>

            <section
                className="w-full p-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-items-center border-b-redBrown">
                <h1 className="text-[1rem] md:text-[1.5rem] xl:text-[4rem] font-thin text-redBrown">Play & Explore!</h1>
                <div className="relative overflow-hidden rounded-full w-[20rem] h-[20rem]">
                    <img src="/play-and-explore-placeholder.jpg" alt="Play"
                         className="absoltue object-cover object-center object-fit size-full"/>
                </div>
            </section>
            <section className="w-full p-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-items-center ">
                <div className="relative overflow-hidden rounded-full w-[20rem] h-[20rem]">
                    <img src="/play-and-explore-placeholder.jpg" alt="Play"
                         className="absoltue object-cover object-center object-fit size-full"/>
                </div>
                <h1 className="text-[1rem] md:text-[1.5rem] xl:text-[4rem] font-thin">Connect & Make Memories!</h1>
            </section>
        </>
    )
}