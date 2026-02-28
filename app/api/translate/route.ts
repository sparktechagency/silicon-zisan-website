import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text, target } = await req.json();

    if (!text || !target) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 },
      );
    }

    const res = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: text, target, format: "text" }),
      },
    );

    const data = await res.json();

    if (!data.data || !data.data.translations) {
      return NextResponse.json(
        { error: "Translation failed" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      translatedText: data.data.translations[0].translatedText,
    });
  } catch (err) {
    console.error("Translation API error:", err);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
