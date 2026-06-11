import Link from "next/link";
import { client } from "../../sanity/lib/client";

type Poema = {
  _id: string;
  titulo: string;
  slug: { current: string };
  contenido: string;
  fechaPublicacion: string;
};

async function getPoemas(): Promise<Poema[]> {
  return client.fetch(`
    *[_type == "poema"] | order(fechaPublicacion desc) {
      _id,
      titulo,
      slug,
      contenido,
      fechaPublicacion
    }
  `);
}

export default async function PoemarioPage() {
  const poemas = await getPoemas();

  return (
    <div>
      <section className="text-center py-10 md:py-16 border-b border-pink-100 mb-12">
        <p className="text-xs uppercase tracking-widest text-pink-400 mb-4">
          Palabras propias
        </p>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
          Poemario
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto text-base md:text-lg px-4">
          Una colección de poemas escritos con el corazón.
        </p>
      </section>

      {poemas.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg mb-6">
            Todavía no hay poemas publicados.
          </p>
          <Link href="/" className="text-pink-500 hover:underline text-sm uppercase tracking-widest">
            ← Volver al inicio
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {poemas.map((poema) => (
            <Link
              key={poema._id}
              href={`/poemario/${poema.slug.current}`}
              className="group block border-2 border-pink-200 rounded-lg p-6 hover:border-pink-400 transition-all hover:shadow-lg bg-white"
            >
              <h4 className="text-xl font-bold mb-3 group-hover:text-pink-500 transition-colors leading-snug">
                {poema.titulo}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-4 whitespace-pre-line">
                {poema.contenido}
              </p>
              <span className="text-xs text-gray-300">
                {new Date(poema.fechaPublicacion).toLocaleDateString("es-ES", {
                  day: "numeric", month: "long", year: "numeric"
                })}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}