import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { prompt, userKey } = await request.json();

    // LE GOD-MODE ADMIN : Accès illimité et gratuit pour toi
    const isAdmin = userKey === "MON_CODE_ADMIN";

    if (!isAdmin) {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
    }

    // Appel vers l'API Cloud GPU
    const response = await fetch("https://fal.run/fal-ai/wan/v2.2", {
      method: "POST",
      headers: {
        "Authorization": `Key ${process.env.FAL_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: prompt, aspect_ratio: "9:16" })
    });

    const data = await response.json();
    
    return NextResponse.json({ url: data.video?.url || "https://example.com/video.mp4" });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
