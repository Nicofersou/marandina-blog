"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Poema = {
  _id: string;
  titulo: string;
  slug: { current: string };
  contenido: string;
};

export default function CarruselPoemas({ poemas }: { poemas: Poema[] }) {
  const [indice, setIndice] = useState(0);
  const [animando, setAnimando] = useState(false);

  useEffect(() => {
    if (poemas.length <= 1) return;
    const intervalo = setInterval(() => {
      cambiar((indice + 1) % poemas.length);
    }, 5000);
    return () => clearInterval(intervalo);
  }, [indice, poemas.length]);

  function cambiar(nuevoIndice: number) {
    setAnimando(true);
    setTimeout(() => {
      setIndice(nuevoIndice);
      setAnimando(false);
    }, 300);
  }

  if (poemas.length === 0) return null;

  const poema = poemas[indice];
  const extracto = poema.contenido.split("\n").slice(0, 4).join("\n");

  return (
    <section className="bg-pink-50 border border-pink-200 rounded-2xl p-8 md:p-12 mb-16">
      <p className="text-xs uppercase tracking-widest text-pink-400 mb-6 text-center">
        Poemario
      </p>

      <div
        className="transition-opacity duration-300"
        style={{ opacity: animando ? 0 : 1 }}
      >
        <p className="text-gray-700 text-lg leading-loose whitespace-pre-line font-serif text-center mb-6 italic">
          {extracto}
          {poema.contenido.split("\n").length > 4 && "\n..."}
        </p>
        <p className="text-center font-bold text-gray-800 mb-2">
          {poema.titulo}
        </p>
      </div>

      <div className="flex justify-center items-center gap-6 mt-8">
        {poemas.length > 1 && (
          <>
            <button
              onClick={() => cambiar((indice - 1 + poemas.length) % poemas.length)}
              className="text-pink-400 hover:text-pink-600 transition-colors text-xl"
            >
              ←
            </button>
            <div className="flex gap-2">
              {poemas.map((_, i) => (
                <button
                  key={i}
                  onClick={() => cambiar(i)}
                  className="w-2 h-2 rounded-full transition-colors"
                  style={{
                    backgroundColor: i === indice ? "var(--pink-primary)" : "#fce4f3"
                  }}
                />
              ))}
            </div>
            <button
              onClick={() => cambiar((indice + 1) % poemas.length)}
              className="text-pink-400 hover:text-pink-600 transition-colors text-xl"
            >
              →
            </button>
          </>
        )}
      </div>

      <div className="text-center mt-6">
        <Link
          href={`/poemario/${poema.slug.current}`}
          className="text-xs uppercase tracking-widest text-pink-400 hover:text-pink-600 transition-colors"
        >
          Leer poema completo →
        </Link>
      </div>
    </section>
  );
}