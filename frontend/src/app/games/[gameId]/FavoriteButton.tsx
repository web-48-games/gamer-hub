'use client'

import {useState, useTransition} from "react";


type FavoriteButtonProps = {
    gameId: string
    initialIsFavorited?: boolean
    className?: string
    profileId: string
}

export function FavoriteButton({ gameId, initialIsFavorited=false, className=''}: FavoriteButtonProps) {
    const [isFavorited, setIsFavorited] = useState(initialIsFavorited)
    const [isPending, startTransition] = useTransition()



}