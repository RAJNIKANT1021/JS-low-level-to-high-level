# 🚀 How JavaScript Actually Executes Code (Lowest Level)

> **Why this matters:** Everything in React (Hooks, Performance, Async) depends on understanding this flow.

When you write JavaScript, the engine (like V8 in Chrome) breaks it down in a specific order.

## 🛠️ The Execution Pipeline

::: info 🧠 V8 Engine Pipeline

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="background: transparent; max-width: 100%;">
  <!-- Definitions for markers -->
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#888" />
    </marker>
  </defs>

  <!-- Styles -->
  <style>
    .box { fill: #f9f9f9; stroke: #333; stroke-width: 2px; rx: 8; }
    .box-active { fill: #e3f2fd; stroke: #1565c0; stroke-width: 2px; rx: 8; }
    .box-final { fill: #e8f5e9; stroke: #2e7d32; stroke-width: 2px; rx: 8; }
    .text { font-family: sans-serif; font-size: 14px; fill: #333; text-anchor: middle; dominant-baseline: middle; }
    .label { font-family: sans-serif; font-size: 12px; fill: #666; text-anchor: middle; background: white; }
    .path { stroke: #888; stroke-width: 2px; fill: none; marker-end: url(#arrow); }
    .path-dashed { stroke: #d32f2f; stroke-width: 2px; fill: none; stroke-dasharray: 5,5; marker-end: url(#arrow); }
  </style>

  <!-- Nodes -->
  <!-- Row 1 -->
  <rect x="50" y="50" width="120" height="60" class="box" />
  <text x="110" y="80" class="text">📄 Source Code</text>

  <rect x="250" y="50" width="120" height="60" class="box" />
  <text x="310" y="80" class="text">🧱 Tokens</text>

  <rect x="450" y="50" width="120" height="60" class="box" />
  <text x="510" y="80" class="text">🌳 AST</text>

  <!-- Row 2 -->
  <rect x="450" y="180" width="120" height="60" class="box-active" />
  <text x="510" y="210" class="text">⚙️ Bytecode</text>

  <!-- Row 3 -->
  <rect x="250" y="300" width="120" height="60" class="box-final" />
  <text x="310" y="330" class="text">⚡ Machine Code</text>

  <rect x="450" y="300" width="120" height="60" class="box-active" />
  <text x="510" y="330" class="text">🚀 TurboFan JIT</text>

  <!-- Edges -->
  <!-- Source -> Tokens -->
  <path d="M170 80 L250 80" class="path" />
  <text x="210" y="70" class="label">Tokenizer</text>

  <!-- Tokens -> AST -->
  <path d="M370 80 L450 80" class="path" />
  <text x="410" y="70" class="label">Parser</text>

  <!-- AST -> Bytecode -->
  <path d="M510 110 L510 180" class="path" />
  <text x="545" y="145" class="label">Ignition (Interpreter)</text>

  <!-- Bytecode -> TurboFan -->
  <path d="M510 240 L510 300" class="path" />
  <text x="550" y="270" class="label">Profiler (Hot Code)</text>

  <!-- TurboFan -> Machine Code -->
  <path d="M450 330 L370 330" class="path" />
  <text x="410" y="320" class="label">Optimizes</text>

  <!-- Machine Code -> Bytecode (Deopt) -->
  <path d="M310 300 C 310 200, 400 210, 450 210" class="path-dashed" />
  <text x="360" y="230" class="label" fill="#d32f2f">De-optimization</text>

</svg>

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
