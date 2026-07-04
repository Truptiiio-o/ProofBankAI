<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" alt="Next.js 14" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss" alt="TailwindCSS" />

</p>

<h1 align="center">🏦 ProofBank AI</h1>

<p align="center">
  <strong>Try Before You Switch</strong> — A simulated banking audit that shows you <em>exactly</em> how much you'd save by switching banks, <strong>before you open a single account.</strong>
</p>

<p align="center">
  <a href="#-what-is-this">What Is This?</a> •
  <a href="#-why-does-this-exist">Why?</a> •
  <a href="#-user-flow">User Flow</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-key-files--what-they-do">Key Files</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Get Started</a> •
  <a href="#-screenshots">Screenshots</a>
</p>

---

## 💡 What Is This?

**ProofBank AI** is a prototype web application that demonstrates a new approach to **customer acquisition in banking**.

Instead of asking people to _"trust us, we're a better bank"_, ProofBank AI **proves it with numbers** — using the customer's own financial data.

> **In simple terms:**  
> You upload your (mock) bank data → the app simulates what your last 90 days would have looked like at a different bank → you see a clear "Bank Value Proof" showing savings, rewards, reduced fees, and better loan rates — all before committing to anything.

---

## 🤔 Why Does This Exist?

| Problem | ProofBank AI's Answer |
|---|---|
| Banks spend crores on ads saying _"we're better"_ — but customers have no proof | Show each customer a **personalised, data-backed report** using their own transactions |
| Switching banks feels risky and confusing | Provide a **step-by-step migration engine** that does it all for you |
| Customers don't know how much they're losing in hidden fees | Run an **automated audit** that catches every ATM fee, high card fee, and interest rate gap |
| Banks struggle to acquire _quality_ customers | Attract people who are **genuinely a good financial fit** — not just anyone who clicks an ad |

---

## 🔁 User Flow

Here is the complete journey a user takes through the app:

```
  ┌──────────────────────────────┐
  │     1. LANDING PAGE  (/)     │
  │  "Try Before You Switch"     │
  │   Learn what ProofBank does  │
  │   Click → See My Bank Proof  │
  └──────────────┬───────────────┘
                 │
                 ▼
  ┌──────────────────────────────┐
  │   2. CONSENT PAGE (/connect) │
  │  Select accounts to audit    │
  │  Review privacy terms        │
  │  Click → Grant Consent       │
  │  ⏳ Loading: "Building your  │
  │     Financial Twin..."       │
  └──────────────┬───────────────┘
                 │
                 ▼
  ┌──────────────────────────────┐
  │  3. RESULTS DASHBOARD        │
  │     (/results)               │
  │                              │
  │  📊 Bank Value Proof Card    │
  │     (total annual savings)   │
  │  📋 Breakdown: Interest,     │
  │     Fees, Rewards, Loans     │
  │  💳 Recommended Products     │
  │  📈 Charts & Graphs          │
  │  🏦 FD Rate Comparison       │
  │  📜 Transaction History      │
  │                              │
  │  Click → Start My Switch     │
  └──────────────┬───────────────┘
                 │
                 ▼
  ┌──────────────────────────────┐
  │  4. MIGRATION ENGINE         │
  │     (/migration)             │
  │                              │
  │  Automated 5-step switch:    │
  │  ✅ KYC Verification         │
  │  ✅ New Account Opening      │
  │  ✅ Mandate Transfer         │
  │  ✅ Credit Card Issuance     │
  │  ⚙️  Old Account Closure     │
  │     (optional toggle)        │
  │                              │
  │  🎉 Welcome to Bank A!      │
  └──────────────────────────────┘
```

---

## 🧠 How the Simulation Engine Works

The core brain of the app lives in `lib/simulation.ts`. Here's what it calculates:

```
                        ┌─────────────────────────┐
                        │   Customer's Bank Data   │
                        │   (data/customer.json)   │
                        └────────────┬────────────┘
                                     │
                                     ▼
        ┌────────────────────────────────────────────────┐
        │         🧮  SIMULATION ENGINE                  │
        │         lib/simulation.ts                      │
        │                                                │
        │   1. Interest Differential                     │
        │      → Compare savings rates (Bank B vs A)     │
        │                                                │
        │   2. Avoidable Fees                            │
        │      → Find ATM fees, card fees you'd skip     │
        │                                                │
        │   3. Loan Refinance Savings                    │
        │      → Check if a lower interest rate exists   │
        │                                                │
        │   4. Credit Card Rewards Uplift                │
        │      → Calculate better cashback rates         │
        │                                                │
        │   5. Product Recommendations                   │
        │      → Suggest the best Bank A products        │
        └────────────────────┬───────────────────────────┘
                             │
                             ▼
                 ┌───────────────────────┐
                 │   Bank Value Proof    │
                 │   (structured JSON)   │
                 │                       │
                 │  Total Annual Value   │
                 │  = Interest Gained    │
                 │  + Fees Avoided       │
                 │  + Loan Savings       │
                 │  + Rewards Uplift     │
                 └───────────────────────┘
```

