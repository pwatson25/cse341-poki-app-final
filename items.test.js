const EasyGraphQLTester = require("easygraphql-tester");
const schemaCode = require("./controllers/schema");

describe("Test my queries, mutations and subscriptions", () => {
  let tester;

  beforeAll(() => {
    tester = new EasyGraphQLTester([schemaCode]);
  });

  //   should pass if query is valid
  describe("Should pass if the query is valid", () => {
    it("Invalid query getAllPokemon", () => {
      const invalidQuery = `
      query getAllItems {
        getAllItems {
            id
            name
        }
    }
  `;
      tester.test(true, invalidQuery);
    });
  });

  //   should pass if query is invalid
  describe("Should pass if the query is invalid", () => {
    it("Invalid query getAllPokemon", () => {
      const invalidQuery = `
      query getAllItems {
        getAllItems {
            ids
            name
        }
    }
  `;
      tester.test(false, invalidQuery);
    });
  });

  //   should pass if query is valid
  describe("Should pass if the query is valid", () => {
    it("valid query to get one item", () => {
      const validQuery = `
      query getOneItem {
        getOneItem(id: "6382608a12372a711dfb0d44") {
            id
            name
        }
    }
  `;
      tester.test(true, validQuery);
    });
  });

  //   should pass if query is invalid
  describe("Should pass if the query is invalid", () => {
    it("valid query to get one item", () => {
      const invalidQuery = `
      query getOneItem {
        getOneItem(id: "6382608a12372a711dfb0d") {
            id
            named
        }
    }
  `;
      tester.test(false, invalidQuery);
    });
  });
});
