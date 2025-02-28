import React from "react";

type ModalContainerProps = {
    children: React.ReactNode
    onClose?: () => void
}

export function ModalContainer({children, onClose} : ModalContainerProps) {
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <section className={"relative w-11/12 max-w-md p-6 bg-green-300 border border-none rounded-xl"}>
                    {onClose && (
                        <button
                            className="absolute top-2 right-2 text-green-800 hover:text-green-950 text-xl font-bold"
                            onClick={onClose}
                            type="button"
                            aria-label="Close"
                        >
                            X
                        </button>
                    )}
                    {children}
                </section>
            </div>

        </>
    )
}