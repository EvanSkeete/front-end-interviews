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
  var queue = [tree];

  while (queue.length > 0) {
    currentNode = queue.shift();
    children = currentNode.children;

    children && children.reverse().forEach(function (child) {
      queue.unshift(child);
    });

    console.log(currentNode.value);
  };

};

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
