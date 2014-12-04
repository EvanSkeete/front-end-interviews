/*
*
* Linked List Implementation
*
*/

function LinkedList (value) {
  this.value = value || null;
  this.next = null;
}

LinkedList.prototype.fSearch = function(testFunc){  
  // If the value is found at this node, return it
  if (testFunc.call(this)) {
    return this;
  // Value is not found and this is the end of the list, return null
  } else if (this.next === null){
    return null;
  // Value not found, so search the rest of the list
  } else {
    return this.next.fSearch(testFunc);
  }
}

LinkedList.prototype.search = function(value){
  return this.fSearch(function(){ return this.value === value});
}

/*
* Predecessor Search - search for the predecessor of the node
* with value: 'value'
*/
LinkedList.prototype.pSearch = function(value){
  return this.fSearch(function(){ 
    return this.next && this.next.value === value;
  });
}

/* Find the last element in a linked list*/
LinkedList.prototype.findLast = function(){
  var startElem = this;

  return this.fSearch(function(){ 
    if (this.next == startElem) {throw new CircularListError()};
    return this.next === null;
  });
}

LinkedList.prototype.insert = function(list){

  if (! list instanceof LinkedList) { 
    throw new TypeError('Can only insert an object of type LinkedList')
  }

  //var next = this.next;
  list.findLast().next = this.next;
  this.next = list;

  return list;
}

/*
* Searches a list for a the first occurance of a value
* and deletes it from the list
*/
LinkedList.prototype.delete = function(value){
  
  var predecessor = this.pSearch(value);
  var deletedNode = predecessor.next;
  var successor = deletedNode.next;

  deletedNode.next = null;
  predecessor.next = successor;

  return this;
}

LinkedList.prototype.isCircular = function(){
  try {

    this.findLast();

  } catch (e) {

    if (e instanceof CircularListError) {
      return true;
    }

    throw e;
  }

  return false;
}

/*
* Reverse a linked list in O(n) time
*
*/
LinkedList.prototype.reverse = function () {

  var oldStartNode = this;
  var wasCircular = this.isCircular();
  var newStartNode = wasCircular ? this.pSearch(this.value) : this.findLast();

  var fn = function() {
    if (this.next !== null && this.next !== oldStartNode) {
      var reversedSublist = fn.apply(this.next);
      reversedSublist.next = this;
      this.next = null;
    }

    return this;
  }

  fn.apply(this);

  if (wasCircular) {
    oldStartNode.next = newStartNode;
  };

  return newStartNode;
}


function CircularListError () {
  this.message = 'Circular list found'
}

CircularListError.prototype = new Error();

var a = new LinkedList('a');
a.insert(new LinkedList('b')).insert(new LinkedList('c'));
a.findLast().insert(a);

var d = new LinkedList('d');
d.insert(new LinkedList('e')).insert(new LinkedList('f'));


