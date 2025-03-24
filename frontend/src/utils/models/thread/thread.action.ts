'user server'


// example code:
export async function fetchAllThreads() : Promise<Thread[]> {
    const {data} = await fetch(`${process.env.PUBLIC_API_URL}/apis/thread/`,
        {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        ).then(response => {
        if(!response.ok) {
            throw new Error('Network response failed')
        }
        return response.json()
    })
    return ThreadSchema.array().parse(data)
}
