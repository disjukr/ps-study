class Node {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
    query(value) {
        if (this.value === value) return this;
        if (this.value > value) {
            return this.left && this.left.query(value);
        } else {
            return this.right && this.right.query(value);
        }
    }
    insert(value) {
        if (this.value === value) {
            this.left = new Node(value, this.left);
        } else if (this.value > value) {
            if (this.left) {
                this.left.insert(value);
            } else {
                this.left = new Node(value);
            }
        } else {
            if (this.right) {
                this.right.insert(value);
            } else {
                this.right = new Node(value);
            }
        }
    }
}

function* inorder(root) {
    const {left, right} = root;
    if (left) yield* inorder(left);
    yield root;
    if (right) yield* inorder(right);
}

function* preorder(root) {
    const {left, right} = root;
    yield root;
    if (left) yield* preorder(left);
    if (right) yield* preorder(right);
}

function* postorder(root) {
    const {left, right} = root;
    if (left) yield* postorder(left);
    if (right) yield* postorder(right);
    yield root;
}

function* dfs(root) {
    const stack = [root];
    while (stack.length) {
        const curr = stack.pop();
        yield curr;
        if (curr.right) stack.push(curr.right);
        if (curr.left) stack.push(curr.left);
    }
}

function* bfs(root) {
    const queue = [root];
    while (queue.length) {
        const curr = queue.shift();
        yield curr;
        if (curr.left) queue.push(curr.left);
        if (curr.right) queue.push(curr.right);
    }
}

const root = new Node(25);
const items5 = [49,25,44,36,45];
const items30 = [49,25,44,36,45,42,32,40,39,39,12,40,20,36,48,9,33,15,9,47,32,21,31,17,21,47,7,17,5,34];

for (const item of items30) {
    root.insert(item);
}

console.log(root);

for (const item of bfs(root)) {
    console.log(item.value);
}
