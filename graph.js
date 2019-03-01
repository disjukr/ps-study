const fs = require('fs');


const nodes = fixture();

const graph = [[]];
for (const [a, b] of nodes) {
    graph[a] = graph[a] || [];
    graph[b] = graph[b] || [];
    graph[a].push(b);
    graph[b].push(a);
}
for (const node of graph) node.sort((a, b) => a - b);

function* bfs(graph, start) {
    const queue = [start];
    const visited = [...graph].fill(false);
    while (queue.length) {
        const curr = queue.shift();
        if (visited[curr]) continue;
        visited[curr] = true;
        yield curr;
        const conns = graph[curr];
        for (const conn of conns) {
            if (visited[conn]) continue;
            queue.push(conn);
        }
    }
}

function* dfs(graph, start) {
    const stack = [start];
    const visited = [...graph].fill(false);
    while (stack.length) {
        const curr = stack.pop();
        if (visited[curr]) continue;
        visited[curr] = true;
        yield curr;
        const conns = graph[curr].slice().reverse();
        for (const conn of conns) {
            if (visited[conn]) continue;
            stack.push(conn);
        }
    }
}

for (const node of bfs(graph, 1)) {
    console.log(node);
}

function fixture() {
    const text = fs.readFileSync('./graph-fixture.txt', 'utf8');
    const lines = text.split('\n');
    lines.shift();
    return lines
        .filter(x => x)
        .map(x => x.split(' ').map(x => +x));
}
