const newUser = {
  type: "object",
  required: [
    "firstName",
    "lastName",
    "postalAddress",
    "email",
    "password",
  ],
  properties: {
    firstName: {
      type: "string",
      minLength: 1,
    },
    lastName: {
      type: "string",
      minLength: 1,
    },
    postalAddress: {
      type: "string",
      minLength: 1,
    },
    billingAddress: {
      type: "string",
      minLength: 1,
    },
    email: {
      type: "string",
      minLength: 5,
      format: "email",
    },
    password: {
      type: "string",
      minLength: 8,
      // upper & lower case, number (note: backslash escaped)
      // pattern: "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$",
      // min. 8 chars: upper & lower case, number & symbol (note: backslash escaped)
      pattern: "(?=^.{8,}$)(?=.*\\W+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$",
    },
  },
};

export default {
  newUser,
};
