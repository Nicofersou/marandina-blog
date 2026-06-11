import { Rule } from "sanity";

export const poema = {
  name: "poema",
  title: "Poema",
  type: "document",
  fields: [
    {
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug (URL del poema)",
      type: "slug",
      options: {
        source: "titulo",
        maxLength: 96,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "contenido",
      title: "Contenido del poema",
      type: "text",
      rows: 20,
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "fechaPublicacion",
      title: "Fecha de publicación",
      type: "datetime",
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
};