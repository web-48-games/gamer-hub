type ToggleLinkProps = {
    mode: string
}

export function ToggleLink(props: ToggleLinkProps) {
    const {mode} = props
    return (
        <>
            {mode === 'login' ?
                <div className={"text-center"}>
                    <p className={"shadow-sm"}>Already have an account?</p>
                    <p>
                        <a href="#">Log-in</a>
                    </p>
                </div>
                :
                <div>
                    <p>Don't have an account?</p>
                    <p>
                        <a href="#">Sign Up</a>
                    </p>
                </div>
            }
        </>
    )
}