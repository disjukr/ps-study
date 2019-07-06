type World = typeof world;
const world = [
    [ 0, 10, 15, 20],
    [ 5,  0,  9, 10],
    [ 6, 13,  0, 12],
    [ 8,  8,  9,  0],
];
type Path = number[];
type Cost = number;

console.log('bruteforce:', bruteforceTsp(world));
console.log('solution:', solution(world));

function bruteforceTsp(world: World): [Path, Cost] {
    const items = [...Array(world.length).keys()];
    const paths = [...combinations(items)].map(path => [...path, path[0]]);
    const costMap: [Path, Cost][] = paths.map(path => [path, calcCost(world, path)]);
    costMap.sort((a, b) => a[1] - b[1]);
    return costMap[0];
}
function solution(world: World): [Path, Cost] {
    const items = [...Array(world.length).keys()];
    function semiSolution(visited: Path, visitedCost: Cost): [Path, Cost] {
        const restItems = items.filter(item => !visited.includes(item));
        if (!restItems.length) return [visited, visitedCost];
        const solutions = restItems.map(item => {
            return semiSolution(
                [...visited, item],
                visitedCost + getCost(world, getLast(visited), item),
            );
        });
        solutions.sort((a, b) => a[1] - b[1]);
        return solutions[0];
    }
    const paths = items.map(item => semiSolution([item], 0)).map(([path]) => [...path, path[0]]);
    const costMap: [Path, Cost][] = paths.map(path => [path, calcCost(world, path)]);
    costMap.sort((a, b) => a[1] - b[1]);
    return costMap[0];
}
function* combinations(items: number[]): IterableIterator<number[]> {
    if (!items.length) return;
    if (items.length === 1) {
        yield items;
        return;
    }
    for (let i = 0; i < items.length; ++i) {
        const rest = [...items];
        const curr = rest.splice(i, 1);
        for (const combination of combinations(rest)) {
            yield [...curr, ...combination];
        }
    }
}
function* eachCons(items: number[]): IterableIterator<[number, number]> {
    for (let i = 0; i < items.length - 1; ++i) yield [items[i], items[i + 1]];
}
function getLast<T>(array: T[]): T {
    return array[array.length - 1];
}
function getCost(world: World, from: number, to: number): Cost {
    return world[from][to];
}
function calcCost(world: World, path: Path): Cost {
    return [...eachCons(path)].reduce((sum, [from, to]) => {
        return sum + getCost(world, from, to);
    }, 0);
}
