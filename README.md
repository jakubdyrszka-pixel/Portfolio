# Jakub Dyrszka — AI Product Builder & Frontend Developer Portfolio

[![Live Demo](https://img.shields.io/badge/Live_Demo-jakubdyrszka.dev-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://jakubdyrszka.dev)
[![Next.js 15](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> A modern, minimalist, bilingual (EN/PL) portfolio system built as a standalone product. Demonstrating the intersection of robust software architecture, clean frontend engineering, and AI-accelerated product development.

---

## 🌟 Overview / O Projekcie

This repository contains the source code for [jakubdyrszka.dev](https://jakubdyrszka.dev) — a bespoke portfolio system built from scratch with **Next.js 15 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS**. 

Instead of a generic template or simple list of links, this portfolio is engineered as a technical showcase:
* **Deep Case Studies**: Transparently detailing the core problem, architectural decisions, database models, technical constraints, and real-world trade-offs for each featured project.
* **AI Product Building Workflow**: Demonstrating how AI tools are leveraged as execution multipliers while maintaining rigorous engineering principles, offline-first security, and clean code foundations.
* **Performance & Accessibility**: 100% statically generated (SSG) pages with optimal Core Web Vitals, semantic HTML, Framer Motion micro-animations, and full `prefers-reduced-motion` compliance.

---

## 🚀 Featured Projects / Wybrane Projekty

### 1. 🏥 [PhysioNotes](/physionotes) — Offline-First Medical Documentation App
A professional desktop application designed for physical therapists to conduct patient interviews and generate clinical documentation without cloud dependency or latency.
* **Stack**: React, Electron, TypeScript, Node.js, Tailwind CSS, Local DB
* **Key Features**:
  * **Zero Cloud & Total Privacy**: Local database storage with Electron context isolation ensuring strict medical data privacy.
  * **7-Section Clinical Editor**: Tailored documentation workflow with built-in ICD-10 medical coding search and instant PDF export.
  * **Offline-First Architecture**: Rigorous local state management with zero network latency.

### 2. ⚡ [ClassFlow](https://github.com/jakubdyrszka-pixel/ClassFlow) — Fitness Studio SaaS Management Platform
A comprehensive multi-role SaaS system designed to handle complex class schedules, reservations, and real-time studio operations.
* **Stack**: Next.js 15, React 19, TypeScript, Prisma, PostgreSQL, Tailwind CSS
* **Key Features**:
  * **Role-Based Access Control (RBAC)**: Distinct permission boundaries and tailored UIs for 5 user roles (Clients, Instructors, Receptionists, Managers, Admins).
  * **Relational Data Engine**: Engineered a 20+ table schema in Prisma supporting atomic booking transactions and waitlists.
  * **Real-Time QR Check-in**: Dynamic QR code generation and instant verification for studio attendance tracking.

### 3. 🏋️ [Powerlifting Calculator](https://powerlifting-calculator-zeta.vercel.app) — Real-Time Sports Scoring Engine
A lightweight, dependency-free web application for competitive powerlifters and coaches to instantly calculate and compare scores across federations.
* **Stack**: Vanilla JavaScript, HTML5, CSS3 (Zero external libraries)
* **Key Features**:
  * **Multi-System Formulas**: Instantaneous algorithmic conversion for Wilks, IPF GL, and DOTS scoring models.
  * **"Weight to Beat" Algorithm**: Dynamically computes the exact bar load required to surpass the current leader in a competition ranking.
  * **Native Performance**: Built entirely with native browser APIs to prove that clean simplicity often outperforms heavy framework complexity.

---

## 🛠️ Tech Stack & Architecture

| Category | Technologies |
| :--- | :--- |
| **Framework & Core** | [Next.js 15](https://nextjs.org/) (App Router), [React 19](https://react.dev/), [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling & UI** | [Tailwind CSS](https://tailwindcss.com/), [Lucide React](https://lucide.dev/), Custom Design System (CVA, Clsx, Tailwind Merge) |
| **Animations** | [Framer Motion 12](https://www.framer.com/motion/) (with viewport reveal & stagger utilities) |
| **Internationalization** | Custom SEO-friendly i18n routing (`/en`, `/pl`) with dictionary type safety |
| **SEO & Metadata** | Statically generated OpenGraph images, automated XML sitemap, robots.txt, and semantic metadata |
| **Code Quality** | ESLint 9, Next ESLint Plugin, Strict TypeScript checking |

---

## 🌍 Internationalization (i18n)

The application features a lightweight, type-safe internationalization system built natively on top of the Next.js App Router:
* **Locale Routing**: Seamless switching between English (`/en`) and Polish (`/pl`) preserving URL parameters and slugs.
* **Localized Content**: Complete case study narratives, UI labels, and metadata customized for both English and Polish audiences.

---

## 💻 Local Development / Uruchomienie Lokalnie

### Prerequisites
* **Node.js**: v20.0.0 or higher
* **npm**: v10.0.0 or higher

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jakubdyrszka-pixel/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Available Commands

* `npm run dev` — Starts the Next.js local development server with Fast Refresh.
* `npm run build` — Generates an optimized production build and validates TypeScript types.
* `npm run start` — Starts the production server locally after building.
* `npm run lint` — Runs ESLint to verify code formatting and quality standards.

---

## 🔒 Security & Code Integrity

This repository is maintained with strict quality and security standards:
* **No Sensitive Data**: Zero hardcoded API keys, secrets, passwords, or private tokens.
* **Clean Codebase**: Fully audited with zero ESLint errors or warnings and complete static typing.
* **Secure Dependencies**: Regularly updated and checked against vulnerability databases.

---

## 📬 Contact & Connect

* **Website**: [jakubdyrszka.dev](https://jakubdyrszka.dev)
* **GitHub**: [@jakubdyrszka-pixel](https://github.com/jakubdyrszka-pixel)
* **Email**: [jakub.dyrszka@gmail.com](mailto:jakub.dyrszka@gmail.com)
* **Instagram**: [@pwrlft.kubus](https://instagram.com/pwrlft.kubus)

---

<p align="center">
  Designed & Engineered by <strong>Jakub Dyrszka</strong> &bull; Built with Next.js & Tailwind CSS
</p>
