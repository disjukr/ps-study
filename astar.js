const Heap = require('./heap').Heap;

// WIP
function astar(map, startPos, targetPos) {
    const pq = new Heap(true);
    const heapItem = item => ({
        item,
        valueOf() { return getMapItem(totalDistanceMap, item) + getDistance(currentPos, neighborPos); },
    });
    const prevPosMap = fillMap(cloneMap(map), null);
    const totalDistanceMap = fillMap(cloneMap(map), Infinity);
    setMapItem(totalDistanceMap, startPos, 0);
    pq.push(heapItem(startPos));
    while (!pq.isEmpty()) {
        const currentPos = pq.pop().item;
        const currentDistance = getMapItem(totalDistanceMap, currentPos);
        for (const neighborPos of getNeighbors(map, currentPos)) {
            const newTotalDistance = currentDistance + getDistance(currentPos, neighborPos);
            const oldTotalDistance = getMapItem(totalDistanceMap, neighborPos) + getDistance(currentPos, neighborPos);;
            if (newTotalDistance < oldTotalDistance) {
                setMapItem(totalDistanceMap, neighborPos, newTotalDistance);
                setMapItem(prevPosMap, neighborPos, currentPos);
                pq.push(heapItem(neighborPos));
            }
        }
    }
    // { // calc path
    //     const result = [];
    //     let currentNode = targetNode;
    //     while (currentNode) {
    //         result.push(currentNode);
    //         currentNode = prevPosMap.get(currentNode);
    //     }
    //     return result.reverse();
    // }
}

class Pos {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function isOutsideOfMap(pos, map) {
    if (pos.x < 0) return true;
    if (pos.y < 0) return true;
    const { width, height } = getMapSize(map);
    if (pos.x >= width) return true;
    if (pos.y >= height) return true;
    return false;
}

function isOnWall(pos, map) {
    return !!getMapItem(map, pos);
}

function getNeighbors(map, pos) {
    const { x, y } = pos;
    return [
        new Pos(x - 1, y - 1),
        new Pos(x, y - 1),
        new Pos(x + 1, y - 1),
        new Pos(x - 1, y),
        // new Pos(x, y),
        new Pos(x + 1, y),
        new Pos(x - 1, y + 1),
        new Pos(x, y + 1),
        new Pos(x + 1, y + 1),
    ].filter(pos => !isOutsideOfMap(pos, map)).filter(pos => !isOnWall(pos, map));
}

function getDistance(aPos, bPos) {
    const [ax, ay] = [aPos.x, aPos.y];
    const [bx, by] = [bPos.x, bPos.y];
    if (ax === bx && ay === by) return 0;
    const dx = Math.abs(bx - ax);
    const dy = Math.abs(by - ay);
    if (dx === 1 && dy === 1) return 14;
    return dx * 10 + dy * 10;
}

const map = initMap(10, 10, 0);
drawHorizontalLineOnMap(map, 2, 5, 5, 1);
printMap(map);

function initMap(width, height, fill) {
    const map = [];
    for (let y = 0; y < height; ++y) {
        const line = [];
        for (let x = 0; x < width; ++x) {
            line.push(fill);
        }
        map.push(line);
    }
    return map;
}

function getMapSize(map) {
    return { width: +map[0].length, height: +map.length };
}

function getMapItem(map, pos) {
    return map[pos.y][pos.x];
}

function setMapItem(map, pos, value) {
    map[pos.y][pos.x] = value;
}

function cloneMap(map) {
    const result = [];
    for (let i = 0; i < map.length; ++i) {
        result.push(map[i].slice());
    }
    return result;
}

function fillMap(map, fill) {
    for (let i = 0; i < map.length; ++i) {
        const line = map[i];
        for (let j = 0; j < line.length; ++j) {
            line[j] = fill;
        }
    }
    return map;
}

function drawHorizontalLineOnMap(map, x, y, width, fill) {
    for (let i = 0; i < width; ++i) {
        map[y][x + i] = fill;
    }
}

function printMap(map) {
    const text = map.map(line => line.map(cell => !!cell ? '■' : '□').join(' ')).join('\n');
    console.log(text);
}

// for (const node of astar(everyNode, _1, _5)) console.log(node.name);
