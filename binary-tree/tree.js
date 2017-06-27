class BinarySearchTree {
    constructor(key=null, value=null, parent=null) {
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
        }
        else if (key < this.key) {
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this);
            }
            else {
                this.left.insert(key, value);
            }
        }
        else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this);
            }
            else {
                this.right.insert(key, value);
            }
        }
    }

     get(key) {
        if (this.key == key) {
            return this.value;
        }
        else if (key < this.key && this.left) {
            return this.left.get(key);
        }
        else if (key > this.key && this.right) {
            return this.right.get(key);
        }
        else {
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
            }
            //_replaceWith method will only run if the node has children
            else if (this.left) {
                this._replaceWith(this.left);
            }
            else if (this.right) {
                this._replaceWith(this.right);
            }
            else {
                this._replaceWith(null);
            }
        }
        //checks if key is smaller than current node and if a left child exists
        else if (key < this.key && this.left) {
            this.left.remove(key);
        }
        //checks if key is larger than current node and if a right child exists
        else if (key > this.key && this.right) {
            this.right.remove(key);
        }
        else {
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
            }
            else if (this == this.parent.right) {
                //otherwise whatever replaces the node will become the parents right child(this.parent.right)
                this.parent.right = node;
            }

            if (node) {
                node.parent = this.parent;
            }
        }
        else {
            if (node) {
                //reassign the pointers to the old element 
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            }
            else {
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

numbers.insert(5, 5); 
numbers.insert(7, 'hi');
numbers.insert(6, 6);
numbers.insert(9, 'hey');
numbers.insert(8,8);
numbers.insert(10,10);
numbers.insert(6, 6);


//console.log(numbers.get(6));

numbers.remove(7);
console.log(numbers);


