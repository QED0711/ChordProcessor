"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getPermutations = function getPermutations(arr) {
    var permutations = [];
    var nextPermutation = [];

    function permutate(arr) {
        if (arr.length === 0) {
            permutations.push(nextPermutation.slice());
        }

        for (var i = 0; i < arr.length; i++) {
            arr.push(arr.shift());
            nextPermutation.push(arr[0]);
            permutate(arr.slice(1));
            nextPermutation.pop();
        }
    }

    permutate(arr);

    return permutations;
};

exports["default"] = getPermutations;
module.exports = exports["default"];
