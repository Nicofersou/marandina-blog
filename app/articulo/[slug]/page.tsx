import Link from "next/link";

// Por ahora los artículos están aquí hardcodeados
// Cuando integremos Sanity vendrán de la base de datos
const articulos = [
  {
    slug: "politica-identidad-uniformidad",
    categoria: "Política & Cultura",
    titulo: "Política de identidad y uniformidad",
    fecha: "10 Jun 2025",
    contenido: `
      Vivimos rodeados de estéticas pulcras y vidas de catálogo que están diluyendo quiénes somos. El minimalismo actual no es solo una elección de diseño; es una declaración política que impone lo neutro como el estándar de lo "civilizado". Es un borrado cultural en toda regla. Mientras el beige es sofisticado, el color y los ornamentos se tachan de manera grotesca. Hemos convertido una herencia eurocéntrica en la norma, y en el camino, estamos perdiendo la riqueza de todo lo que se atreve a brillar fuera del molde.

      En el ecosistema actual de las redes sociales, donde el algoritmo es el nuevo juez del estilo, la sociedad ha caído bajo la tiranía del lifestyle perfecto. Entrar a Instagram o a TikTok es sumergirse en un mar eterno de tonos beige, muebles de líneas gélidas y un sinfín de rostros guiándose por la estética del clean look: una estética que nos promete orden, paz y una supuesta limpieza* espiritual. Pero, detrás de esa fachada de serenidad minimalista, se esconde una política de identidad mucho más agresiva de lo que parece.

      Para entender por qué nos obsesiona tanto el beige, debemos viajar a 1908. En aquel entonces, el arquitecto austriaco Adolf Loos escribió un ensayo que cambiaría el diseño para siempre: Ornamento y Delito. En él, Loos lanzaba una bomba que todavía resuena en nuestros armarios contemporáneos: afirmaba que el ornamento era un signo de atraso y que el hombre moderno civilizado ya no necesita tatuajes ni adornos. Para Loos, las culturas que utilizaban patrones complejos eran primitivas. Según su lógica, el progreso humano se medía por cuánta identidad visual estábamos dispuestos a borrar. Hoy, el clean look es el heredero directo de ese prejuicio.

      Este minimalismo no es solo una elección de color; es un mecanismo de exclusión. El aspecto limpio exige rasgos específicos y recursos caros: pieles perfectas, cabellos controlados y una gran apariencia de no haberse esforzado que, claramente, cuesta mucho dinero mantener.

      No se trata de declararle una guerra al minimalismo o de tirar nuestras prendas básicas. El problema surge cuando la naturalidad se vuelve obligatoria. Cuando el buen gusto se usa como una barrera para decidir quién pertenece a la modernidad y quién se queda fuera por ser demasiado colorido.

      Debemos empezar a ver el color y la opulencia no como un error de estilo, sino como un acto de resistencia. Cada vez que elegimos un textil que cuenta una historia o un accesorio que rompe la monotonía del algoritmo, estamos reclamando nuestra identidad frente a una marea que intenta homogeneizarnos.

      Si el futuro es realmente inclusivo, no puede ser solo de color crema. Tiene que ser tan vibrante y diverso como las culturas que habitan en él.

      *limpieza: lo que llamamos limpio, muchas veces es simplemente una mirada que ha decidido ignorar la historia.
    `,
  },
];

export default async function ArticuloPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articulo = articulos.find((a) => a.slug === slug);

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
      {/* Cabecera del artículo */}
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
          <span>{articulo.fecha}</span>
          <span>·</span>
          <span>Marandina</span>
        </div>
      </header>

      {/* Contenido del artículo */}
      <div className="prose prose-lg max-w-none">
        {articulo.contenido.trim().split("\n\n").map((parrafo, i) => (
          <p key={i} className="text-gray-700 leading-relaxed mb-6 text-lg">
            {parrafo.trim()}
          </p>
        ))}
      </div>

      {/* Footer del artículo */}
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