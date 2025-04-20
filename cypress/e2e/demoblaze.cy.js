import { faker } from "@faker-js/faker";
const userData = {
  username: faker.internet.userName(),
  password: faker.internet.password(),
};
var productsNames = [];
describe("Demoblaze test", () => {
  beforeEach(() => {
    cy.visit("https://www.demoblaze.com");
  });
  it("Sign up test", () => {
    cy.get('[data-target="#signInModal"]').click();
    cy.get("#sign-username").type(userData.username, { force: true });
    cy.get("#sign-password").type(userData.password, { force: true });
    cy.get('[onclick="register()"]').click();
    cy.on("window:alert", (alert) => {
      expect(alert).to.contains("Sign up successful.");
    });
  });
  it("Login", () => {
    cy.get("#login2").click();
    cy.get("#loginusername").type(userData.username, { force: true });
    cy.get("#loginpassword").type(userData.password, { force: true });
    cy.get('[onclick="logIn()"]').click();
  });
  it("Send a message", () => {
    cy.get('[data-target="#exampleModal"]').click();

    cy.get("#recipient-email").type(faker.internet.email(), { force: true });
    cy.get("#recipient-name").type(faker.person.fullName(), { force: true });
    cy.get("#message-text").type(faker.lorem.lines({ min: 1, max: 4 }), {
      force: true,
    });
    cy.get('[onclick="send()"]').click();
    cy.on("window:alert", (alr) => {
      expect(alr).to.contains("Thanks for the message!!");
    });
  });
  it.only('add products', () => {
    // Helper function to add one random product from a category
    const addRandomProductFromCategory = (category) => {
      cy.get(`[onclick="byCat('${category}')"]`).click();
      cy.wait(1000); // Wait for products to load (can be replaced with smarter waits)
  
      cy.get('.col-lg-4.col-md-6.mb-4').then(($cards) => {
        const count = $cards.length;
        const randomIndex = Math.floor(Math.random() * count);
  
        cy.wrap($cards).eq(randomIndex).within(() => {
          cy.get('img.card-img-top.img-fluid').click();
        });
  
        cy.get('.col-sm-12 > .btn').should('be.visible').click();
  
        cy.get('.name').invoke('text').then((productName) => {
          productsNames.push(productName.trim());
          cy.log(`Added product from ${category}: ${productName}`);
        });
  
        cy.get('#nava').click(); // Click on logo to go back to home
      });
    };
  
    // Visit site first
    cy.visit('https://www.demoblaze.com/');
  
    // Add products from each category
    addRandomProductFromCategory('phone');
    addRandomProductFromCategory('notebook');
    addRandomProductFromCategory('monitor');
  
    // Final log
    cy.then(() => {
      console.log('Products added:', productsNames);
    });
  });
});
