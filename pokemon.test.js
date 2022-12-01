const EasyGraphQLTester = require("easygraphql-tester");
const schemaCode = require("./controllers/schema");

describe("Test my queries, mutations and subscriptions", () => {
  let tester;

  beforeAll(() => {
    tester = new EasyGraphQLTester([schemaCode]);
  });

  //   should pass if query is invalid
  describe("Should pass if the query is invalid", () => {
    it("Invalid query getAllPokemon", () => {
      const invalidQuery = `
      query GetAllPokemon {
        getAllPokemon {
            names
        }
    }
`;
      tester.test(false, invalidQuery);
    });

    // if passing, the query is valid
    describe("Should pass if the query is valid", () => {
      it("Gets all pokemon if valid", () => {
        const validQuery = `
      query GetAllPokemon {
        getAllPokemon {
            name
        }
    }
        `;
        tester.test(true, validQuery);
      });
    });
  });

  //   If invalid pokdemon id, it passes
  describe("Should pass if the query is invalid", () => {
    it("passes if the pokemon is invalid", () => {
      const validQuery = `
    query GetAllPokemon {
      getOnePokemon(_id: "") {
          name
      }
  }
      `;
      tester.test(false, validQuery);
    });
  });
});
