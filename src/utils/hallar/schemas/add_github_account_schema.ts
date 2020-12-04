export const addGithubAccountSchema = {
  $id: "hallar/addGithubAccount",
  type: "object",
  required: ["github"],
  properties: {
    github: {
      type: "object",
      fieldNumber: 1,
      properties : {
        id: {
          dataType: "uint32",
          fieldNumber: 2,
        },
        username: {
          dataType: "string",
          fieldNumber: 3,
        }
      }
    }
  }
};
