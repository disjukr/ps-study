/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
function gcd(a, b) {
    const [min, max] = a > b ? [b, a] : [a, b];
    const mod = max % min;
    if (mod === 0) return min;
    return gcd(min, mod);
}

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
function lcm(a, b) {
    const mulOfA = mul(a);
    const mulOfB = mul(b);
    let currA = mulOfA.next().value;
    let currB = mulOfB.next().value;
    while (true) {
        if (currA === currB) return currA;
        if (currA > currB) {
            currB = mulOfB.next().value;
        } else {
            currA = mulOfA.next().value;
        }
    }
}

function* mul(a) {
    let i = 0;
    while (true) yield a * ++i;
}

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
function lcm2(a, b) {
    return a * b / gcd(a, b);
}
