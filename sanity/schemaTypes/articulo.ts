export const articulo = {
  name: "articulo",
  title: "Artículo",
  type: "document",
  fields: [
    {
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug (URL del artículo)",
      type: "slug",
      options: {
        source: "titulo",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "categoria",
      title: "Categoría",
      type: "string",
      options: {
        list: [
          { title: "Moda", value: "moda" },
          { title: "Arte", value: "arte" },
          { title: "Política & Cultura", value: "politica" },
          { title: "Maquillaje", value: "maquillaje" },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "extracto",
      title: "Extracto (resumen corto para la tarjeta)",
      type: "text",
      rows: 3,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "contenido",
      title: "Contenido",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "fechaPublicacion",
      title: "Fecha de publicación",
      type: "datetime",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "imagenPortada",
      title: "Imagen de portada",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
};