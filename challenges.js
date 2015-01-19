/*
* A child is running up a staircase with n steps, and can hop either 1 step, 2 steps,
* or 3 steps at a time. Implement a method to count how many possible ways the
* child can run up the stairs.
*/
var countSteps = (function () {

  var memo = [0,1];

  var fn = function (numStairs) {

    if (numStairs <= 0) {
      return 0;
    }

    if (typeof memo[numStairs] !== 'number') {
      memo[numStairs] = fn(numStairs - 3) + fn(numStairs - 2) + fn(numStairs - 1);
    }

    return memo[numStairs]
  };

  return fn;

})();

/*
* Imagine a robot sitting on the upper left corner of an X by Y grid. The robot can
* only move in two directions: right and down. How many possible paths are there
* for the robot to go from (0,0) to (X,Y)?
*/
var countPaths = ( function () {

  // 2D array memo for params [x][y]
  var memo = [[1]];

  var fn = function (x, y) {

    if (x < 0 || y < 0) {
      return 0;
    }

    if (!memo[x]) {
      memo[x] = [];
    }

    if (typeof memo[x][y] !== 'number') {
      memo[x][y] = fn(x-1, y) + fn(x, y-1);
    }

    return memo[x][y];

  };

  return fn;

})();

/*
  Write a method to compute all permutations of a string
*/
function permute(string) {
  if(string.length == 1){
    return string;
  }

  var permuteNMinus1 = permute(string.slice(1));
  var permutations = [];

  for (var j = 0; j < permuteNMinus1.length; j++){
    permutation = permuteNMinus1[j];
    for (var i = 0; i <= permutation.length; i++){
      permutations.push(permutation.slice(0, i) + string[0] + permutation.slice(i));
    }
  }

  return permutations;
}

/*
 * Implement an algorithm to print all valid (e.g., properly opened and closed)
 * combinations of n-pairs of parentheses.

  n = 0 -> ''
  n = 1 -> ()
  n = 2 -> (()), ()()
  n = 3 -> ()(()), (()()), ((())), ()()(), (())(), ()()()
*/
function makeParens(n) {

  if(n === 1){
    return(['()']);
  }

  var makeParensNMinus1 = makeParens(n-1);
  var result = [];

  makeParensNMinus1.forEach(function(combination, i){
    result.push(combination + '()');
    if(combination + '()' !== '()' + combination){
      result.push('()' + combination);
    }
    result.push('(' + combination + ')');
  });

  return result;

}

/*
 Given an input array and another array that describes a new index for each
 element, mutate the input array so that each element ends up in their new
 index. Discuss the runtime of the algorithm and how you can be sure there
 won't be any infinite loops.
*/
function mutateArray (inputArray, indexArray) {

  function swap (array, newIndex, oldIndex) {
        tmp = array[newIndex];
        array[newIndex] = array[oldIndex];
        array[oldIndex] = tmp;
  }

  var tmp;
  var sorted = false;

  while (!sorted) {

    sorted = true;

    indexArray.forEach(function (newIndex, oldIndex) {
      if(newIndex !== oldIndex){
        swap(inputArray, newIndex, oldIndex);
        swap(indexArray, newIndex, oldIndex);
        sorted = false;
      }
    });
  }

  return inputArray;
}

/*
 Implemenent a function to find the square root of a number, without using
 math.sqrt();

 NB: can also use newton's method
*/
function sqrt (n) {

  var start = 0;
  var end = n/2;
  var epsilon = 0.00001;

  var choice = (end - start) / 2;
  var result = choice * choice;

  while (Math.abs(result - n) > epsilon) {
    if (result > n) {
      end = choice;
    } else {
      start = choice;
    }

    choice = start + (end - start) / 2;
    result = choice * choice;
  };

  return choice.toFixed(5);

}


/*
 Recursive array flattening function
*/
function flattenArray (array) {

  var result = [];

  var fn = function (array) {

    array.forEach(function (item) {

      if (Array.isArray(item)) {
        fn(item);
      } else {
        result.push(item);
        return;
      };

    });

  };

  fn(array);

  return result;

};

/*
 Array flattening function the clever(er?) way
*/
function flattenArray2 (array) {
  return array.toString().split(',').map(function (n) {
    return parseInt(n);
  });
};

/*
*
* BFS - using while loop
*/
function bfs(tree) {

  var currentNode, children;
  var queue = [tree];

  while (queue.length > 0) {
    currentNode = queue.shift();
    children = currentNode.children;

    children && children.forEach(function (child) {
      queue.push(child);
    });

    console.log(currentNode.value);
  };

};

