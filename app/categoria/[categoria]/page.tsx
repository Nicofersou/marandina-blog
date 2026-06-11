import Link from "next/link";
import { client } from "../../../sanity/lib/client";

type Articulo = {
  _id: string;
  titulo: string;
  slug: { current: string };
  categoria: string;
  extracto: string;
  fechaPublicacion: string;
};

const categoriaLabels: Record<string, string> = {
  moda: "Moda",
  arte: "Arte",
  politica: "Política & Cultura",
  maquillaje: "Maquillaje",
};

async function getArticulosPorCategoria(categoria: string): Promise<Articulo[]> {
  return client.fetch(`
    *[_type == "articulo" && categoria == $categoria] | order(fechaPublicacion desc) {
      _id,
      titulo,
      slug,
      categoria,
      extracto,
      fechaPublicacion
    }
  `, { categoria });
}

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = await params;
  const articulos = await getArticulosPorCategoria(categoria);
  const label = categoriaLabels[categoria] ?? categoria;

  return (
    <div>
      <section className="text-center py-10 md:py-16 border-b border-pink-100 mb-12">
        <p className="text-xs uppercase tracking-widest text-pink-400 mb-4">
          Categoría
        </p>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
          {label}
        </h2>
      </section>

      <section>
        {articulos.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg mb-6">
              Todavía no hay artículos en esta categoría.
            </p>
            <Link href="/" className="text-pink-500 hover:underline text-sm uppercase tracking-widest">
              ← Volver al inicio
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articulos.map((articulo) => (
              <Link
                key={articulo._id}
                href={`/articulo/${articulo.slug.current}`}
                className="group block border-2 border-pink-200 rounded-lg p-6 hover:border-pink-400 transition-all hover:shadow-lg bg-white"
              >
                <span className="text-xs uppercase tracking-widest"
                  style={{ color: "var(--pink-primary)" }}>
                  {categoriaLabels[articulo.categoria] ?? articulo.categoria}
                </span>
                <h4 className="text-xl font-bold mt-2 mb-3 group-hover:text-pink-500 transition-colors leading-snug">
                  {articulo.titulo}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {articulo.extracto}
                </p>
                <span className="text-xs text-gray-300">
                  {new Date(articulo.fechaPublicacion).toLocaleDateString("es-ES", {
                    day: "numeric", month: "long", year: "numeric"
                  })}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}