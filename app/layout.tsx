import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Marandina Blogazine",
  description: "Un espacio digital donde la creatividad y el pensamiento crítico se encuentran.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <header className="border-b-2 border-pink-400 py-6 px-8 bg-white">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold tracking-widest uppercase"
                style={{ color: "var(--pink-primary)" }}>
                Marandina
              </h1>
              <p className="text-xs tracking-widest uppercase text-gray-500">
                Blogazine
              </p>
            </div>
            <nav className="flex flex-wrap justify-center gap-4 text-sm uppercase tracking-widest">
              <Link href="/" className="hover:text-pink-500 transition-colors">Inicio</Link>
              <Link href="/moda" className="hover:text-pink-500 transition-colors">Moda</Link>
              <Link href="/arte" className="hover:text-pink-500 transition-colors">Arte</Link>
              <Link href="/politica" className="hover:text-pink-500 transition-colors">Política</Link>
            </nav>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-8 py-12">
          {children}
        </main>

        <footer className="border-t border-pink-200 py-8 text-center text-sm text-gray-400 mt-16">
          © 2025 Marandina Blogazine — Todos los derechos reservados
        </footer>
      </body>
    </html>
  );
}