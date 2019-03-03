const Heap = require('./heap').Heap;

function dijkstra(everyNode, startNode, targetNode) {
    const pq = new Heap(true);
    const heapItem = node => ({ node, valueOf() { return totalDistanceMap.get(node); } });
    const prevNodeMap = new Map([...everyNode].map(node => [node, null]));
    const totalDistanceMap = new Map([...everyNode].map(node => [node, Infinity]));
    totalDistanceMap.set(startNode, 0);
    pq.push(heapItem(startNode));
    while (!pq.isEmpty()) {
        const currentNode = pq.pop().node;
        const currentDistance = totalDistanceMap.get(currentNode);
        for (const edge of currentNode.edges) {
            const neighborNode = edge.target;
            const newTotalDistance = currentDistance + edge.distance;
            const oldTotalDistance = totalDistanceMap.get(neighborNode);
            if (newTotalDistance < oldTotalDistance) {
                totalDistanceMap.set(neighborNode, newTotalDistance);
                prevNodeMap.set(neighborNode, currentNode);
                pq.push(heapItem(neighborNode));
            }
        }
    }
    { // calc path
        const result = [];
        let currentNode = targetNode;
        while (currentNode) {
            result.push(currentNode);
            currentNode = prevNodeMap.get(currentNode);
        }
        return result.reverse();
    }
}

class Node {
    constructor(name) {
        this.name = name;
        this.edges = [];
    }
    connect(target, distance) {
        this.edges.push(new Edge(target, distance));
        target.edges.push(new Edge(this, distance));
        return this;
    }
}

class Edge {
    constructor(target, distance) {
        this.target = target;
        this.distance = distance;
    }
}

const _1 = new Node('1');
const _2 = new Node('2');
const _3 = new Node('3');
const _4 = new Node('4');
const _5 = new Node('5');
const _6 = new Node('6');

_1.connect(_2, 7).connect(_3, 9).connect(_6, 14);
_2.connect(_3, 10).connect(_4, 15);
_3.connect(_4, 11).connect(_6, 2);
_4.connect(_5, 6);
_5.connect(_6, 9);

const everyNode = new Set([_1, _2, _3, _4, _5, _6]);

for (const node of dijkstra(everyNode, _1, _5)) console.log(node.name);
