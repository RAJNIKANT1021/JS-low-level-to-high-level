# 🛠 PROJECT — BUILD A TOY BUNDLER

## AST Traversal · Dependency Graph · Code Generation

This project is the **Final Boss** of JavaScript Internals.
You will build a mini-Webpack.

---

## 🎯 GOAL

Input: `entry.js` (with imports).
Output: `bundle.js` (single file, executable in browser).

---

## 🧩 ARCHITECTURE

```mermaid
graph TD
    ENTRY[Entry File] --> PARSER[1. Create Asset (AST)]
    PARSER --> DEPS[2. Extract Dependencies]
    DEPS --> TRAVERSE[3. Traverse Graph]
    TRAVERSE --> GRAPH[4. Dependency Graph]
    GRAPH --> BUNDLE[5. Bundle (IIFE Wrapper)]
    
    style ENTRY fill:#f0f9ff,stroke:#3b82f6
    style PARSER fill:#f3e8ff,stroke:#8b5cf6
    style GRAPH fill:#d1fae5,stroke:#10b981
    style BUNDLE fill:#ffedd5,stroke:#ea580c
```


---

## 1️⃣ STEP 1: CREATE ASSET (PARSER)

We need to read a file and find its dependencies.
We use `@babel/parser` for AST.

```js
function createAsset(filename) {
  const content = fs.readFileSync(filename, "utf-8");
  const ast = parser.parse(content, { sourceType: "module" });
  
  const dependencies = [];
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value);
    }
  });
  
  const { code } = transformFromAst(ast, null, { presets: ["@babel/preset-env"] });
  
  return {
    id: id++,
    filename,
    dependencies,
    code
  };
}
```

---

## 2️⃣ STEP 2: BUILD GRAPH

Start at entry, recursively resolve dependencies.

```js
function createGraph(entry) {
  const mainAsset = createAsset(entry);
  const queue = [mainAsset];
  
  for (const asset of queue) {
    asset.mapping = {}; // Dependency -> ID
    
    asset.dependencies.forEach(relativePath => {
      const absolutePath = path.join(path.dirname(asset.filename), relativePath);
      const child = createAsset(absolutePath);
      
      asset.mapping[relativePath] = child.id;
      queue.push(child);
    });
  }
  return queue;
}
```

---

## 3️⃣ STEP 3: GENERATE BUNDLE

We need a runtime because browser **does not understand** `require` or `exports`.
We implement our own.

### The Runtime Template

```js
(function(modules) {
  function require(id) {
    const [fn, mapping] = modules[id];
    
    function localRequire(relativePath) {
      return require(mapping[relativePath]);
    }
    
    const module = { exports: {} };
    fn(localRequire, module, module.exports);
    return module.exports;
  }
  require(0);
})({...modules...})
```

---

## 4️⃣ STEP 4: PUTTING IT TOGETHER

```js
function bundle(graph) {
  let modules = "";
  
  graph.forEach(mod => {
    modules += `${mod.id}: [
      function(require, module, exports) { ${mod.code} },
      ${JSON.stringify(mod.mapping)}
    ],`;
  });
  
  return `(function(modules){...})({${modules}})`;
}
```

---

## ✅ WHAT YOU BUILT

You essentially built:
1.  **Webpack's Core**: The graph builder.
2.  **Babel's Core**: The AST transformer.
3.  **CommonJS Runtime**: The browser polyfill for modules.

This project completes your journey into **Toolchain Architecture**.

This chapter is **complete**.
