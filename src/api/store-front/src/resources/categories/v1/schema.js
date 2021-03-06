const categories = {
  type: "array",
  items: {
    type: "object",
    required: [
      "id",
      "nlevel",
      "path",
    ],
    properties: {
      id: {
        type: "integer",
      },
      nlevel: {
        type: "integer",
      },
      path: {
        type: "string",
      },
      heading: {
        type: "string",
      },
      body: {
        type: "string",
      },
    },
  },
};

export default {
  categories,
};
