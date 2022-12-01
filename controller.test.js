const EasyGraphQLTester = require("easygraphql-tester");
const schemaCode = require("./controllers/schema");

let tester;
beforeAll(() => {
  tester = new EasyGraphQLTester(schemaCode);
});

it("Should get all pokemon", () => {
  const query = `
        query GetAllPokemon {
            getAllPokemon {
                name
            }
        }
    `;
  tester.test(true, query);
});

it("Should get all pokemon", () => {
  const query = `
          query GetOnePokemon {
              getOnePokemon(id: "6382634656c2e25495010ec5") {
                  name
              }
          }
      `;
  tester.test(true, query, { id: "6382634656c2e25495010ec5" });
});
