# 3-Month Learning Roadmap

## MONTH 1 — JavaScript Internals (Ground-up Mastery)

### WEEK 1 — JS Engine Low-Level
- **Day 1–2**: What happens when JS code runs? (Parser → AST → Interpreter → JIT), Hidden classes, Inline caches, Bytecode.
- **Day 3–4**: Execution context, Lexical environment, Scope chain, Hoisting.
- **Day 5–7**: Call stack, Heap memory, Event loop (macro/micro tasks), Promises scheduling, Render pipeline.
- **Project**: Build a mini event-loop simulator in JS.

### WEEK 2 — Memory, Garbage Collection & Closures
- **Day 1–2**: Closures in memory, Retaining references, Memory leaks (real-world).
- **Day 3–4**: GC: mark-sweep, generational GC, V8 Orinoco GC pipeline.
- **Day 5–7**: Async internals, Web workers, SharedArrayBuffer, Atomics.
- **Project**: Build a closure visualizer.

### WEEK 3 — Advanced JS Mechanics
- **Day 1–2**: Prototype chain, OOP internals, `this` binding algorithm.
- **Day 3–4**: Module system: ESM, CJS, Import maps, Tree shaking, Code splitting.
- **Day 5–7**: Error handling internals, Stack unwinding, Microtask starvation cases.
- **Project**: Build your own module resolver.

### WEEK 4 — Toolchain Internals
- **Day 1–2**: Webpack architecture, Vite architecture, HMR internals.
- **Day 3–4**: Babel parser (AST), How transformations work.
- **Day 5–7**: Minifiers: Terser, ESBuild, Polyfills, Browserslist.
- **Project**: Build a toy bundler (AST → bundle).

---

## MONTH 2 — React Internals (from first principle → fiber → advanced systems)

### WEEK 5 — React Fundamentals (Internally)
- **Day 1–2**: How JSX really works, `React.createElement`.
- **Day 3–4**: Virtual DOM, Reconciliation algorithm.
- **Day 5–7**: Render vs Commit phases, How React calls functions, Why re-renders happen.
- **Project**: Build a mini Virtual DOM library.

### WEEK 6 — Fiber Architecture
- **Day 1–2**: Fiber data structure, Alternate tree, Partial rendering.
- **Day 3–4**: Scheduler (lane model), Priority levels, Cooperative multitasking.
- **Day 5–7**: Diffing algorithm internal flow, How React breaks rendering into units.
- **Project**: Implement a Fiber tree & scheduler.

### WEEK 7 — Hooks Internals
- **Day 1–2**: How React stores hook states, State queue system.
- **Day 3–4**: `useEffect` timing, cleanup timing, dependency tracking.
- **Day 5–7**: `useMemo` / `useCallback` caching, Why hook order matters, Custom hook internals.
- **Project**: Build your own hook system.

### WEEK 8 — React Optimization & Architecture
- **Day 1–2**: `React.memo` internals, Batching updates.
- **Day 3–4**: Suspense, Concurrent rendering, `useTransition`, `useDeferredValue`.
- **Day 5–7**: RSC (React Server Components), SSR hydration, Streaming server rendering.
- **Project**: Build a miniature SSR engine.

---

## MONTH 3 — Build Engines + Architecture + Advanced Projects

### WEEK 9 — Build a Mini JavaScript Engine
- Build step-by-step: Tokenizer, Parser, AST, Interpreter, Variable scope, Closures.
- **End result**: Tiny version of JS runtime.

### WEEK 10 — Build a Mini React Engine
- Build: `createElement` system, Virtual DOM, Diffing, Reconciliation, Fiber scheduler, Function component runner.
- **End result**: A working React clone (like Preact).

### WEEK 11 — Build a Hooks System
- Implement: `useState`, `useEffect`, `useMemo`, `useCallback`, custom hooks.
- **End result**: Hooks working exactly like React.

### WEEK 12 — Build a Production-Ready Architecture
- Topics: Component architecture patterns, Global state (Redux/Zustand internals), Performance patterns, Code splitting, Caching architectures, Error boundaries, Testing React internals.
- **Final Project**: Build an enterprise React architecture with all patterns.
