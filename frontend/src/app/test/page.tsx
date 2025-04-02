// Ignore this file/page for purposes of actually being included in the app

import {PlayerCard} from "@/app/components/PlayerCard";
import React from "react";
import {GameResult} from "@/app/games/GameResult";

export default function () {
    return(
        <>

            <section className="container mx-auto m-10 w-full h-[35rem] bg-wasa-200 p-[0.5rem] md:p-[5rem] flex justify-center">
                <div className="w-[60%] h-full bg-cosa-200 rounded-lg shadow-lg shadow-wasa-500">
                    <div className="flex justify-center items-center justify-evenly">
                        <button
                            className="w-[8rem] h-[5rem] bg-wasa-300 hover:bg-wasa-400 hover:shadow-sm hover:shadow-wasa-500 rounded-md font-bold shadow-sm hover:text-white">
                            I am a button
                        </button>
                        <button
                            className="w-[8rem] h-[5rem] bg-wasa-300 text hover:bg-wasa-400 hover:shadow-sm hover:shadow-wasa-500 rounded-md font-bold shadow-sm hover:text-white">
                            I am a button
                        </button>
                    </div>
                    <div className="flex justify-center p-4 rounded mx-20 bg-code-100">
                    <h1 className="text-[1rem] md:text-[1.5rem] xl:text-[2rem] text-cosa-500">Colors going crazy all over the place</h1>
                    </div>
                </div>

            </section>


            {/*<section className="bg-gh-desert-300 border-4 border-gh-mesa-400 p-1">*/}
            {/*    <div className={"bg-gh-mesa-200 border-4 border-accent-neutral m-2 p-2"}>Headings:*/}
            {/*        <h1 className="font-montserrat font-bold text-3xl">Testing H1 Heading</h1>*/}
            {/*        <h2 className="font-montserrat font-semibold text-xl">Testing H2 Heading</h2>*/}
            {/*    </div>*/}

            {/*    <div className={"bg-gh-teal-200 border-4 border-accent-green m-2 p-2"}>Testing more colors</div>*/}

            {/*    <div className={"bg-gh-red-100 border-4 border-accent-purple m-2 p-2"}>Everything else:*/}
            {/*        <p className="font-raleway text-medium">Maybe regular-ish text to see in paragraphs</p>*/}
            {/*        <p className="font-raleway font-semibold text-lg">Slightly bolder text, I think? btw checkout nav and contrast to preexisting color on footer, thoughts?</p>*/}
            {/*    </div>*/}
            {/*</section>*/}
        </>
    )
}