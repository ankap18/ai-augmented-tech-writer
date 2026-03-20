import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "portfolio/api-/synonyms-api",
    },
    {
      type: "category",
      label: "Synonyms",
      link: {
        type: "doc",
        id: "portfolio/api-/synonyms",
      },
      items: [
        {
          type: "doc",
          id: "portfolio/api-/create-synonym",
          label: "Create a synonym entry",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "portfolio/api-/list-synonyms",
          label: "List synonym entries",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "portfolio/api-/get-synonym",
          label: "Get a synonym entry",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "portfolio/api-/update-synonym",
          label: "Update a synonym entry",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "portfolio/api-/delete-synonym",
          label: "Delete a synonym entry",
          className: "api-method delete",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
