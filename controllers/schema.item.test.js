const EasyGraphQLTester = require('easygraphql-tester');
const schemaCode = require('./schema');

let tester;
beforeAll(() => {
  tester = new EasyGraphQLTester(schemaCode);
});

it('Should get all items', () => {
  const query = `
        query GetAllItems {
            getAllItems {
                name
            }
        }
    `;
  tester.test(true, query);
});

it('Should get one item', () => {
  const query = `
          query GetOneItem {
              getOneItem(id: "6382608a12372a711dfb0d44") {
                  name
              }
          }
      `;
  tester.test(true, query, { id: '6382608a12372a711dfb0d44' });
});

it('Should get one null item and fail', () => {
  const query = `
          query GetOneItem {
            getOneItem(id: ) {
                  name
              }
          }
      `;
  tester.test(false, query);
});

it('Should not get all items', () => {
  const query = `
        query GetAllItemnds {
            getAllItems {
                nameds
            }
        }
    `;
  tester.test(false, query);
});
