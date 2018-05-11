"use strict";


const getPermutations = (arr) => {
    let permutations = [];
    let nextPermutation = [];

    function permutate(arr) {
        if (arr.length === 0) {
            permutations.push(nextPermutation.slice());
        }

        for (let i = 0; i < arr.length; i++) {
            arr.push(arr.shift());
            nextPermutation.push(arr[0]);
            permutate(arr.slice(1));
            nextPermutation.pop();
        }
    }

    permutate(arr);

    return permutations;
};

export default getPermutations;