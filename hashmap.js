class HashMap {
    constructor(bucketSize = 10) {
        this.bucketSize = bucketSize;
        this.buckets = Array.from({ length: bucketSize }, () => []);
    }
    hash(key) { return key % this.bucketSize; }
    get(key) {
        const bucket = this.buckets[this.hash(key)];
        const item = bucket.find(item => item.key === key) || null;
        return item && item.value;
    }
    set(key, value) {
        const bucket = this.buckets[this.hash(key)];
        const item = bucket.find(item => item.key === key) || null;
        if (item) item.value = value;
        else bucket.push({ key, value });
    }
}

const map = new HashMap(3);
map.set(0, 10);
map.set(1, 20);
map.set(2, 30);
map.set(3, 40);

console.log(map);
console.log(map.get(0));
console.log(map.get(1));
console.log(map.get(2));
console.log(map.get(3));
console.log(map.get(4));
