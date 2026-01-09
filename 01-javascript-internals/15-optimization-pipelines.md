# 🔥 OPTIMIZATION PIPELINES (MINIFIERS & POLYFILLS)

## Terser · ESBuild · SWC · Browserslist · Polyfills

Your code is never shipped as written.
It goes through a brutal pipeline of **Transformation & Destruction**.

---

## 1️⃣ MINIFICATION (THE ART OF REMOVAL)

Minifiers (Terser, UglifyJS, ESBuild) do 3 things:

### 1. Mangling
Renaming variables to shorter names.

```js
// Source
function calculateTotal(price, tax) {
  return price + tax;
}

// Mangled
function a(b, c) {
  return b + c;
}
```
> ⚠️ **Danger**: This breaks `Function.name` and reflection.

### 2. Compression (Dead Code Elimination)
AST analysis to remove unreachable code (constant folding).

```js
if (false) { console.log("Hi"); }
// Removed completely
```

### 3. Whitespace Removal
Stripping spaces, newlines, comments.

---

## 2️⃣ THE COMPILERS: TERSER vs ESBUILD vs SWC

| Tool | Language | Speed | Usage |
| :--- | :--- | :--- | :--- |
| **Terser** | JS | 🐢 Slow | Standard (Webpack prod) |
| **ESBuild**| Go | ⚡ 100x | Vite, AWS CDK |
| **SWC** | Rust | ⚡ 70x | Next.js Compiler |

**Architecture Shift**: The industry is moving from JS-based tools (Terser) to Native tools (Rust/Go).

---

## 3️⃣ POLYFILLS (THE COMPATIBILITY LAYER)

New JS features crash old browsers. Polyfills patch the runtime.

### Core-JS
The standard library for polyfills.

```js
import "core-js/actual/array/at";
[1,2,3].at(-1);
```

### Methods of Polyfilling
1.  **Global Entry**: Import everything (Huge bundle).
2.  **Usage-Based (Babel)**: Scan AST, only import used polyfills (`useBuiltIns: 'usage'`).
3.  **Service**: User Agent based CDN (e.g. polyfill.io).

---

## 4️⃣ BROWSERSLIST (THE CONFIG SOURCE)

How does Babel/PostCSS know which browsers to support?
**Browserslist**.

```
> 1%
last 2 versions
not dead
```

This query queries **CanIUse**.
It returns a list of targets (e.g., "Chrome 80, Safari 14").
Tools read this to decide **how much** to transpile.

---

## 5️⃣ MODERN vs LEGACY BUNDLES (DIFFERENTIAL LOADING)

The smartest way to ship code.

```html
<!-- Modern Browsers (ESM + No Polyfills) -->
<script type="module" src="main.modern.js"></script>

<!-- Legacy Browsers (SystemJS + Polyfills) -->
<script nomodule src="main.legacy.js"></script>
```

Browser downloads **only** what it needs. Saves 30% size.

---

## ✅ YOU NOW UNDERSTAND
* Why minifiers break variable names
* Why ESBuild is replacing Terser
* How Browserslist controls your build target
* The difference between Modern and Legacy builds

This chapter is **complete**.
