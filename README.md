# 💻 E2E Automated Test – Demoblaze with Cypress

This project is a full end-to-end automated test of the [Demoblaze](https://www.demoblaze.com) website using **Cypress**.  
It simulates the entire user journey: sign-up, login, adding products to the cart, placing an order, and verifying selected products.

---

## 🚀 Features Covered

- ✅ Dynamic user generation using [@faker-js/faker](https://www.npmjs.com/package/@faker-js/faker)
- ✅ User registration on the website
- ✅ Login and logout functionality
- ✅ Sending a message through the contact form
- ✅ Browsing categories (Phones, Laptops, Monitors)
- ✅ Adding multiple products to the cart
- ✅ Verifying that the correct products are in the cart
- ✅ Placing an order with dynamically generated form data

---

## 🛠️ Installation

### Prerequisites

- Node.js installed
- `npm` or `yarn` available

### Steps

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install

▶️ Running the Tests

Interactive Mode (UI)
npx cypress open
Then, in the Cypress interface, click on the test file:

cypress/e2e/Automatiser-un-parcours-utilisateur-complet-sur-Demoblaze.cy.js
Headless Mode (CLI)
npx cypress run
🧪 Test Structure

This test suite includes:

A custom Cypress command cy.generateUser() defined in commands.js to generate random user data.
A complete E2E scenario that performs:
User registration
Login and logout
Sending a message via the contact form
Browsing product categories
Adding multiple items to the cart
Verifying selected products in the cart
Placing an order with a dynamically filled form
📂 Recommended Project Structure

cypress/
  ├── e2e/
  │   └── Automatiser-un-parcours-utilisateur-complet-sur-Demoblaze.cy.js
  └── support/
      └── commands.js
cypress.config.js
package.json
README.md
📦 Main Dependencies

"dependencies": {
  "@faker-js/faker": "^8.4.1"
},
"devDependencies": {
  "cypress": "^13.7.0"
}