/*
*
* DFS - using while loop
*/
function dfs(tree) {

  var currentNode;
  var children;
  var stack = [tree];

  while (stack.length > 0) {
    currentNode = stack.pop();
    children = currentNode.children;

    children && children.reverse().forEach(function (child) {
      stack.push(child);
    });

    console.log(currentNode.value);
  };

};

/*
*
* recursive DFS
*/
function recursiveDfs(node) {

  var children = node.children || [];
  if (children.length) {
    node.children.forEach(function(child){
      recursiveDfs(child);
    });
  }

  console.log(node.value);

  return;

};

/*
* NB: When using DFS and BFS on a graph, you must keep track of the
* visited nodes to prevent infinite loops
*/


/*
* Convert a roman numeral string to an integer
*/
function convertRoman (roman) {

  var key = {
    M:1000,
    D:500,
    C:100,
    L:50,
    X:10,
    V:5,
    I:1
  }

  var result = 0;
  var romanArray = roman.split('');
  var prevVal = romanArray[0];

  romanArray.forEach(function(char){
    var val = key[char];

    result += (prevVal < val) ? val - 2 * prevVal : val;

    prevVal = val;
  });

  return result;
};

/*
* Return all substrings of a string
*/
function subStrings(string){

  if (string.length == 0) {
    return [''];
  }

  var first = string[0];
  var rest = string.slice(1);
  var subStringsOfRest = subStrings(rest);
  var len = subStringsOfRest.length;

  for (var i = 0; i < len; i++) {
    subStringsOfRest.push(first + subStringsOfRest[i]);
  };

  return subStringsOfRest;

};


/*
* find out if a string is a palindrome
*/
function isPalindrome(string){

  var start = 0;
  var end = string.length - 1;

  while(string[start] === string[end]) {

    if (start >= end) return true;

    start++; end--;
  }

  return false;

};

/*
* recursive is Palindrome
*/

function recursiveIsPalindrome(string) {

  if (string.length === 0) {
    return true;
  } else {
    return (
      (string[0] === string[string.length -1]) &&
      isPalindrome(string.slice(1, string.length - 1))
            );
  }

};


/*
* Lowest common ancestor of two nodes in a binary tree.
*/

function findLCA(tree, node1, node2){

  // If both nodes lie in left subtree then
  // LCA is in left subtree
  if(node1.val < tree.val && node2.val < tree.val){

    return findLCA(tree.left, node1, node2);

  // If both nodes lie in right subtree then
  // LCA is in right subtree
  } else if (node1.val > tree.val && node2.val > tree.val) {

    return findLCA(tree.right, node1, node2);

  } else {

    return tree.val;

  };

}

/* Knapsack Problem
   What is the max value you can achieve by chosing items with values from
   the set `values` and weights from the set `weights`
   One item can only be chosen once.
 */
function knapsack (maxWeight, values, weights) {

  //memo[i][w] = the maximum value that can be attained with weight <= w
  //using the first i items;
  var memo = [];

  var fn = function (i, w) {

    if (i === 0) {
      memo[i] = [];
      memo[i][w] = 0;
      return 0;
    }

    if (Array.isArray(memo[i]) && memo[i][w]) {
      return memo[i][w];
    };

    if(!Array.isArray(memo[i])){memo[i] = []}
    memo[i][w] = Math.max(fn(i-1,w), fn(i-1,w-weights[i]) + values[i]);
    console.log(i,w, memo[i][w]);
    return memo[i][w];

  };


  return fn(weights.length-1, maxWeight);
}

/* Unlimited Knapsack Problem
   What is the max value you can achieve by chosing items with values from
   the set `values` and weights from the set `weights`
   One item can be chosen many times.
 */
function knapsackUnlimited(maxWeight, values, weights){

  memo = [0]; //memo

  var fn = function (w) {

    if(w<=0){
      return 0;
    }

    if (Array.isArray(memo[w])) {
      return memo[w];
    }

    var possibleValues = [];
    weights.forEach(function (weight, i) {
      possibleValues.push(values[i] + fn(w - weight));
    });
    console.log(w, possibleValues);

    memo[w] = possibleValues.reduce(function(res, i){
      return Math.max(res, i);
    });

    return memo[w];


  };

  return fn(maxWeight);
}

