/* Node constructor */
var Node = function(root) {
    this.root = root;
    this.left = null;
    this.right = null;
    return this;
}

/* Copy Node */
Node.prototype.copyNode = function() {
    var copy = new Node(this.root);
    if (this.left != null) {
        copy.left = this.left.copyNode();
    }
    if (this.right != null) {
        copy.right = this.right.copyNode();
    }
    return copy;
}

/* Insert Nodes into existing expression tree*/
Node.prototype.insert = function(newNode) {

    if (!isNaN(newNode.root)) {
        if (this.right === null) {
            this.right = newNode;
        } else {
            this.right.insert(newNode);
        }
    } else if (newNode.root == "+" || newNode.root == "-") {
        var copy = this.copyNode();
        this.root = newNode.root;
        this.left = copy;
        this.right = null;
    } else if (newNode.root == "*" || newNode.root == "/") {
        if (!isNaN(this.root) || this.root == "*" || this.root == "/" || this.root == "^") {
            var copy = this.copyNode();
            this.root = newNode.root;
            this.left = copy;
            this.right = null;
        } else if (this.root == "+" || this.root == "-") {
            this.right.insert(newNode);
        }
    } else if (newNode.root == "^") {
        if (!isNaN(this.root) || this.root == "^") {
            var copy = this.copyNode();
            this.root = newNode.root;
            this.left = copy;
            this.right = null;
        } else {
            this.right.insert(newNode);
        }
    }
}

/* recusively evaluate expression tree */
Node.prototype.evaluate = function() {
    var result;

    if (this.root == "+") {
        result = this.left.evaluate() + this.right.evaluate();
    } else if (this.root == "-") {
        result = this.left.evaluate() - this.right.evaluate();
    } else if (this.root == "*") {
        result = this.left.evaluate() * this.right.evaluate();
    } else if (this.root == "/") {
        result = this.left.evaluate() / this.right.evaluate();
    } else if (this.root == "^") {
        result = Math.pow(this.left.evaluate(), this.right.evaluate());
    } else {
        result = this.root;
    }
    return result;
}

/* create node from value and insert into tree */
Node.prototype.insertNode = function(insert) {
    var newNode = new Node(insert);
    this.insert(newNode);
}

/* Takes an expression in string form and returns value */
function buildExpressionTree(expr) {

    var expArray = expr.split("");
    var num = "";
    var i = 0;
    var negFNum = false;

    // check for initial negative values
    if (expArray[0] == "-") {
        negFNum = true;
        i = 1;
    }

    // get first number in expression
    while (!isNaN(expArray[i]) || expArray[i] == ".") {
        num = num.concat(expArray[i]);
        i++;
    }
    if (negFNum) {
        var bst = new Node(parseFloat(num) * -1);
    } else {
        var bst = new Node(parseFloat(num));
    }
    num = "";

    // insert remaining elements in expression
    for (i = i; i < expArray.length; i++) {
        if (expArray[i] == ".") {
            num = num.concat(expArray[i]);
        } else if (expArray[i] == "+" || expArray[i] == "-" || expArray[i] == "*" || expArray[i] == "/" || expArray[i] == "^") {
            bst.insertNode(parseFloat(num));
            num = "";
            bst.insertNode(expArray[i]);
        } else {
            num = num.concat(expArray[i]);
        }
    }
    bst.insertNode(parseFloat(num)); // add last element

    return bst.evaluate();
}
