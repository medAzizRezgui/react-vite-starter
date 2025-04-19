# react‑vite‑starter

A **Vite + React** boilerplate pre‑wired with ESLint, Prettier, Tailwind CSS, and GitHub Actions. Scaffold new apps in seconds and run your CI locally with **act**.

---

## 🚀 Project Description

**react‑vite‑starter** provides a solid foundation for modern React apps:

- **Vite** for lightning‑fast dev server and optimized builds :contentReference[oaicite:0]{index=0}
- **React** with JSX/TSX support
- **ESLint** + **Prettier** for consistent code style
- **Tailwind CSS** utility classes and custom theming
- **GitHub Actions** ready CI/CD pipelines

---

## ✨ Features

- Fast HMR and build times via Vite
- Opinionated linting & formatting
- Utility‑first styling with Tailwind
- Pre‑configured scripts: `dev`, `build`, `lint`, `format`
- Sample GitHub Actions workflows in `.github/workflows/`

---

## 🛠 Prerequisites

- **Node.js** ≥ 14.18 (or 16+)
- **npm** (or **yarn**, **pnpm**)
- **Git**
- **Docker** (for local CI with act) :contentReference[oaicite:1]{index=1}

---

## ⚡ Installation

### 1. Scaffold your app

Using **degit** (latest commit only, no history):

```bash
  npm install -g degit                             # install degit 
  degit youruser/react‑vite‑starter my‑app          # scaffold into `my‑app` 
cd my‑app
```