> **Important:** The simulation is _honest_. If Bank B has a better savings rate, the interest column shows a **negative** number. Transparency is the whole point.

---

## 📂 Project Structure

```
proofbank-ai/
│
├── app/                          # ← Next.js App Router (all pages live here)
│   ├── layout.tsx                #    Root layout, fonts, metadata
│   ├── globals.css               #    Global styles + custom animations
│   ├── page.tsx                  #    🏠 Landing Page (hero + features)
│   │
│   ├── connect/
│   │   └── page.tsx              #    🔗 Consent Manager (account selection)
│   │
│   ├── results/
│   │   └── page.tsx              #    📊 Results Dashboard (audit report)
│   │
│   └── migration/
│       └── page.tsx              #    🚀 Migration Engine (switch stepper)
│
├── components/                   # ← Reusable UI components
│   ├── DashboardHeader.tsx       #    User profile banner on results page
│   ├── OverviewCards.tsx         #    Balance, AMB, loan stat cards
│   ├── FinancialCharts.tsx       #    Recharts bar/pie/area charts
│   ├── ProductComparison.tsx     #    Side-by-side Bank B vs Bank A table
│   ├── FDRatesTable.tsx          #    Fixed deposit rates comparison
│   └── TransactionHistory.tsx    #    Scrollable transaction ledger
│
├── lib/                          # ← Core logic
│   ├── simulation.ts             #    🧮 THE SIMULATION ENGINE (all math)
│   └── types.ts                  #    TypeScript interfaces/types
│
├── data/                         # ← Mock data (simulates real bank data)
│   ├── customer.json             #    Mock customer profile & transactions
│   └── bankA-products.json       #    Bank A's rates, fees, products
│
├── tailwind.config.ts            #    Custom color palette (primary/accent)
├── package.json                  #    Dependencies & scripts
├── next.config.mjs               #    Next.js configuration
└── tsconfig.json                 #    TypeScript configuration
```

---

## 📄 Key Files & What They Do

### 📌 Pages

| File | Route | What It Does |
|---|---|---|
| `app/page.tsx` | `/` | **Landing page.** Hero section with "Try Before You Switch" tagline, three feature cards (Connect → Simulate → Proof), and a CTA button leading to the consent page. |
| `app/connect/page.tsx` | `/connect` | **Consent Manager.** Simulates an Account Aggregator consent flow. User selects which accounts to audit (savings, credit card, loan). Clicking "Grant Consent" triggers a loading animation ("Building Financial Twin...") and redirects to results. |
| `app/results/page.tsx` | `/results` | **Results Dashboard.** The heart of the app. Displays the Bank Value Proof card with total annual savings, a breakdown across 4 pillars (interest, fees, rewards, loans), recommended products, financial charts, FD rates, and full transaction history. |
| `app/migration/page.tsx` | `/migration` | **Migration Engine.** A 5-step automated onboarding stepper: KYC → Account Opening → Mandate Transfer → Card Issuance → (optional) Old Account Closure. Each step runs with a simulated delay and shows a success banner at the end. |

### 📌 Components

| File | What It Does |
|---|---|
| `DashboardHeader.tsx` | Displays the user's profile — name, bank, account type — in a gradient hero banner on the results page. |
| `OverviewCards.tsx` | Four stat cards showing current balance, average monthly balance, savings rate, and loan details. |
| `FinancialCharts.tsx` | Interactive charts (bar, pie, area) built with **Recharts** showing spending by category, income vs expenses, and balance trends. |
| `ProductComparison.tsx` | A detailed side-by-side comparison table — Bank B (current) vs Bank A (recommended) across savings, cards, loans, and FDs. |
| `FDRatesTable.tsx` | A clean table showing Bank A's fixed deposit interest rates across different tenures for general & senior citizens. |
| `TransactionHistory.tsx` | A searchable, scrollable ledger of all mock transactions with category badges and credit/debit colour coding. |