/*
* Mergesort
*/
function mergeSort(arr){

  function merge(arr1, arr2) {
    var i = 0;
    var j = 0;
    var mergedArr = [];

    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] <= arr2[j]){
        mergedArr.push(arr1[i]);
        i++;
      } else {
        mergedArr.push(arr2[j]);
        j++;
      }
    };

    mergedArr = mergedArr.concat(arr1.slice(i));
    mergedArr = mergedArr.concat(arr2.slice(j));
    return mergedArr;
  };

  if (arr.length === 1){
    return arr;
  }

  var subArr1 = mergeSort(arr.slice(0, Math.floor(arr.length/2)));
  var subArr2 = mergeSort(arr.slice(Math.floor(arr.length/2), arr.length));

  return merge(subArr1, subArr2);

};

// Given a carpet with colord spots, find the original color of the carpet
function findOrigColor(carpet){

  function dfs(array, i, j){

    // current cell
    var cell = array[i][j];

    // delete cell from unvisited dict, to mark as visited
    delete unvisited[[i,j].toString()];

    // if next cell exists, is unvisited and is of same color, continue searching there
    if (Array.isArray(array[i+1])
        && (array[i+1][j] === cell)
        && unvisited[[i+1,j].toString()]) {

      dfs(array, i+1, j);
    };

    // if next cell exists, is unvisited and is of same color, continue searching there
    if (array[i][j+1] === cell
        && unvisited[[i,j+1].toString()]) {

      dfs(array, i, j+1);
    };


  };

  var unvisited = {};
  var num = {0: 0, 1:0};

  // mark each cell unvisited
  carpet.forEach(function(row, i){
    row.forEach(function(cell, j){
      unvisited[[i, j].toString()] = true;
    });
  });

  while (Object.keys(unvisited).length > 0) {

    // retrieve the i and j of the next unvisited cell
    var ij = Object.keys(unvisited)
              .shift()
              .toString()
              .split(',')
              .map(function(i){return parseInt(i)});

    var i = ij[0];
    var j = ij[1];

    var cell = carpet[i][j];

    num[cell] += 1;

    dfs(carpet, i, j);

  }

  return num;
};

/*In place reverse a sentence*/

function inPlaceReverse(sentence){

  sentence = sentence.split('');

  function swap(arr, i, j){
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }

  function reverseWord(arr, i, j){
    while (i < j) {
      swap(sentence, i, j);
      i++; j--;
    }
  }

  //reverse chars
  var idxLast = sentence.length - 1;
  var i = 0;
  var j = idxLast;

  reverseWord(sentence, i, j);


  //reverse words
  i = 0;
  j = 0;

  while (i < idxLast) {
    while (sentence[j] !== ' ' && j !== idxLast + 1) {
      j++;
    }
    reverseWord(sentence, i, j - 1);
    j++;
    i=j;
  }

  return sentence.join('');
}
//console.log(inPlaceReverse('this is a sentence'));

/*
  Given a 4X4 array of letters, find if a given word is present in the array
  word can be present vertically, horizontally, diagonally
*/

//this could be coded better
function findInGrid(grid, word){

  function search(pos, dir, idx){
    //console.log('pos', pos);
    var same = grid[pos[0]][pos[1]] === word[idx];
    console.log(same, grid[pos[0]][pos[1]], word[idx]);

    if (idx === word.length - 1) {
      return same;
    } else {
      pos[0] += dir[0];
      pos[1] += dir[1];
      idx ++;

      if (pos[0] < 0 || pos[1] < 0 || pos[0] > len - 1 || pos[1] > len - 1) {
        return false;
      } else {
        return same && search(pos, dir, idx);
      }
    }
  }

  //find all locations of first letter in grid
  var i = 0,
      j = 0,
      startPositions = [],
      len = grid.length;

  for (i=0; i < len; i++) {
    for (j=0; j < len; j++) {
      if (grid[i][j] === word[0]){
          startPositions.push([i,j]);
      }
    }
  }

  console.log(startPositions);
  var found = false;

  //perform BFS on each start letter
  startPositions.forEach(function(startPos){
    [-1,0,1].forEach(function(i){
      [-1,0,1].forEach(function(j){
        if(!(i === 0 && j === 0)){
          //console.log('dir',[i,j]);
          found = found || search(startPos.concat(), [i,j], 0);
        }
      });
    });
  });

  return found;

}

