#!/usr/bin/env run-cargo-script
// cargo-deps: rand="0.6"
extern crate rand;
use rand::SeedableRng;

fn main() {
    let mut vec: Vec<u8> = (0..=255).collect();
    let slice: &mut [u8] = &mut vec;
    rand::seq::SliceRandom::shuffle(
        slice,
        &mut rand::rngs::StdRng::seed_from_u64(0),
    );
    let table = slice;
    let message = "Hello, World!";
    println!("table: {:?}", table);
    println!("message: {}", message);
    println!("hash: {}", pearson(message, table));
}

fn pearson(message: &str, table: &[u8]) -> u8 {
    let bytes = message.as_bytes();
    let len = bytes.len();
    let mut hash = (len % 256) as u8;
    for char in bytes {
        hash = table[(hash ^ char) as usize];
    }
    return hash;
}
