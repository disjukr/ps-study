class Heap {
    constructor(isMinHeap = true) {
        this.isMinHeap = isMinHeap;
        this.values = [
            isMinHeap ? -Infinity : Infinity, // unused
        ]; // 1 based index array
    }
    isEmpty() { return this.values.length < 2; }
    swap(a, b) {
        const temp = this.values[a];
        this.values[a] = this.values[b];
        this.values[b] = temp;
    }
    needSwap(childIndex, parentIndex) {
        const child = this.values[childIndex];
        const parent = this.values[parentIndex];
        if (this.isMinHeap) {
            return child < parent;
        } else {
            return child > parent;
        }
    }
    childIndex(parentIndex) {
        const leftIndex = parentIndex * 2;
        const rightIndex = leftIndex + 1;
        const left = this.values[leftIndex];
        const right = this.values[rightIndex];
        if (left == null && right == null) return null;
        if (left == null) return rightIndex;
        if (right == null) return leftIndex;
        if (this.isMinHeap) {
            return left < right ? leftIndex : rightIndex;
        } else {
            return left > right ? leftIndex : rightIndex;
        }
    }
    push(value) {
        let current = this.values.push(value) - 1;
        let parent = current >> 1;
        while (this.needSwap(current, parent)) {
            this.swap(current, parent);
            current = parent;
            parent = current >> 1;
        }
    }
    pop() {
        if (this.isEmpty()) return null;
        const result = this.values[1];
        const tail = this.values.pop();
        if (this.values.length === 1) return result;
        this.values[1] = tail;
        let current = 1;
        let child = this.childIndex(1);
        while (child && this.needSwap(child, current)) {
            this.swap(child, current);
            current = child;
            child = this.childIndex(child);
        }
        return result;
    }
}

exports.Heap = Heap;
