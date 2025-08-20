export async function POST(request: Request) {

    const {name, phone, email, answers} = await request.json()

    console.log(request.body)

    console.log({
        name,
        phone,
        email,
        answers
    })


    return Response.json({
        message: "sucess",
        data: {
            name,
            phone,
            email,
            answers
        }
        
    })

}