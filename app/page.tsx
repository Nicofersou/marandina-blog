import Link from "next/link";
import { client } from "../sanity/lib/client";
import Image from "next/image";

type Articulo = {
  _id: string;
  titulo: string;
  slug: { current: string };
  categoria: string;
  extracto: string;
  fechaPublicacion: string;
};

async function getArticulos(): Promise<Articulo[]> {
  return client.fetch(`
    *[_type == "articulo"] | order(fechaPublicacion desc) {
      _id,
      titulo,
      slug,
      categoria,
      extracto,
      fechaPublicacion
    }
  `);
}

export default async function Home() {
  const articulos = await getArticulos();

  return (
    <div>
      <section className="py-10 md:py-16 border-b border-pink-100 mb-12">
  <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
    
    {/* Texto */}
    <div className="flex-1 text-center md:text-left">
      <p className="text-xs uppercase tracking-widest text-pink-400 mb-4">
        Creatividad · Pensamiento crítico · Sin filtros
      </p>
      <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
        Moda, arte y política<br />
        <span style={{ color: "var(--pink-primary)" }}>con opinión propia</span>
      </h2>
      <p className="text-gray-500 max-w-xl text-base md:text-lg">
        Un espacio digital donde la creatividad y el pensamiento crítico se encuentran.
      </p>
    </div>

    {/* GIF */}
    <div className="flex-1 flex justify-center">
      <Image
        src="pig.gif"
        alt="Marandina"
        width={320}
        height={320}
        className="rounded-lg"
        unoptimized
/>
    </div>

  </div>
</section>

      <section>
        <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-8">
          Últimos artículos
        </h3>
        {articulos.length === 0 ? (
          <p className="text-gray-400 text-center py-16">No hay artículos publicados todavía.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articulos.map((articulo) => (
              <ArticleCard
                key={articulo._id}
                categoria={articulo.categoria}
                titulo={articulo.titulo}
                extracto={articulo.extracto}
                fecha={new Date(articulo.fechaPublicacion).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
                slug={articulo.slug.current}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function ArticleCard({
  categoria, titulo, extracto, fecha, slug
}: {
  categoria: string;
  titulo: string;
  extracto: string;
  fecha: string;
  slug: string;
}) {
  return (
    <Link href={`/articulo/${slug}`}
      className="group block border-2 border-pink-200 rounded-lg p-6 hover:border-pink-400 transition-all hover:shadow-lg bg-white">
      <span className="text-xs uppercase tracking-widest"
        style={{ color: "var(--pink-primary)" }}>
        {categoria}
      </span>
      <h4 className="text-xl font-bold mt-2 mb-3 group-hover:text-pink-500 transition-colors leading-snug">
        {titulo}
      </h4>
      <p className="text-gray-500 text-sm leading-relaxed mb-4">
        {extracto}
      </p>
      <span className="text-xs text-gray-300">{fecha}</span>
    </Link>
  );
}