'use client';
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, userKey: "MON_CODE_ADMIN" })
      });
      const data = await res.json();
      if (data.url) setVideoUrl(data.url);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
        FUTURE VIDEO AI
      </h1>
      <div className="w-full max-w-md flex flex-col gap-4">
        <textarea
          className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-cyan-500 text-sm"
          rows="4"
          placeholder="Décris ta vidéo ultra-réaliste pour TikTok..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-600 font-bold rounded-xl shadow-lg active:scale-95 transition"
        >
          {loading ? 'Génération en cours (IA active)...' : 'Générer la vidéo (20s)'}
        </button>
        {videoUrl && (
          <video controls src={videoUrl} className="w-full rounded-xl mt-4 border border-zinc-800" />
        )}
      </div>
    </main>
  );
        }
