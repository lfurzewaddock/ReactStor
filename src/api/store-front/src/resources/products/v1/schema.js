const products = {
  type: "array",
  items: {
    type: "object",
    required: [
      "id",
      "name",
      "code",
    ],
    properties: {
      id: {
        type: "string",
      },
      name: {
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
