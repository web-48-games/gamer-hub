
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
                <label htmlFor={name}>{labelText}</label>
                <input type={type} name={name} id={id} required/>
            </div>
        </>
    )
}
