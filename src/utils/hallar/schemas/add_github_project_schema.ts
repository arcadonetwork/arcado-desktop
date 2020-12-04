

export const addGithubProjectSchema = {
  $id: "hallar/projects/add",
  type: "object",
  required: ["id", "fullName"],
  properties: {
    id: {
      dataType: "uint32",
      fieldNumber: 1,
    },
    fullName: {
      dataType: "string",
      fieldNumber: 2,
    }
  }
};
