import React from 'react';

export function PageIntro() {
    return (
        <>
            {/*<section className="text-center">*/}
            {/*    <div className="relative overflow-hidden h-[40rem] w-full">*/}
            {/*        <div className={"text-white text-[1rem] md:text-[1.5rem] xl:text-[4rem]"}>Welcome to a Game Away</div>*/}
            {/*        <img className="size-full absolute object-cover object-center blur-[2px]"*/}
            {/*             src="/jensine-odom-sandia.jpg" alt="Sandia Mountain Top"/>*/}
            {/*        <div className="size-full bg-black opacity-15"></div>*/}
            {/*    </div>*/}
            {/*</section>*/}

            <div className="relative overflow-hidden h-[35rem] w-full">
                <img className={"size-full absolute object-cover object-center blur-[4px]"} src="/jensine-odom-sandia.jpg" alt="Sandia Mountain Top"/>
                <div className="w-full absolute top-[25%] left-10 mt-10">
                    <h2 className={"font-normal text-wasa-600 text-[1rem] md:text-[1.5rem] xl:text-[6rem]"}>Welcome to A Game Away</h2>
                    <h1 className={"font-normal text-white text-[1rem] md:text-[1.5rem] xl:text-[3rem]"}>Find your table, adventures await!</h1>
                </div>
            </div>


            {/*<section className="grid grid-cols-1 justify-items-center p-40 mb-10 bg-wasa-100 shadow-lg shadow-wasa-500 text-center font-semibold">*/}
            {/*    <h1 className="items-center pb-4 text-[1.5rem] md:text-[2rem] xl:text-[4rem] font-normal text-wasa-500">Welcome to A Game Away</h1>*/}
            {/*    <p className="text-[1rem] md:text-[1.5rem] xl:text-[2rem] font-normal text-wasa-500">Find your table, adventures await!</p>*/}
            {/*</section>*/}

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