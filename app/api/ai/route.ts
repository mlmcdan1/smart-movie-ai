import { NextResponse } from 'next/server';
import { InferenceClient } from '@huggingface/inference';
import type { InferenceProviderOrPolicy } from '@huggingface/inference';

const hfApiKey = process.env.HUGGINGFACE_API_KEY;
const hfModel = process.env.HUGGINGFACE_MODEL ?? 'mistralai/Mistral-7B-Instruct-v0.2';
const providerEnv = process.env.HUGGINGFACE_PROVIDER?.trim();
const hfProvider: InferenceProviderOrPolicy | undefined = providerEnv
  ? (providerEnv as InferenceProviderOrPolicy)
  : undefined;

const systemPrompt = `You are SmartFlix's cinematic concierge. You must follow every instruction precisely.
- Respond with exactly one well-known, theatrically released film that has an official poster on TMDB.
- Format the reply exactly as: Title (Year) — one short, punchy reason they will love it.
- Year must be four digits. Do not include any extra commentary, leading quotes, bullet points, or additional lines.
- Do NOT pick obscure, unavailable, or unreleased titles. Stick to recognisable films audiences can easily find.
- If you cannot comply, answer exactly: "No suitable film found."`;

export async function POST(req: Request) {
  if (!hfApiKey) {
    return NextResponse.json({ error: 'Missing HUGGINGFACE_API_KEY environment variable.' }, { status: 500 });
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const body = (payload && typeof payload === 'object' ? payload : {}) as { prompt?: unknown };
  const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';

  if (!prompt) {
    return NextResponse.json({ error: 'Prompt is required.' }, { status: 400 });
  }

  const client = new InferenceClient(hfApiKey);

  try {
    const completion = await client.chatCompletion({
      model: hfModel,
      ...(hfProvider ? { provider: hfProvider } : {}),
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const content = completion.choices?.[0]?.message?.content?.trim();

    if (!content) {
      return NextResponse.json({ result: 'No suitable film found.' });
    }

    return NextResponse.json({ result: content });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : typeof error === 'object'
        ? JSON.stringify(error)
        : 'Failed to reach Hugging Face Inference API.';

    console.error('SmartFlix AI route error:', error);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

