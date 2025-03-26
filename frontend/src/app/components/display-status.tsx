import { Status } from '@/utils/interfaces/Status'

type Props = {
    status: Status|null
}

export function DisplayStatus (props: Props) {
    const status = props.status
    const backgroundColor = status?.status === 200 ? 'bg-green-200' : 'bg-red-200'
    const textColor = status?.status === 200 ? 'text-green-800' : 'text-red-800'

    if(status) {
        return(
            <>
                <output
                    className={`mt-4 flex items-center p-4 mb-4 text-sm ${backgroundColor} ${textColor} rounded-lg`}
                    role="alert">
                    <div>
                        {status.message}
                    </div>
                </output>

            </>
        )
    }
}