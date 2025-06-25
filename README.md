# Playwright Automation: Signup & Account Deletion Flow

[![Playwright](https://img.shields.io/badge/Tested%20With-Playwright-45ba63?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/Built%20With-TypeScript-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Runtime-Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Status](https://img.shields.io/badge/Test%20Status-Passing-brightgreen)](#)
[![License](https://img.shields.io/badge/license-MIT-blue)](#)

This project is an end-to-end automation test suite using **Playwright with TypeScript** that tests the user signup, account creation, and deletion flow on [Automation Exercise](https://automationexercise.com/).

---

## ✅ Features

- 🔹 End-to-end flows:
- 🧱 Page Object Model (POM) design for maintainability
- 🔁 Custom fixtures for reusable page objects
- ✉️ Dynamic email generation for fresh test data
- 📋 Step-by-step logging in the terminal

---

## 🧪 Tech Stack

- [Playwright](https://playwright.dev/)
- TypeScript
- Node.js
- Page Object Model
- Custom Fixtures & Utilities

---

## 📂 Folder Structure

```
├── fixtures/                # Custom fixtures for page objects
├── node_modules/
├── pageObjects/             # Page Object Model classes
├── testFiles/               # Sample or data files
│   └── sample.txt
├── tests/                   # Test files
│   ├── contactForm.test.ts
│   └── signupFlow.test.ts
├── utils/                   # Utilities (email generator, logger)
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts     # Playwright configuration
├── prettier.config.js
└── README.md
```

---

## 🚀 How to Run the Tests

1. Install dependencies:

```bash
npm install
```

2. Run all tests:

```bash
npx playwright test
```

3. View HTML report:

```bash
npx playwright show-report
```

4. Format code with Prettier:

```bash
npx prettier --write .
```

---

## 🔧 Configuration

You can update test data or fixtures in the `fixtures/` or `utils/` directories.

---

## 👤 Author

**Hripsime Manukyan** – Junior QA Engineer

---

## 📃 License

This project is open for educational and portfolio use.
