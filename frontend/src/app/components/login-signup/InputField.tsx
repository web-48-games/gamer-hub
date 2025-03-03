
export type InputProps = {
    name: string
    type: string
    id: string
    labelText: string
}

export type Props = {
    inputProps: InputProps
}


export function InputField(props: Props) {
    const {inputProps: {name, type, id, labelText}} = props
    return (
        <>
            <div>
                <label htmlFor={name}
                       className="block text-sm font-bold text-blue-800 mb-1">
                    {labelText}
                </label>
                <input type={type} name={name} id={id} required
                        className={"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"}
                />
            </div>
        </>
    )
}
