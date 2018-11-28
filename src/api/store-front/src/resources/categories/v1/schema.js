const categories = {
  type: "array",
  items: {
    type: "object",
    required: [
      "nlevel",
      "path",
    ],
    properties: {
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
