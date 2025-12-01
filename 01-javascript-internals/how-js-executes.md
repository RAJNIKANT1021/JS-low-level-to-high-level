# 🚀 How JavaScript Actually Executes Code (Lowest Level)

> **Why this matters:** Everything in React (Hooks, Performance, Async) depends on understanding this flow.

When you write JavaScript, the engine (like V8 in Chrome) breaks it down in a specific order.

## 🛠️ The Execution Pipeline

::: info 🧠 V8 Engine Pipeline

```
[ Source Code ]
      ⬇️
[  Tokenizer  ]  →  [ Tokens ]
      ⬇️
[   Parser    ]  →  [  AST   ]
      ⬇️
[ Interpreter ]  →  [ Bytecode ]
      ⬇️              ⬇️
[ JIT Compiler]  →  [ Machine Code ] ⚡
      ⬆️              ⬇️
      ┗━━(De-opt)━━━━━┛
```
:::

---

## 1️⃣ Tokenizer (The Scanner)
**Goal:** Break sentences into words.

It reads your raw code and chops it into "tokens" (meaningful chunks).

**Example Code:**
```javascript
let a = 10;
```

**Becomes Tokens:**
```json
["let", "a", "=", "10", ";"]
```
*It doesn't understand the code yet; it just separates the pieces.*

---

## 2️⃣ Parser (The Architect)
**Goal:** Understand the grammar and build a tree.

The parser takes those tokens and builds an **Abstract Syntax Tree (AST)**. This is how the computer understands the *structure* of your code.

**The AST looks like this:**
```json
{
  "Type": "VariableDeclaration",
  "Identifier": "a",
  "Value": "10"
}
```

> **Note:** Tools like **Babel** (for React) and **Webpack** work by changing this AST.

---

## 3️⃣ Interpreter (The Runner)
**Goal:** Run the code fast (but not optimized).

In V8, this is called **Ignition**.
- It walks through the AST.
- It converts it to **Bytecode** (simple instructions for the engine).
- It executes it immediately.

---

## 4️⃣ JIT Compiler (The Optimizer)
**Goal:** Make the code super fast.

In V8, this is called **TurboFan**.
- It watches the code running.
- If a function runs many times (it's "hot"), the JIT compiler kicks in.
- It rewrites that part into **Optimized Machine Code** (0s and 1s) for your specific CPU.

**Result:** Your app runs at near-native speed! ⚡
