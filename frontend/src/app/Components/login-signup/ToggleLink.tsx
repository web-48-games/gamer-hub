export type ToggleLinkProps = {
    mode: string
    toggleFunction: () => void
}

export function ToggleLink({mode, toggleFunction}: ToggleLinkProps) {
    return (
        <>
            {mode === 'login' ?
                <div className={"text-center"}>
                    <p className={"text-green-700"}>Don't have an account?</p>
                    <p>
                        <a onClick={toggleFunction}
                           className="text-blue-600 hover:underline cursor-pointer">
                            Sign-up
                        </a>
                    </p>
                </div>
                :
                <div className={"text-center"}>
                    <p className={"text-green-700"}>Already have an account?</p>
                    <p>
                        <a onClick={toggleFunction}
                            className="text-blue-600 hover:underline cursor-pointer">
                            Log-in
                        </a>
                    </p>
                </div>
            }
        </>
    )
}