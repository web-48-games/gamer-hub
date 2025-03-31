// Ignore this file/page for purposes of actually being included in the app

export default function () {
    return(
        <>
            <section className="bg-gh-desert-300 border-4 border-gh-mesa-400 p-1">
                <div className={"bg-gh-mesa-200 border-4 border-accent-neutral m-2 p-2"}>Headings:
                    <h1 className="font-montserrat font-bold text-3xl">Testing H1 Heading</h1>
                    <h2 className="font-montserrat font-semibold text-xl">Testing H2 Heading</h2>
                </div>

                <div className={"bg-gh-teal-200 border-4 border-accent-green m-2 p-2"}>Testing more colors</div>

                <div className={"bg-gh-red-100 border-4 border-accent-purple m-2 p-2"}>Everything else:
                    <p className="font-raleway text-medium">Maybe regular-ish text to see in paragraphs</p>
                    <p className="font-raleway font-semibold text-lg">Slightly bolder text, I think? btw checkout nav and contrast to preexisting color on footer, thoughts?</p>
                </div>
            </section>
        </>
    )
}