/*
  Given a list of words, return a list of lists of all anagrams grouped
*/
function groupAnagrams(list) {

  function compare(a,b){
    return a.val.localeCompare(b.val);
  }

  function compare2(a,b){
    return a.localeCompare(b);
  }

  var i = 0,
      j = 0,
      k = 0;

  var indexedList = list.map(function(val, idx){
    return {'val': val, 'idx': idx}
  });

  indexedList.forEach(function(item){
    item.val = item.val.split('').sort(compare2).join('');
  });

  indexedList.sort(compare);

  var groups = [];

  while (i < indexedList.length) {
    groups.push([]);
    while (j < indexedList.length && indexedList[i].val === indexedList[j].val) {
      //console.log(i,j);
      groups[k].push(list[indexedList[j].idx]);
      j++;
    }
    k++;
    i = j;
  }

  return groups;
}

//var groups = groupAnagrams(['trees', 'bike', 'cars', 'steer', 'arcs']);
//console.log(groups);


/*
  Given an array where the value in each element represents the number of hops
  you may take to the next destination. Detemine if you can make it to the last
  element starting at the first.
*/

function canHopToEnd(arr){

  function fn(idx){
    console.log(idx);
    if (idx === arr.length - 1) {
      return true;
    } else if (idx >= arr.length) {
      return false;
    } else if (arr[idx] === 0) {
      return false;
    }

    var maxSteps = arr[idx];
    console.log('maxSteps', maxSteps);

    var madeIt = false;

    for (var i=1; i<=maxSteps; i++){
        madeIt = madeIt || fn(idx + i);
    };

    return madeIt;

  }

  return fn(0);
}

//console.log(canHopToEnd([1, 2, 0, 1, 0, 1,])); //false
//console.log(canHopToEnd([1, 2, 3, 1, 0, 1,])); //true

function topologicalSort(graph){

  var visited = {};
  var stack = [];

  function postOrderDFS(node){

    if (visited[node.val]) {
      return;
    }

    for (key in node.edges) {
      var neighbour = node.edges[key];
      postOrderDFS(neighbour);
    };

    visited[node.val] = true;

    stack.push(node);

  }

  for (key in graph) {

    var node = graph[key];

    if(!visited[node.val]){
        postOrderDFS(node);
    }

  }

  return stack.reverse();

}


// var nodes = {
//  0: {val: 0},
//  1: {val: 1},
//  2: {val: 2},
//  3: {val: 3},
//  4: {val: 4},
//  5: {val: 5},
//  6: {val: 6}
// }
//
// nodes[0].edges = {
//   1: nodes[1],
//   2: nodes[2],
//   5: nodes[5]
// };
//
// nodes[1].edges = {
//   4: nodes[4]
// };
//
// nodes[2].edges = {};
//
// nodes[3].edges = {
//   2: nodes[2],
//   4: nodes[4],
//   5: nodes[5],
//   6: nodes[6]
// };
//
// nodes[4].edges = {};
//
// nodes[5].edges = {
//   2: nodes[2]
// };
//
// nodes[6].edges = {
//   0: nodes[0],
//   4: nodes[4]
// };

// var tSort = topologicalSort(nodes);
// console.log(tSort);

function tripletSort(triplets){

  var graph = {};


  //Make a graph out of the triplets
  for (var i = 0; i < triplets.length; i++){
    var triplet = triplets[i];

    if (!graph[triplet[0]]) {
      graph[triplet[0]] = {val: triplet[0], edges: {}}
    }

    for (var j = 0; j < triplet.length - 1; j++){
      var current = triplet[j];
      var next = triplet[j+1];

      if (!graph[next]) {
        graph[next] = {val: next, edges: {}}
      }

      graph[current].edges[next] = graph[next];

    }
  }

  //Topogological sort on the graph
  return topologicalSort(graph);

}


// var triplets = [
//
//   ['a','c','e'],
//   ['b','d','f'],
//   ['a','b','f'],
//   ['c','d','e'],
//   ['e','f']
//
// ];
//
// console.log(tripletSort(triplets));

/*
  Change from base 10 to any base up to 16
*/
function changeBase(dec, base){

  var quotient = dec,
      remainder = 0,
      result = [],
      map = {
        0 : '0',
        1 : '1',
        2 : '2',
        3 : '3',
        4 : '4',
        5 : '5',
        6 : '6',
        7 : '7',
        8 : '8',
        9 : '9',
        10 : 'A',
        11 : 'B',
        12 : 'C',
        13 : 'D',
        14 : 'E',
        15 : 'F'
      }

  while (quotient > 0) {
    remainder = quotient % base;
    result.push(map[remainder]);
    quotient = Math.floor(quotient / base);
  }

  return result.reverse().join('');

}

//console.log(changeBase(3, 2))
