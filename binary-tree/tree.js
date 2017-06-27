class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (this.key == null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  add(key, value) {
    if (this.key == null) {
        this.key = key;
        this.value = value;
      } else if (key % 2 === 0) {
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        this.left.add(key, value);
      }
    } else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.add(key, value);
      }
    }
  }

  get(key) {
    if (this.key == key) {
      return this.value;
    } else if (key < this.key && this.left) {
      return this.left.get(key);
    } else if (key > this.key && this.right) {
      return this.right.get(key);
    } else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        //this.right(root) finds the most left child
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if (this.left) {
        //_replaceWith method will only run if the node has children
        this._replaceWith(this.left);
      } else if (this.right) {
        this._replaceWith(this.right);
      } else {
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      //checks if key is smaller than current node and if a left child exists
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      //checks if key is larger than current node and if a right child exists
      this.right.remove(key);
    } else {
      throw new Error('Key Error');
    }
  }
  _replaceWith(node) {
    //6
    if (this.parent) {
      //parent of 6 is 7
      if (this == this.parent.left) {
        //checking if 6's parent 7 has a left child 6
        this.parent.left = node;
        //whatever gets removed will become the parents left child(this.parent.left)
      } else if (this == this.parent.right) {
        //otherwise whatever replaces the node will become the parents right child(this.parent.right)
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        //reassign the pointers to the old element
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        //if the deleted value has no children, all pointers are also deleted
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    //checks the node for this.left until it reaches the smallest number without a left value
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}

let numbers = new BinarySearchTree();

numbers.insert(9, 9);
numbers.insert(15, 'hi');
numbers.insert(6, 6);
numbers.insert(4, 'hey');
numbers.insert(5, 5);
numbers.insert(3, 'Three');
numbers.insert(14, 14);
numbers.insert(13, 13);

//console.log(numbers.get(6));

// numbers.remove(7);
// console.log(numbers);
// console.log(numbers.get(3));

function bst_height(tree) {
  if (tree.left && tree.right) {
    return Math.max(bst_height(tree.left), bst_height(tree.right)) + 1;
  }
  if (tree.left) {
    return bst_height(tree.left) + 1;
  }
  if (tree.right) {
    return bst_height(tree.right) + 1;
  }
  return 1;
}

//Write an algorithm to find the height of a binary search tree
function counter(node) {
  // console.log(node);
  let count = 1;
  if (node.left || node.right) {
    //checks the childs left node
    console.log('Checks for left and right');
    if (node.left.left && node.left.right) {
      //Check the childs left side
      console.log('checks for childs-left', node.key);
      if (node.left.left) {
        //if no left-side use the right node
        console.log('this child has a left', node.left);
        return counter(node.left) + 1;
      } else {
        //left side exists --we use left side
        return counter(node.right) + 1;
      }
    } else {
      //checks the childs right node
      console.log('this is the last thing run');
      return counter(node.left) + 1;
    }
  } else {
    return 1;
  }
}

//console.log(counter(numbers));


function checkTree(node){
  //if node didnt satisfy bts rule
  if (node.left.key > node.key || node.right.key < node.key){
    console.log(node.left.key, 'is larger than', node.key);
    return false;
  }

  else if (node.left.key < node.key && node.right.key > node.key){
    //check each node and call function again
    if(node.left.key){
       return checkTree(node.left.key);
     }
    else{
       return checkTree(node.right.key);
     }
  }  
  
  else {
    //nodes pointers are null 
    return true; 
  }
}

let btTree = new BinarySearchTree();

btTree.add( 7, 7);
btTree.add( 6, 6);
btTree.add( 2, 2);
btTree.add( 1, 1);
btTree.add( 3, 3);
btTree.add( 8, 8);


console.log(checkTree(btTree));
// console.log(numbers);
//console.log(checkTree(numbers));
console.log(btTree);