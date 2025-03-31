'use client'

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useCallback} from "react";

export type CheckboxProps = {
    labelText: string
    value: string
}


export function Checkbox(props: CheckboxProps) {
    let {labelText, value} = props
    // below might be where we handle how the filtering gets triggered
    // const [checked, setChecked] = useState(false)
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {}
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()


    function changeGenres(event) {
        const currentParams = new URLSearchParams(searchParams.toString())
        if (event.target.checked) {
            currentParams.set(value, value)
        } else {
            currentParams.delete(value)
        }
        router.push(pathname + '?' + currentParams.toString())
    }


    return(
        <>
            <div className="flex items-center mb-4">
                <input onClick={changeGenres} id="default-checkbox" type="checkbox" value={value}
                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{labelText}</label>
            </div>
        </>
    )
}
