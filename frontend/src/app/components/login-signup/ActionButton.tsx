type ButtonProps = {
    buttonText: string
}

export function ActionButton(props: ButtonProps) {
    let {buttonText} = props
    return (
        <>
            <div className="container flex justify-center">
                <input type={"submit"} value={buttonText} className={"font-medium rounded-lg text-[1rem] md:text-[1.10rem] xl:text-[1.25rem] px-5 py-2.5 me-2 mb-2 shadow-md shadow-wasa-500 text-white bg-wasa-a  hover:bg-wasa-400 hover:text-white focus:ring-4 focus:ring-blue-300"}/>
            </div>
        </>
    )
}
