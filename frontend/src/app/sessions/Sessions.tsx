import {SessionCard} from "@/app/sessions/SessionCard";
import {SessionSlot} from "@/app/sessions/SessionSlot";

export type Session = {
    title: string
    capacity: number
    description: string
    address: string
}

export type SessionProps = {
    session: Session
}

export function Sessions(props: SessionProps) {
    const {session: {title, capacity, description, address}} = props
    return (
        <>
            <h1 className={"font-bold text-4xl dark:tex-white"}>PLACE {title} HERE</h1>
            {/*conditional maybe need state management to keep track of total slots or something along those lines rendering based on session capacity and filled slots*/}
            <SessionCard player={}/>
            <SessionSlot />
        </>
    )
}