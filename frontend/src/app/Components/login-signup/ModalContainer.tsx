
export function ModalContainer({children} : any) {
    return (
        <>
            <section className={"container w-full p-12 bg-green-300 border border-none rounded-xl"}>
                {children}
            </section>
        </>
    )
}