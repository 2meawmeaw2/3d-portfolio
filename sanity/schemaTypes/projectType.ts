export const projectType = {
  name: "project",
  type: "document",
  title: "Project",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Project Title",
    },
    {
      name: "subtitle",
      type: "string",
      title: "Subtitle",
      description: "Short one-liner shown under the title",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "description",
      type: "text",
      title: "Description",
    },
    {
      name: "url",
      type: "url",
      title: "Project URL",
    },
    {
      name: "image",
      type: "image",
      title: "Project image",
    },
    {
      name: "gallery",
      type: "array",
      title: "Gallery",
      of: [{ type: "image" }],
    },
    {
      name: "technologies",
      type: "array",
      title: "Technologies",
      of: [{ type: "string" }],
    },
  ],
};
