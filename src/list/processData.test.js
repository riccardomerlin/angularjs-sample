const processData = require('../list/processData.js');

describe('processData', () => {
  let dataSource;
  describe('getNewResults', () => {
    beforeEach(() => {
      dataSource = [
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
    });

    test('skip 0, limit 10 => return 10 elements', () => {
      const results = processData.getNewResults(dataSource, 0, 10);
      expect(results.length).toBe(10);
    });

    test('skip 0, limit 5 => return 5 elements', () => {
      const results = processData.getNewResults(dataSource, 0, 5);
      expect(results.length).toBe(5);
    });

    test('skip 0, limit 20 => return 5 elements', () => {
      const results = processData.getNewResults(dataSource, 0, 20);
      expect(results.length).toBe(15);
    });

    test('skip 5, limit 5 => return 5 elements', () => {
      const results = processData.getNewResults(dataSource, 5, 5);
      expect(results.length).toBe(5);
    });

    test('skip 5, limit 10 => result is equal to dataSource', () => {
      const results = processData.getNewResults(dataSource, 5, 10);
      expect(results.length).toBe(10);
    });

    test('skip 15, limit 10 => result 0 elements', () => {
      const results = processData.getNewResults(dataSource, 15, 10);
      expect(results.length).toBe(0);
    });

    test('skip 5, limit 0 => result 0 elements', () => {
      const results = processData.getNewResults(dataSource, 5, 0);
      expect(results.length).toBe(0);
    });
  });

  describe('getNewResults with filter', () => {
    beforeEach(() => {
      dataSource = [
        { nm: 'Aaberg', va: 'v0' },
        { nm: 'Aaby', va: 'v0' },
        { nm: 'Tadland', va: 'v0' },
        { nm: 'Aagaard', va: 'v0' },
        { nm: 'Aakre', va: 'v0' },
        { nm: 'Aaland', va: 'v0' },
        { nm: 'Balbers', va: 'v0' },
        { nm: 'Balderink', va: 'v0' },
        { nm: 'Valund', va: 'v0' },
        { nm: 'Aamodt', va: 'v0' },
        { nm: 'Vamot', va: 'v0' },
        { nm: 'Ganderud', va: 'v0' },
        { nm: 'Sanenson', va: 'v0' },
        { nm: 'Oanerud', va: 'v0' },
        { nm: 'Xarant', va: 'v0' },
      ];
    });

    test('should return 6 items when apply "A" filter', () => {
      const result = processData.getNewResults(dataSource, 0, 10, 'A');
      expect(result.length).toBe(6);
    });

    test('should return 6 items when apply "a" filter', () => {
      const result = processData.getNewResults(dataSource, 0, 10, 'a');
      expect(result.length).toBe(6);
    });

    test('should return 3 items when apply "A" filter and limit to 3', () => {
      const result = processData.getNewResults(dataSource, 0, 3, 'A');
      expect(result.length).toBe(3);
    });

    test('should return 2 items when apply "B" filter and limit to 3', () => {
      const result = processData.getNewResults(dataSource, 0, 3, 'B');
      expect(result.length).toBe(2);
    });

    test('should return 2 items when apply "vytg" filter and limit to 10', () => {
      const result = processData.getNewResults(dataSource, 0, 10, 'vytg');
      expect(result.length).toBe(2);
    });
  });
});
