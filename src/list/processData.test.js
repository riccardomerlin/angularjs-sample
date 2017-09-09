const processData = require('../list/processData.js');

describe('processData', () => {
  describe('getNewResults', () => {
    const dataSource = [
      { nm: 'Aaberg', va: 'v0' },
      { nm: 'Aaby', va: 'v0' },
      { nm: 'Aadland', va: 'v0' },
      { nm: 'Aagaard', va: 'v0' },
      { nm: 'Aakre', va: 'v0' },
      { nm: 'Aaland', va: 'v0' },
      { nm: 'Aalbers', va: 'v0' },
      { nm: 'Aalderink', va: 'v0' },
      { nm: 'Aalund', va: 'v0' },
      { nm: 'Aamodt', va: 'v0' },
      { nm: 'Aamot', va: 'v0' },
      { nm: 'Aanderud', va: 'v0' },
      { nm: 'Aanenson', va: 'v0' },
      { nm: 'Aanerud', va: 'v0' },
      { nm: 'Aarant', va: 'v0' },
    ];

    test('empty collection, dataSource contains 15 elements, limit 10 => return 10 elements', () => {
      const results = processData.getNewResults([], dataSource, 10);

      expect(results.length).toBe(10);
    });

    test('empty collection, dataSource contains 15 elements, limit 5 => return 5 elements', () => {
      const results = processData.getNewResults([], dataSource, 5);

      expect(results.length).toBe(5);
    });

    test('empty collection, dataSource contains 15 elements, limit 20 => return 5 elements', () => {
      const results = processData.getNewResults([], dataSource, 20);

      expect(results.length).toBe(15);
    });

    test('collection with 5 elements, dataSource contains 15 elements, limit 5 => return 10 elements', () => {
      const collection = [
        { nm: 'Aaberg', va: 'v0' },
        { nm: 'Aaby', va: 'v0' },
        { nm: 'Aadland', va: 'v0' },
        { nm: 'Aagaard', va: 'v0' },
        { nm: 'Aakre', va: 'v0' },
      ];

      const results = processData.getNewResults(collection, dataSource, 5);

      expect(results.length).toBe(10);
    });

    test('collection with 5 elements, dataSource contains 15 elements, limit 10 => result is equal to dataSource', () => {
      const collection = [
        { nm: 'Aaberg', va: 'v0' },
        { nm: 'Aaby', va: 'v0' },
        { nm: 'Aadland', va: 'v0' },
        { nm: 'Aagaard', va: 'v0' },
        { nm: 'Aakre', va: 'v0' },
      ];

      const results = processData.getNewResults(collection, dataSource, 10);

      expect(results).toEqual(expect.arrayContaining(dataSource));
    });

    test('collection with 15 elements, dataSource contains 15 elements, limit 10 => result 15 elements equal to dataSource', () => {
      const collection = [
        { nm: 'Aaberg', va: 'v0' },
        { nm: 'Aaby', va: 'v0' },
        { nm: 'Aadland', va: 'v0' },
        { nm: 'Aagaard', va: 'v0' },
        { nm: 'Aakre', va: 'v0' },
        { nm: 'Aaland', va: 'v0' },
        { nm: 'Aalbers', va: 'v0' },
        { nm: 'Aalderink', va: 'v0' },
        { nm: 'Aalund', va: 'v0' },
        { nm: 'Aamodt', va: 'v0' },
        { nm: 'Aamot', va: 'v0' },
        { nm: 'Aanderud', va: 'v0' },
        { nm: 'Aanenson', va: 'v0' },
        { nm: 'Aanerud', va: 'v0' },
        { nm: 'Aarant', va: 'v0' },
      ];

      const results = processData.getNewResults(collection, dataSource, 10);

      expect(results.length).toBe(15);
      expect(results).toEqual(expect.arrayContaining(dataSource));
    });

    test('collection with 5 elements, dataSource contains 15 elements, limit 0 => result 5 elements equal to collection', () => {
      const collection = [
        { nm: 'Aaberg', va: 'v0' },
        { nm: 'Aaby', va: 'v0' },
        { nm: 'Aadland', va: 'v0' },
        { nm: 'Aagaard', va: 'v0' },
        { nm: 'Aakre', va: 'v0' },
      ];

      const results = processData.getNewResults(collection, dataSource, 0);

      expect(results.length).toBe(5);
      expect(results).toEqual(expect.arrayContaining(collection));
    });
  });
});
