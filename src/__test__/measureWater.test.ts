import measureWater from '../utils/measureWater';

test('Measures 4 gallons with jugs of 3 and 5 gallons', () => {
  const result = measureWater(3, 5, 4);
  expect(result).toEqual([
    'Fill Jug Y (0, 5)',
    'Transfer from Jug Y to Jug X (3, 2)',
    'Empty Jug X (0, 2)',
    'Transfer from Jug Y to Jug X (2, 0)',
    'Fill Jug Y (2, 5)',
    'Transfer from Jug Y to Jug X (3, 4)',
  ]);
});

test('Measures 6 gallons with jugs of 6 and 9 gallons', () => {
  const result = measureWater(6, 9, 6);
  expect(result).toEqual(['Fill Jug X (6, 0)']);
});

test('Returns "No Solution" when impossible', () => {
  const result = measureWater(2, 6, 5);
  expect(result).toEqual(['No Solution']);
});

test('Measures 96 gallons with jugs of 2 and 100 gallons', () => {
  const result = measureWater(2, 100, 96);
  expect(result).toEqual([
    'Fill Jug Y (0, 100)',
    'Transfer from Jug Y to Jug X (2, 98)',
    'Empty Jug X (0, 98)',
    'Transfer from Jug Y to Jug X (2, 96)',
  ]);
});