### 📌 Core Logic

| File | What It Does |
|---|---|
| `lib/simulation.ts` | **The Simulation Engine** — the most important file. Takes customer data + Bank A products as input, and outputs a structured `BankValueProof` with: interest differential, avoidable fees, loan refinance savings, card rewards uplift, total annual value, and product recommendations. Every calculation has inline comments explaining the financial logic. |
| `lib/types.ts` | TypeScript interfaces for all data shapes — `CustomerData`, `BankAProducts`, `Transaction`, `AccountSummary`, etc. Keeps the codebase type-safe. |

### 📌 Mock Data

| File | What It Does |
|---|---|
| `data/customer.json` | A complete mock customer profile: "Suryansh Garg" at Bank B with ₹4.15L balance, a personal loan at 14.5%, a credit card with ₹3,500 annual fee, and 26 realistic transactions (salary, SIPs, groceries, ATM fees, EMIs, etc.). |
| `data/bankA-products.json` | Bank A's full product catalogue: savings account tiers (2.70–3.00%), two credit cards, personal loan rates (11.15–14.30%), and FD rates across 8 tenures. |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 14** | React framework with App Router, file-based routing, server components |
| **React 18** | Component-based UI library |
| **TypeScript** | Type safety across the entire codebase |
| **Tailwind CSS 3** | Utility-first CSS framework for rapid, responsive styling |
| **Recharts** | Composable charting library for bar, pie, and area charts |
| **Lucide React** | Beautiful, consistent icon set (shield, lock, sparkle icons etc.) |
| **Geist Font** | Clean, modern typography (loaded locally via `next/font`) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or later) — [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** — [Download here](https://git-scm.com/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Truptiiio-o/ProofBankAI.git

# 2. Navigate into the project folder
cd ProofBankAI

# 3. Install all dependencies
npm install

# 4. Start the development server
npm run dev
```

### Open in Browser

Once the server starts, open your browser and go to:

```
http://localhost:3000
```

That's it! You should see the landing page. Click **"See My Bank Value Proof"** to start the full flow.

---

## 🎨 Design System

The app uses a custom colour palette defined in `tailwind.config.ts`:

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#0B3D91` | Main brand blue — buttons, headers, accents |
| `primary-hover` | `#082E6D` | Darker blue for hover states |
| `primary-light` | `#EBF2FC` | Light blue backgrounds, badges |
| `primary-dark` | `#062252` | Deep blue for gradients |
| `accent` | `#00B8A9` | Teal green — highlights, sparkle badges, CTAs |
| `accent-hover` | `#009C8F` | Darker teal for hover |
| `accent-light` | `#E6F8F6` | Soft teal backgrounds |

---

## 📊 What the Simulation Calculates

For the demo mock customer (**Suryansh Garg, Bank B**), the simulation engine produces:

| Metric | Value | How It's Calculated |
|---|---|---|
| **Interest Differential** | Negative (Bank B rate is slightly higher) | `(AMB × Bank A Rate) - (AMB × Bank B Rate)` |
| **Avoidable Fees** | ~₹3,500+ | Credit card annual fee reduction (₹3,500 → ₹999) + ATM fee waivers |
| **Loan Refinance Savings** | ~₹16,750 | Personal loan rate drop from 14.5% → 11.15% on ₹5L principal |
| **Card Rewards Uplift** | ~₹12,000+ | 5% online cashback vs. current 1.33% reward rate |
| **Total Annual Value** | **₹30,000+** | Sum of all four pillars above |

> These numbers are computed live from `data/customer.json` and `data/bankA-products.json` every time the results page loads.

---

## 🏗️ Current Status

This is a **frontend prototype / proof-of-concept**. Here's what's built and what's not:

| Feature | Status |
|---|---|
| Landing page with hero & feature cards | ✅ Built |
| Consent Manager (mock Account Aggregator flow) | ✅ Built |
| Simulation Engine (all 4 financial calculations) | ✅ Built |
| Results Dashboard with Value Proof | ✅ Built |
| Interactive charts (Recharts) | ✅ Built |
| Product comparison tables | ✅ Built |
| Transaction history ledger | ✅ Built |
| Migration stepper (5-step onboarding) | ✅ Built |
| Real Account Aggregator integration | ❌ Not yet |
| Backend API / Database | ❌ Not yet |
| User authentication | ❌ Not yet |
| Real bank product data feeds | ❌ Not yet |

---


<p align="center">
  Built with 💙 by <strong>Team ProofBank AI</strong>
</p>
