import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const {prompt } = await req.json();

    try {
        const response = await fetch("https://api-inference.huggingface.co/models/google/flan-t5-small", {
            headers: {
                Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY!}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                inputs: prompt,
            }),
        });

        const text = await response.text();
        let data;
        try {
            data = JSON.parse(text);
        } catch (err) {
            console.error("Invalid JSON from Hugging Face:", text);
            return NextResponse.json(
                { error: "Invalid JSON from Hugging Face", details: text },
                { status: response.status }
            );
        }

        console.log("HF status:", response.status);
        console.log("HF data:", data);

        if (!response.ok) {
            console.error("Hugging Face API Response Error:", {
                status: response.status,
                data,
            });

            return NextResponse.json({
                error: "Hugging Face API call failed",
                status: response.status,
                details: data,
            }, { status: response.status });
        }

        const generated = data[0]?.generated_text ?? JSON.stringify(data);

        return NextResponse.json({ result: generated });
    } catch (error: any) {
        console.error('HuggingFace Error:', error?.message || error);
        console.error("Hugging Face API Error Details:", error);
        return NextResponse.json(
            {
                error: 'Hugging Face Request failed'
            }, 
            {status: 500}
        );
    }
}