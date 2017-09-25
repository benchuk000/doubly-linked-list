const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    append(data) {
        var node = new Node(data);

        if (this.length) {
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        } else {
            this._head = node;
            this._tail = node;
        }
    
        this.length++;

        return this; 
    }

    head() {
        return this._head && this._head.data;
    }

    tail() {
        return this._tail && this._tail.data;
    }

    at(index) {
        var currentNode = this._head;
        var count = 0;

        while(count<index) {
            currentNode = currentNode.next;
            count++;
        }

        return currentNode.data;
    }

    findAt(index) {
        if (this.isEmpty() || index > this.length - 1) {
            return -1;
        }

        var node = this._head;
        var position = 0;

        while (position < index) {
            node = node.next;
            position++;
        }

        return node;
    }

    insertAt(index, data) {
        var currentNode = this._head;
        var newNode = this.createNewNode(data);
        var prevNode = null;
        var position = 0;

    if (index < 0 || index > this.length - 1) {
        return false;
    }

    if (index === 0) {
        this.append(data);
    }

    while (position < index) {
        prevNode = currentNode;
        currentNode = currentNode.next;
        position ++;
    }

    currentNode.prev.next = newNode;
    newNode.prev = currentNode.prev;
    currentNode.prev = newNode;
    newNode.next = currentNode;

    this.length++;

    return this;
    }

    isEmpty() {
        return this.length === 0;
    }

    clear() {
        while (!this.isEmpty()) {

            if (this.length === 1) {
                this._head = null;
                this._tail = null;

            } else {
                this._tail = this._tail.prev;
                this._tail.next = null;
            }

            this.length --;
        }

        return this;
    }

    remove() {
        if (this.isEmpty()) {
            return null;
        }

        var nodeToRemove = this._head;

        if (this.length === 1) {
            this._head = null;
            this._tail = null;

        } else {
            this._tail = this._tail.prev;
            this._tail.next = null;
        }

        this.length--;

        return this;
    }

    removeFirst() {
        if (this.isEmpty()) {
            return null;
        }

        var nodeToRemove;

        if (this.length === 1) {
            nodeToRemove = this.remove();
        } else {
            nodeToRemove = this._head;
            this._head = this._head.next;
            this._head.prev = null;
            this.length--;
        }

        return this;
    }

    deleteAt(index) {
        var nodeToRemove = this.findAt(index);

        if (index < 0 || index > this.length - 1) {
            return null;
        }

        if (index === 0) {
            return this.removeFirst();
        }
        
        if (index === this.length - 1) {
            return this.remove();
         }
        
        nodeToRemove.prev.next = nodeToRemove.next;
        nodeToRemove.next.prev = nodeToRemove.prev;
        nodeToRemove.next = nodeToRemove.prev = null;
        
        this.length--;
        
        return this;
    }

    reverse() {
        var temp = this._head;
        this._head = this._tail;
        this._tail = temp;
        var currentNode = this._head;
        
        while(currentNode !== null) {
            temp = currentNode.next;
            currentNode.next = currentNode.prev;
            currentNode.prev = temp;
            currentNode = currentNode.next;
        }

        return this;
    }

    createNewNode(data) {
        return new Node(data);
    }

    indexOf(data) {
        var currentNode = this._head;
        var count = 0;

        while(count < this.length) {
            if (currentNode.data === data) {
                return count;
            }

            currentNode = currentNode.next;
            count++;
        }

        return -1;
    }
}

module.exports = LinkedList;
