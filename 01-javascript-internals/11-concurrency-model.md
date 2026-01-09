# 🔥 CONCURRENCY MODEL (WORKERS & SHARED MEMORY)

## Web Workers · SharedArrayBuffer · Atomics · Parallelism

JavaScript is single-threaded... **on the main thread**.
But the **Language** supports parallelism.

---

## 1️⃣ THE SINGLE THREAD LIMITATIONS

The Main Thread handles:
*   JS execution (V8)
*   DOM rendering
*   Event handling

If you run a generic `while(true)` loop:
*   UI freezes
*   Clicks are ignored
*   Browser crashes

**Solution:** Offload work to **Worker Threads**.

---

## 2️⃣ WEB WORKERS (The "OS Threads" of Web)

Web Workers are independent threads spawned by the browser.
They have:
*   Own Call Stack
*   Own Heap Memory
*   Own Event Loop
*   NO DOM Access (Thread safe)

### Communication: PostMessage
Threads talk via **Message Passing** (Copying data).

```js
// Main
const worker = new Worker('job.js');
worker.postMessage(data); // Serializes (Copies) Data 🐢

// Worker
onmessage = (e) => {
  // Heavy computation
  postMessage(result);
};
```

**Problem:** Copying 100MB data is SLOW.

---

## 3️⃣ SHARED ARRAY BUFFER (TRUE PARALLELISM)

Introduced to allow threads to share **the same RAM** without copying.

```js
const buffer = new SharedArrayBuffer(1024); // 1KB Shared RAM
const view = new Int32Array(buffer);

worker.postMessage(buffer); // Zero-Copy! ⚡
```

Now both threads read/write to `view[0]` instantly.

---

## 4️⃣ RACE CONDITIONS & ATOMICS

When two threads write to `view[0]` at the same time:
*   Thread A reads 0
*   Thread B reads 0
*   Thread A adds 1 -> writes 1
*   Thread B adds 1 -> writes 1
*   **Result: 1** (Should be 2)

### The Solution: Atomics
Operations that cannot be interrupted.

```js
Atomics.add(view, 0, 1); // Safe +1
```

### Locking (Mutex)
Using `Atomics.wait()` and `Atomics.notify()` you can put execution to sleep until another thread wakes it up.

---

## 5️⃣ REAL WORLD ARCHITECTURE: THE ACTOR MODEL

Most high-performance web apps (Figma, VS Code Web) use this:

```mermaid
graph TD
    MAIN[Main Thread (UI/Events)]
    W1[Worker 1 (Physics)]
    W2[Worker 2 (AI Logic)]
    W3[Worker 3 (Data Parse)]
    
    MAIN <-->|Message| W1
    MAIN <-->|Message| W2
    MAIN <-->|Message| W3
    
    style MAIN fill:#f0f9ff,stroke:#3b82f6
    style W1 fill:#f3e8ff,stroke:#8b5cf6
    style W2 fill:#f3e8ff,stroke:#8b5cf6
    style W3 fill:#f3e8ff,stroke:#8b5cf6
```


---

## 6️⃣ WHEN TO USE WORKERS?

✅ **YES:**
*   Image/Video processing
*   Large JSON parsing
*   Encryption/Cryptography
*   Complex physics (Games)

❌ **NO:**
*   Simple logic (Overhead > Gain)
*   DOM manipulation (Cannot modify UI directly)

---

## ✅ YOU NOW UNDERSTAND
* JS can be multi-threaded via Workers
* Messages usually Copy data (Slow)
* SharedArrayBuffer Shares data (Fast)
* Atomics prevent threading bugs

This chapter is **complete**.
