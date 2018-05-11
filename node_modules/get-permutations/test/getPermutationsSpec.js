/*global describe it*/
import assert from 'assert';
import getPermutations from '../src/getPermutations.js';

describe('getPermutations() should...', function () {
    it(`perumtate array with chars`, function () {
        const permutations = getPermutations(['a','b']);
        assert.deepEqual(permutations, [['b','a'],['a','b']]);
    });

    it(`perumtate array with numbers`, function () {
        const permutations = getPermutations([1,0,1]);
        assert.deepEqual(permutations, [[0,1,1],[0,1,1],[1,0,1],[1,1,0],[1,1,0],[1,0,1]]);
    });
});