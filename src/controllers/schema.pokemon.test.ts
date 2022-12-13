const EasyGraphQLTester = require('easygraphql-tester');
const schemaCode = require('./schema');

let tester:any;
beforeAll(() => {
  tester = new EasyGraphQLTester(schemaCode);
});

it('Should get all pokemon', () => {
  const query = `
        query GetAllPokemon {
            getAllPokemon {
                name
            }
        }
    `;
  tester.test(true, query);
});

it('Should get one pokemon', () => {
  const query = `
          query GetOnePokemon {
              getOnePokemon(id: "6382634656c2e25495010ec5") {
                  name
              }
          }
      `;
  tester.test(true, query, { id: '6382634656c2e25495010ec5' });
});

it('Should get one null pokemon and fail', () => {
  const query = `
          query GetOnePokemon {
              getOnePokemon(id: ) {
                  name
              }
          }
      `;
  tester.test(false, query);
});

it('Should not get all pokemon', () => {
  const query = `
        query GetAllPokemonds {
            getAllPokemon {
                nameds
            }
        }
    `;
  tester.test(false, query);
});

export {};