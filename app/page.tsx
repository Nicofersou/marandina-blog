import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Cabecera hero */}
      <section className="text-center py-10 md:py-16 border-b border-pink-100 mb-12">
        <p className="text-xs uppercase tracking-widest text-pink-400 mb-4">
          Creatividad · Pensamiento crítico · Sin filtros
        </p>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
          Moda, arte y política<br />
          <span style={{ color: "var(--pink-primary)" }}>con opinión propia</span>
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto text-base md:text-lg px-4">
          Un espacio digital donde la creatividad y el pensamiento crítico se encuentran.
        </p>
      </section>

      {/* Grid de artículos */}
      <section>
        <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-8">
          Últimos artículos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ArticleCard
            categoria="Política & Cultura"
            titulo="Política de identidad y uniformidad"
            extracto="Vivimos rodeados de estéticas pulcras y vidas de catálogo que están diluyendo quiénes somos."
            fecha="10 Jun 2025"
            slug="politica-identidad-uniformidad"
          />
        </div>
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