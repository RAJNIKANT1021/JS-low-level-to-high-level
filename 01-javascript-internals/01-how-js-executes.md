# 🔥 HOW JAVASCRIPT EXECUTES (ARCHITECTURE LEVEL)

## Parser · AST · Interpreter · JIT · Hidden Classes · Inline Caches

This is the **deepest possible view** of how V8 (Chrome/Node) actually runs your code.

If you understand this, you know why:
* `const` is faster than `let` (sometimes)
* Objects with same shapes vary in speed
* "Hot" functions run at native speed

---

## 1️⃣ THE EXECUTION PIPELINE (V8 ENGINE)

JavaScript is **NOT** purely interpreted.
JavaScript is **NOT** purely compiled.
It is **JIT (Just-In-Time) Compiled**.

```mermaid
flowchart LR
    SRC[📄 Source Code] --> PARSE[Parsing]
    PARSE --> AST[🌳 AST]
    AST --> IGN[🔥 IGNITION<br/>(Interpreter)]
    IGN --> BYTE[⚙️ Bytecode]
    BYTE --> RUN[🏃 Execution]
    
    RUN -- Hot Code --> TURBO[🚀 TURBOFAN<br/>(Optimizing Compiler)]
    TURBO --> OPT[⚡ Machine Code]
    OPT -- De-optimization --> BYTE
    
    style SRC fill:#fff1f2,stroke:#e11d48
    style AST fill:#fefce8,stroke:#ca8a04
    style IGN fill:#eff6ff,stroke:#2563eb
    style BYTE fill:#e0f2fe,stroke:#0284c7
    style TURBO fill:#f3e8ff,stroke:#9333ea
    style OPT fill:#d1fae5,stroke:#10b981
```
```

---

## 2️⃣ PHASE 1: PARSING ( Scanner & Parser )

Before code runs, V8 must understand it.

### Step A: Tokenization (Scanner)
Breaks code into "tokens".

```js
const a = 10;
// Tokens: [ "const", "a", "=", "10" ]
```

### Step B: Parsing (syntax analysis)
Converts tokens into an **AST (Abstract Syntax Tree)**.

```json
{
  "type": "VariableDeclaration",
  "kind": "const",
  "declarations": [
    {
      "id": { "name": "a" },
      "init": { "value": 10 }
    }
  ]
}
```

> ⚡ **Perf Tip**: V8 uses "Lazy Parsing". It only parses functions **when they are called** to save startup time.

---

## 3️⃣ PHASE 2: IGNITION (INTERPRETER)

V8 does **not** generate machine code immediately (too slow).
Instead, **Ignition** generates **Bytecode**.

### Why Bytecode?
* Smaller than machine code (saves RAM)
* Faster to generate (fast startup)
* Platform independent

Ignition executes this bytecode **immediately**.

---

## 4️⃣ PHASE 3: TURBOFAN (OPTIMIZING COMPILER)

While code runs, V8 **monitors** it ("profiling").

If a function runs often (**"Hot"**):
1. TurboFan kicks in on a background thread.
2. It assumes types won't change.
3. It compiles Bytecode → **Highly Optimized Machine Code**.
4. Next execution uses the machine code (100x faster).

### 💥 DE-OPTIMIZATION (The Crash)
If assumptions fail (e.g., types change), V8 **trashs the optimized code** and goes back to bytecode.

```js
function add(a, b) {
  return a + b;
}

add(1, 2); // Optimized for Integers ⚡
add("hello", "world"); // 🚨 Types changed! DE-OPT! 🐢
```

---

## 5️⃣ HIDDEN CLASSES (SHAPES)

V8 doesn't use Hash Tables for objects (too slow).
It uses **Hidden Classes (Shapes)**.

### How it works
Every time you add a property, V8 creates a **Transition**.

```js
// 1. Shape C0 (Empty)
const obj = {}; 

// 2. Shape C1 (x)
obj.x = 1;

// 3. Shape C2 (x, y)
obj.y = 2;
```

```mermaid
graph LR
    C0[Shape 0<br/>{}] -- add 'x' --> C1[Shape 1<br/>{ x }]
    C1 -- add 'y' --> C2[Shape 2<br/>{ x, y }]
    
    style C0 fill:#f3f4f6,stroke:#94a3b8
    style C1 fill:#dbeafe,stroke:#3b82f6
    style C2 fill:#d1fae5,stroke:#10b981
```
```

### ⚡ Optimization Rule
If two objects share the same Hidden Class, V8 reads them fast.
If you add properties in **different orders**, they get **different shapes** (Slow).

```js
// FAST (Same Shape)
const a = { x: 1 };
const b = { x: 2 };

// SLOW (Different Shapes)
const c = { x: 1, y: 2 };
const d = { y: 2, x: 1 }; // 🚨 Order matters!
```

---

## 6️⃣ INLINE CACHES (IC)

V8 remembers **where** properties are found.

### First Run (Slow)
"Where is `obj.x`? Let me look up the hidden class... okay, offset 0."

### Second Run (Fast)
V8 **caches** the lookup instruction:
*"Just load value at offset 0. Don't check anything."*

This is **Inline Caching**.

if object shape changes → **Cache Miss** (Slow).

---

## 7️⃣ FULL ARCHITECTURE SUMMARY

| Component | Role | Speed |
|-----------|------|-------|
| **Parser** | Source → AST | Initial Load |
| **Ignition** | AST → Bytecode | Fast Start, Slow Run |
| **TurboFan** | Bytecode → Machine Code | Slow Start, Fast Run |
| **Watcher** | Profiling "Hot" code | Background |
| **De-Optimizer**| Bailout to Bytecode | Safety Net |

---

## ✅ YOU NOW UNDERSTAND
* Why JS needs "warm up" time
* Why changing variable types kills performance
* Why object property order matters
* How V8 balances startup speed vs execution speed

This chapter is **complete**.
