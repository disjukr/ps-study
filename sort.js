function merge(arr) {
    if (arr.length < 2) return [...arr];
    const half = arr.length >> 1;
    const left = merge(arr.slice(0, half));
    const right = merge(arr.slice(half));
    const result = [];
    while (left.length || right.length) {
        if (!left.length) return result.concat(right);
        if (!right.length) return result.concat(left);
        result.push(
            (left[0] < right[0]) ?
            left.shift() :
            right.shift()
        );
    }
}

function quick(arr) {
    const swap = (a, b) => {
        const tmp = arr[a];
        arr[a] = arr[b];
        arr[b] = tmp;
    };
    const sort = (start, end) => {
        if (start >= end) return;
        const pivot = arr[end - 1];
        let low = start;
        for (let i = start; i < end; ++i) {
            if (arr[i] < pivot) swap(low++, i);
        }
        if (arr[low] > pivot) swap(low, end - 1);
        sort(start, low);
        sort(low + 1, end);
    };
    sort(0, arr.length);
    return arr;
}

const items5 = [49,25,44,36,45];
const items15 = [49,25,44,36,45,42,32,40,39,39,12,40,20,36,48];
const items30 = [49,25,44,36,45,42,32,40,39,39,12,40,20,36,48,9,33,15,9,47,32,21,31,17,21,47,7,17,5,34];
const arr = items15;
console.log(merge(arr));
console.log(quick(arr));
