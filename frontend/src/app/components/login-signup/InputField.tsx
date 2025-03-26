
export type InputProps = {
    name: string
    type: string
    id: string
    labelText: string
    register?: any
}

export type Props = {
    inputProps: InputProps
}


export function InputField(props: Props) {
    const {inputProps: {name, type, id, labelText, register}} = props
    if (register === undefined) {
    return (
        <>
            <div>
                <label htmlFor={name}
                       className="block text-sm font-bold text-blue-800 mb-1">
                    {labelText}
                </label>
                <input type={type} name={name} id={id}

                        className={"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"}

                />
            </div>
        </>
    )
    }
    if (register !== undefined) {
        return (
            <>
                <div>
                    <label htmlFor={name}
                           className="block text-sm font-bold text-blue-800 mb-1">
                        {labelText}
                    </label>
                    <input type={type} name={name} id={id} {...register(name)}
                           className={"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"}
                    />
                </div>
            </>
        )
    }
}
