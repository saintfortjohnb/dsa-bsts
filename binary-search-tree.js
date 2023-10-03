class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */
  insert(val) {
    const newNode = new Node(val);

    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (val === current.val) return undefined;
      if (val < current.val) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */
  insertRecursively(val, node = this.root) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    if (val < node.val) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.insertRecursively(val, node.left);
      }
    } else if (val > node.val) {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insertRecursively(val, node.right);
      }
    }

    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */
  find(val) {
    if (!this.root) return undefined;

    let current = this.root;
    while (current) {
      if (val === current.val) return current;
      current = val < current.val ? current.left : current.right;
    }

    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, node = this.root) {
    if (!node) return undefined;

    if (val === node.val) {
      return node;
    } else if (val < node.val) {
      return this.findRecursively(val, node.left);
    } else {
      return this.findRecursively(val, node.right);
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let data = [];

    function traverse(node) {
      data.push(node.val);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }

    traverse(this.root);
    return data;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */
  dfsInOrder() {
    let data = [];

    function traverse(node) {
      if (node.left) traverse(node.left);
      data.push(node.val);
      if (node.right) traverse(node.right);
    }

    traverse(this.root);
    return data;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */
  dfsPostOrder() {
    let data = [];

    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      data.push(node.val);
    }

    traverse(this.root);
    return data;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */
  bfs() {
    let data = [];
    let queue = [];
    let node = this.root;

    queue.push(node);

    while (queue.length) {
      node = queue.shift();
      data.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return data;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    if (!this.root) return undefined;

    function findMin(node) {
      while (node && node.left) {
        node = node.left;
      }
      return node;
    }

    function _remove(node, key) {
      if (!node) return node;

      if (key < node.val) {
        node.left = _remove(node.left, key);
      } else if (key > node.val) {
        node.right = _remove(node.right, key);
      } else {
        // node with only one child or no child
        if (!node.left) {
          return node.right;
        } else if (!node.right) {
          return node.left;
        }

        // node with two children
        node.val = findMin(node.right).val;
        node.right = _remove(node.right, node.val);
      }
      return node;
    }

    this.root = _remove(this.root, val);
  }

  /** isBalanced(): Returns true if the BST is balanced, false otherwise. */
  isBalanced() {
    function _checkBalance(node) {
      if (!node) return { balanced: true, depth: 0 };

      let left = _checkBalance(node.left);
      let right = _checkBalance(node.right);

      let balanced = left.balanced && right.balanced && Math.abs(left.depth - right.depth) <= 1;

      return {
        balanced: balanced,
        depth: Math.max(left.depth, right.depth) + 1
      };
    }

    return _checkBalance(this.root).balanced;
  }

  /** findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */
  findSecondHighest() {
    if (!this.root) return undefined;

    let current = this.root;
    let prev = null;

    while (current.right) {
      prev = current;
      current = current.right;
    }

    if (current.left) {
      current = current.left;
      while (current.right) {
        current = current.right;
      }
      return current.val;
    } else {
      return prev ? prev.val : undefined;
    }
  }
}

module.exports = BinarySearchTree;
