
import {PageIntro} from "@/app/Components/PageIntro";
import {Carousel} from "@/app/Components/ui/carousel";
import {Categories} from "@/app/Components/ui/categories";
import React from "react";
import {Catamaran} from "next/dist/compiled/@next/font/dist/google";

export default function Home() {
    return (
       <>
           <Categories />
           <PageIntro />
       </>
    )
}

