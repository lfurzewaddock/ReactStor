const products = {
  type: "array",
  items: {
    type: "object",
    required: [
      "id",
      "title",
      "code",
    ],
    properties: {
      id: {
        type: "integer",
      },
      title: {
        type: "string",
      },
      code: {
        type: "string",
      },
    },
  },
};

export default {
  products,
};
