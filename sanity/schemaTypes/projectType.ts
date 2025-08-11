import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType, defineArrayMember } from "sanity";

export const projectType = defineType({
  name: "meaw",
  title: "meaw",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "Project URL",
      type: "url",
      validation: (Rule) =>
        Rule.uri({ allowRelative: false, scheme: ["http", "https"] }),
    }),

    defineField({
      name: "skills",
      title: "Skills Used",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "img",
      title: "imgPath",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
});

export default projectType;
