function BinaryTree (value, parent) {

  this.value = value || null;
  this.parent = parent || null;
  this.left = null;
  this.right = null;

};

BinaryTree.prototype.search = function (value) {


  if ( this.value === value ) return this;

  if (value  < this.value) {

    return this.left === null ? null : this.left.search(value);

  } else {

    return this.right === null ? null : this.right.search(value);

  }

};

BinaryTree.prototype.insert = function (tree) {

  if (tree.value < this.value) {

    if (this.left == null) {
      this.left = tree;
      tree.parent = this;
    } else {
      this.left.insert(tree);
    }

  } else {

    if (this.right == null) {
      this.right = tree;
      tree.parent = this;
    } else {
      this.right.insert(tree);
    }

  }

  return this;

}

// Find the min elem of a BinaryTree
BinaryTree.prototype.findMin = function () {

  var min = this;

  while (min.left !== null) {
    min = min.left;
  };

  return min;

}

// Find the max elem of a BinaryTree
BinaryTree.prototype.findMax = function () {

  var max = this;

  while (max.right !== null) {
    max = max.right;
  };

  return max;

}

// In order traversal of a tree, calling a function on each node
BinaryTree.prototype.traverse = function (func) {

  (this.left !== null) && this.left.traverse(func);
  func(this);
  (this.right !== null) && this.right.traverse(func);

}

BinaryTree.prototype.delete = function (value) {

  var deletedNode = this.search(value);
  var parent = deletedNode.parent;
  var parentTargetChild = (parent && parent.left == deletedNode) ? 'left' : 'right';
  var successor = null;

  // If the node has no children
  if (deletedNode.left === null && deletedNode.right === null){

    if (parent) {
      parent[parentTargetChild] = null;
    }

  // If the node has two children
  } else if (deletedNode.left !== null && deletedNode.right !== null) {

    successor = deletedNode.right.findMin();
    if (parent) {
      parent[parentTargetChild] = successor;
    }

    successor.left = deletedNode.left;
    successor.right = deletedNode.right;

    var successorParent = successor.parent;
    var sParentTargetChild = (successorParent.left == successor) ? 'left' : 'right';
    successorParent[sParentTargetChild] = null;

    successor.parent = parent;


  // If the node has one child
  } else {

    successor = (deletedNode.left !== null) ? deletedNode.left : deletedNode.right;
    if (parent) {
      parent[parentTargetChild] = successor;
    }
    successor.parent = parent;
  }

  return successor;

}


a = new BinaryTree(1000);
a.insert(new BinaryTree(500));
a.insert(new BinaryTree(1500));

a.insert(new BinaryTree(250));
a.insert(new BinaryTree(750));

a.insert(new BinaryTree(1250));
a.insert(new BinaryTree(1750));

a.traverse(function (node) {console.log(node.value)});