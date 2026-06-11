import Link from "next/link";
import { client } from "../../../sanity/lib/client";

type Poema = {
  titulo: string;
  contenido: string;
  fechaPublicacion: string;
};

async function getPoema(slug: string): Promise<Poema | null> {
  return client.fetch(`
    *[_type == "poema" && slug.current == $slug][0] {
      titulo,
      contenido,
      fechaPublicacion
    }
  `, { slug });
}

export default async function PoemaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const poema = await getPoema(slug);

  if (!poema) {
    return (
      <div className="text-center py-32">
        <h2 className="text-2xl font-bold mb-4">Poema no encontrado</h2>
        <Link href="/poemario" className="text-pink-500 hover:underline">
          Volver al poemario
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-xl mx-auto">
      <header className="mb-12">
        <Link
          href="/poemario"
          className="text-xs uppercase tracking-widest text-pink-400 hover:text-pink-600 transition-colors mb-8 inline-block"
        >
          ← Volver al poemario
        </Link>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
          {poema.titulo}
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-400 border-t border-b border-pink-100 py-4">
          <span>{new Date(poema.fechaPublicacion).toLocaleDateString("es-ES", {
            day: "numeric", month: "long", year: "numeric"
          })}</span>
          <span>·</span>
          <span>Marandina</span>
        </div>
      </header>

      <div className="text-gray-700 text-lg leading-loose whitespace-pre-line font-serif">
        {poema.contenido}
      </div>

      <footer className="mt-16 pt-8 border-t border-pink-100">
        <Link
          href="/poemario"
          className="inline-block bg-pink-500 text-white px-6 py-3 rounded-full text-sm uppercase tracking-widest hover:bg-pink-600 transition-colors"
        >
          ← Ver todos los poemas
        </Link>
      </footer>
    </article>
  );
}