import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "portfolio/api-docs/generated/synonyms-api/synonyms-api",
    },
    {
      type: "category",
      label: "Synonyms API reference",
      link: {
        type: "doc",
        id: "portfolio/api-docs/generated/synonyms-api/synonyms",
      },
      items: [
        {
          type: "doc",
          id: "portfolio/api-docs/generated/synonyms-api/list-synonyms",
          label: "List synonym entries",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "portfolio/api-docs/generated/synonyms-api/create-synonym",
          label: "Create a synonym entry",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "portfolio/api-docs/generated/synonyms-api/get-synonym",
          label: "Get a synonym entry",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "portfolio/api-docs/generated/synonyms-api/update-synonym",
          label: "Update a synonym entry",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "portfolio/api-docs/generated/synonyms-api/delete-synonym",
          label: "Delete a synonym entry",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "portfolio/api-docs/generated/synonyms-api/expand-query",
          label: "Expand a search query",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
