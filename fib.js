const memo = {};
function fib(n) {
    if (n < 3n) return 1n;
    if (n in memo) return memo[n];
    return memo[n] = fib(n - 2n) + fib(n - 1n);
}

const memo2 = {};
function fib2(n) {
    if (n < 3n) return 1n;
    if (n in memo2) return memo2[n];
    if (n % 2n) {
        const k = (n - 1n) / 2n;
        return memo2[n] = (fib2(k + 1n) ** 2n) + (fib2(k) ** 2n);
    } else {
        const k = n / 2n;
        return memo2[n] = fib2(k) * (2n * fib2(k + 1n) - fib2(k));
    }
}

const memo3 = {};
function modfib(n) {
    const mod = 1000000n;
    if (n < 3n) return 1n;
    if (n in memo3) return memo3[n];
    if (n % 2n) {
        const k = (n - 1n) / 2n;
        return memo3[n] = (((modfib(k + 1n) ** 2n) % mod) + ((modfib(k) ** 2n) % mod)) % mod;
    } else {
        const k = n / 2n;
        return memo3[n] = (modfib(k) * (2n * modfib(k + 1n) - modfib(k))) % mod;
    }
}

for (let i = 1n; i < 20n; i += 1n) console.log(fib2(i));

console.log(fib2(10000n));

console.log(modfib(1000000000000000000n));
