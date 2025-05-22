# ⚠️ Broken Hydra Multi-Instance Experiment

This repository contains an experimental project that attempts to run **multiple instances of Hydra**, the live coding video synth.  
It was meant as a prototype to explore the process of visual creation in hydra.

---

## 🚨 Warning: Memory Leak & Performance Issues

This implementation **should NOT be used in production or reused directly**.  
It suffers from **critical performance issues**:

- Each Hydra instance spawns its own **WebGL render loop**
- These loops are **not properly cleaned up** when instances are removed
- Over time, this leads to **memory exhaustion** and massive **frame drops or freezes**
- Even closing/replacing components does **not release GPU/GL contexts**

Use this repository **for reference or debugging only**.

---

## 🧪 Project Purpose

The idea was to create a parser that given a specific hydra video synth command would 
split the execution of code to show the various visual results and how the concatanation
of functions could create the result.

---

## 🛠 Technologies

- 🧬 [Hydra](https://github.com/ojack/hydra) – Live coding visuals

---

## 💡 Recommendations

If you're looking to integrate Hydra into a web project:

- Stick to **one single reusable instance of Hydra** (Singleton/Hybrid pattern)

---

## 🔬 Status

**Abandoned as an experiment.**  
It is shared here purely for educational purposes, to document the failure mode and highlight limitations of using Hydra in multi-instance web contexts.

---

## 📛 DO NOT USE THIS IN PRODUCTION

This project exists to demonstrate a **pitfall**, not a viable solution.  

---

© 2025 – Use at your own risk.
