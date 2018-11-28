const products = {
  type: "array",
  items: {
    type: "object",
    required: [
      "name",
      "code",
    ],
    properties: {
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
