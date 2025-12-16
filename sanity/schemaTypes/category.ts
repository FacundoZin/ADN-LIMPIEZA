import { defineType, defineField } from "sanity";

export const category = defineType({
  name: "category",
  title: "Categoría",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nombre de la categoría",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
