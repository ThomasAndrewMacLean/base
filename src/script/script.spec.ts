import { sum } from './sum';

describe('test', () => {
    it('should add', () => {
        expect(sum(1, 4)).toBe(5);
    });
});
