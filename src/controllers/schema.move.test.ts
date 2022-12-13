const EasyGraphQLTester = require('easygraphql-tester');
const schemaCode = require('./schema');

let tester;
beforeAll(() => {
  tester = new EasyGraphQLTester(schemaCode);
});

it('Should get all moves', () => {
  const query = `
        query GetAllMoves {
            getAllMoves {
                name
            }
        }
    `;
  tester.test(true, query);
});

it('Should get one move', () => {
  const query = `
          query GetOneMove {
              getOneMove(id: "6382607412372a711dfb0071") {
                  name
              }
          }
      `;
  tester.test(true, query, { id: '6382607412372a711dfb0071' });
});

it('Should get one null move and fail', () => {
  const query = `
          query GetOneMove {
            getOneMove(id: ) {
                  name
              }
          }
      `;
  tester.test(false, query);
});

it('Should not get all moves', () => {
  const query = `
        query GetAllMovends {
            getAllMoves {
                nameds
            }
        }
    `;
  tester.test(false, query);
});

export {};