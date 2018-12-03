const routes = {
  type: "array",
  items: {
    type: "object",
    required: [
      "id",
      "runtime",
      "subject",
    ],
    properties: {
      id: {
        type: "integer",
      },
      runtime: {
        type: "boolean",
      },
      subject: {
        type: "string",
      },
      matter: {
        type: ["object", "null"],
      },
    },
  },
};

export default {
  routes,
};
