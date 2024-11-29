import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

export const POST = async (req) => {
    try {
        const { blogContent } = await req.json();
        const prompt = `Please provide a concise summary of the following blog post:\n\n${blogContent}`;

        const completion = await openai.chat.completions.create({
            messages: [
                { 
                    "role": "system", 
                    "content": "You are a helpful assistant that summarizes blog posts accurately and concisely." 
                },
                { 
                    "role": "user", 
                    "content": prompt 
                }
            ],
            model: "gpt-3.5-turbo",
        });

        console.log(completion);

        return NextResponse.json({ 
            result: completion.choices[0].message.content 
        });
    } catch (error) {
        console.error('OpenAI API error:', error);
        return NextResponse.json(
            { error: 'Failed to process the request' },
            { status: 500 }
        );
    }
}