import Link from "next/link";
import { client } from "../../../sanity/lib/client";
import { PortableText } from "@portabletext/react";

type Articulo = {
  titulo: string;
  slug: { current: string };
  categoria: string;
  fechaPublicacion: string;
  contenido: import("@portabletext/types").PortableTextBlock[];};

async function getArticulo(slug: string): Promise<Articulo | null> {
  return client.fetch(`
    *[_type == "articulo" && slug.current == $slug][0] {
      titulo,
      slug,
      categoria,
      fechaPublicacion,
      contenido
    }
  `, { slug });
}

export default async function ArticuloPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articulo = await getArticulo(slug);

  if (!articulo) {
    return (
      <div className="text-center py-32">
        <h2 className="text-2xl font-bold mb-4">Artículo no encontrado</h2>
        <Link href="/" className="text-pink-500 hover:underline">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-2xl mx-auto">
      <header className="mb-12">
        <Link
          href="/"
          className="text-xs uppercase tracking-widest text-pink-400 hover:text-pink-600 transition-colors mb-8 inline-block"
        >
          ← Volver al inicio
        </Link>
        <span className="block text-xs uppercase tracking-widest mb-4"
          style={{ color: "var(--pink-primary)" }}>
          {articulo.categoria}
        </span>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
          {articulo.titulo}
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-400 border-t border-b border-pink-100 py-4">
          <span>{new Date(articulo.fechaPublicacion).toLocaleDateString("es-ES", {
            day: "numeric", month: "long", year: "numeric"
          })}</span>
          <span>·</span>
          <span>Marandina</span>
        </div>
      </header>

      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
        <PortableText value={articulo.contenido} />
      </div>

      <footer className="mt-16 pt-8 border-t border-pink-100">
        <Link
          href="/"
          className="inline-block bg-pink-500 text-white px-6 py-3 rounded-full text-sm uppercase tracking-widest hover:bg-pink-600 transition-colors"
        >
          ← Ver todos los artículos
        </Link>
      </footer>
    </article>
  );
}