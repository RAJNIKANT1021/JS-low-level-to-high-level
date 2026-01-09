# 🔥 CLOSURES & SCOPE INTERNALS

## Lexical Environment · Retaining References · The "Backpack"

Closures are usually explained as "a function inside a function".
**That is wrong.**

A Closure is a **heap-allocated preservation of a Lexical Environment.**

---

## 1️⃣ WHAT IS A CLOSURE (REALLY)?

When a function is created, it gets a hidden property `[[Environment]]` referencing the **Lexical Scope** where it was born.

If the function **returns** or is **passed out**, it carries this environment with it.

> **Analogy:** A function is like a person. A closure is the **backpack** they carry containing variables from their home.

---

## 2️⃣ MEMORY MODEL OF CLOSURE

```js
function outer() {
  let count = 0; // Local variable
  
  function inner() {
    count++;
    console.log(count);
  }
  
  return inner;
}

const fn = outer(); // outer returns, Stack Frame pops!
fn(); // 1
```

### The Architecture Question:
If `outer()` finished execution, its stack frame is gone.
**Where does `count` live??**

### The Answer: The Heap (Closure Scope)
V8 detects `inner` references `count`.
It **removes `count` from the Stack** and **moves it to the Heap**.

```mermaid
graph TD
    FN[fn (on Stack)] --> OBJ[Function Object (Heap)]
    OBJ --> SCOPE[Closure Scope (Heap)]
    SCOPE --> COUNT[count: 1]
    
    style FN fill:#f0f9ff,stroke:#3b82f6
    style OBJ fill:#f3e8ff,stroke:#8b5cf6
    style SCOPE fill:#d1fae5,stroke:#10b981
    style COUNT fill:#d1fae5,stroke:#10b981
```


---

## 3️⃣ SCOPE CHAIN INTERNALS

Scope chain is a **Linked List** of Environments.

```
Inner Scope -> Outer Scope -> Global Scope
```

When you access a variable:
1. Check own Lexical Environment.
2. If not found, follow pointer to Outer Environment.
3. Repeat until Global.

---

## 4️⃣ RETAINING PATHS & LEAKS

Because closures link to their **entire** parent scope (historically), they can hold heavy objects.

```js
function createLeak() {
  const hugeData = new Array(1000000); // 10MB
  const smallData = "Hello";
  
  return function() {
    console.log(smallData);
  };
}
```

Modern V8 Logic:
* V8 is smart (**Tree Shaking for Scopes**).
* It sees `hugeData` is **unused** by the inner function.
* It **optimizes it out** of the Closure Scope.
* `hugeData` gets GC'd.

**However**, if *any* function in that scope uses it, it stays!

```js
function leak() {
  const huge = new Array(1e6);
  
  function unused() { console.log(huge); } // keeps huge alive!
  
  return function used() { console.log("hi"); };
}
```

The returned function shares the **SAME** closure scope as `unused`.
`unused` references `huge`.
So `huge` stays in memory, even if `unused` is never called! ⚠️

---

## 5️⃣ REAL WORLD CLOSURE PATTERNS

### 1. Data Privacy (Module Pattern)
```js
function createWallet() {
  let balance = 0; // Private
  return {
    add: (v) => balance += v,
    get: () => balance
  };
}
```

### 2. Functional Programming (Currying)
```js
const add = (a) => (b) => a + b;
const add5 = add(5); // Remembers 5
add5(10); // 15
```

### 3. Event Listeners (React useEffect)
```js
useEffect(() => {
  const id = setInterval(...);
  return () => clearInterval(id); // Closure remembers 'id'
}, []);
```

---

## ✅ YOU NOW UNDERSTAND
* Why closures behave like "memory"
* That closure variables live in the **Heap**
* How V8 tries to optimize unused variables
* Why closures can cause invisible memory leaks

This chapter is **complete**.
