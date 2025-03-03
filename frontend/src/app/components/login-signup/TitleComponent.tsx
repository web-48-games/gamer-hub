export type TitleProps = {
    mode: string
}

export function TitleComponent(props: TitleProps) {
    const {mode} = props

    return (
        <>
            <div className={"container mx-auto text-center"}>
                <p className={"text-lg text-green-800"}>{mode}</p>
                <p className={"text-md text-green-800"}>You're only...</p>
                <p className={"font-bold text-2xl text-green-800"}>A Game Away</p>
            </div>
        </>
    )
}