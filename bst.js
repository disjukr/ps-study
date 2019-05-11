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
            return this.left = new Node(value, this.left);
        } else if (this.value > value) {
            if (this.left) {
                return this.left.insert(value);
            } else {
                return this.left = new Node(value);
            }
        } else {
            if (this.right) {
                return this.right.insert(value);
            } else {
                return this.right = new Node(value);
            }
        }
    }
    cw() {
        const result = this.left;
        if (!result) throw new Error();
        this.left = result.right;
        result.right = this;
        return result;
    }
    ccw() {
        const result = this.right;
        if (!result) throw new Error();
        this.right = result.left;
        result.left = this;
        return result;
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

/**
 * @returns {Node[] | null} 배열을 뱉는데,
 *                   첫번째는 찾은 노드,
 *                   두번째는 그 노드의 부모,
 *                   세번째는 그 노드의 조부모, ...
 *                   그래서 [node, parent, grand parent, ...] 이렇게.
 *                   못찾으면 null 반환함.
 */
function findPath(root, node, path = []) {
    if (!root) return null;
    if (!root.left && !root.right) return null;
    console.log(root.value, path.map(n => n.value));
    root.left && console.log('left:', root.left.value);
    root.right && console.log('right:', root.right.value);
    const result = [root, ...path];
    if (root === node) return result;
    return (
        findPath(root.left, node, result) ||
        findPath(root.right, node, result)
    );
}

// root를 조작해서 node를 맨 위로 올림
function splay(root, node, path = null) {
    path = path || findPath(root, node);
    if (!path) throw new Error();
    const [, parent, grandParent, ...restPath] = path;
    if (!grandParent) { // zig
        if (node === parent.left) return parent.cw();
        if (node === parent.right) return parent.ccw();
        throw new Error();
    }
    const grandParentIsRoot = grandParent === root;
    let result = null;
    if (node === parent.left) {
        if (parent.left === grandParent.left) { // zig zig
            parent.cw();
            result = grandParent.cw();
        } else if (parent.left === grandParent.right) { // zig zag
            parent.cw();
            result = grandParent.ccw();
        } else {
            throw new Error();
        }
    } else if (node === parent.right) {
        if (parent.right === grandParent.right) { // zig zig
            parent.ccw();
            result = grandParent.ccw();
        } else if (parent.right === grandParent.left) { // zig zag
            parent.ccw();
            result = grandParent.cw();
        } else {
            throw new Error();
        }
    } else {
        throw new Error();
    }
    if (grandParentIsRoot) return result;
    return splay(root, result, [result, ...restPath]);
}

// const root = new Node(25);
// const items5 = [49,25,44,36,45];
// const items30 = [49,25,44,36,45,42,32,40,39,39,12,40,20,36,48,9,33,15,9,47,32,21,31,17,21,47,7,17,5,34];

// for (const item of items30) {
//     root.insert(item);
// }

// console.log(root);

// for (const item of bfs(root)) {
//     console.log(item.value);
// }

const root = new Node(25);
root.insert(25);
root.insert(49);
root.insert(44);
root.insert(50);
root.insert(36);
const node = root.insert(45);

// WIP

console.log('before:', root);
console.log(findPath(root, node));
// console.log('after:', splay(root, node));
