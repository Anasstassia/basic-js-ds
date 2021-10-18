const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
module.exports = class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root || null;
  }

  add(data) {
    if (!this._root) {
      this._root = new Node(data);
    } else {
      addWithin(this._root, data);
    }
    function addWithin(node, data) {
      if (!node) {
        return new Node(data);
      }

      if (node.data === data) {
        return node;
      }

      if (data < node.data) {
        if (!node.left) {
          node.left = addWithin(node.left, data);
          return;
        }
        return addWithin(node.left, data);
      } else {
        if (!node.right) {
          node.right = addWithin(node.right, data);
          return;
        }
        return addWithin(node.right, data);
      }
      // return node;
    }
  }

  has(data) {
    return Boolean(this.searchWithin(this._root, data));
  }

  searchWithin(node, data) {
    if (!node) {
      return false;
    }
    if (data < node.data) {
      return this.searchWithin(node.left, data);
    }
    if (data > node.data) {
      return this.searchWithin(node.right, data);
    }
    if (node.data === data) {
      return node;
    }
  }

  find(data) {
    return this.searchWithin(this._root, data) || null;
  }

  remove(data) {
    // let el = this.find(data);
    // const childs = [el.right, el.left];
    // if (childs.every((child) => !child)) {
    //   this.el = null;
    // }

    // const parent = findParent(this._root, data);

    // function findParent(node, data) {
    //   if (data < node.data) {
    //     return findParent(node.left, data);
    //   }
    //   if (data > node.data) {
    //     return findParent(node.right, data);
    //   }
    //   if (node.left === data || node.right === data) {
    //     return node;
    //   }

    //   return node;
    // }

    // if (parent.left === data) {
    //   parent.left = el.left;
    // } else {
    //   parent.right = el.right;
    // }
    this._root = removeNode(this._root, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        // equal - should remove this item
        if (!node.left && !node.right) {
          // put null instead of item
          return null;
        }

        if (!node.left) {
          // set right child instead of item
          node = node.right;
          return node;
        }

        if (!node.right) {
          // set left child instead of item
          node = node.left;
          return node;
        }

        // both children exists for this item
        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;

        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }
    }
  }

  min() {
    let node = this._root;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    let node = this._root;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
};
