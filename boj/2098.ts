type World = typeof world;
const world = [
    [ 0, 10, 15, 20],
    [ 5,  0,  9, 10],
    [ 6, 13,  0, 12],
    [ 8,  8,  9,  0],
];
type Path = number[];
type Cost = number;

console.log(bruteforceTsp(world));

function bruteforceTsp(world: World): [Path, Cost] {
    const items = [...Array(world.length).keys()];
    const paths = [...combinations(items)].map(path => [...path, path[0]]);
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
function calcCost(world: World, path: Path): Cost {
    return [...eachCons(path)].reduce((sum, [from, to]) => {
        return sum + world[from][to];
    }, 0);
}
