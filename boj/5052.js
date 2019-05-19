const case1 = [
    '911',
    '97625999',
    '91125426',
]; // no

const case2 = [
    '113',
    '12340',
    '123440',
    '12345',
    '98346',
]; // yes

const cases = [case1, case2];

class Node {
    value = '';
    isMatch = false;
    children = [];
    // 잘 집어넣었으면 true, 못 집어넣었으면 false
    // 자식이 있는데 isMatch인 녀석이 있으면 에러
    insert(value) {
        if (!value.startsWith(this.value)) return false;
        if (this.isMatch) throw new Error;
        if (value === this.value) {
            this.isMatch = true;
            return true;
        }
        for (const child of this.children) {
            if (child.insert(value.substr(this.value.length))) return true;
        }
        this.addChild(value);
        return true;
    }
    addChild(value) {
        const child = new Node;
        this.children.push(child);
        child.value = value[0];
        if (child.value !== value) {
            child.addChild(value.substr(1));
        } else {
            child.isMatch = true;
        }
    }
}

test: for (const testCase of cases) {
    const trie = new Node;
    for (const value of testCase) {
        try {
            trie.insert(value);
        } catch {
            console.log('no');
            continue test;
        }
    }
    console.log('yes');
}
