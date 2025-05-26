import { faker } from "@faker-js/faker";

Cypress.Commands.add("generateUser", () => {
  return {
    Username: faker.internet.username(),
    Password: faker.internet.password({ length: 20 }),
    ContactEmail: faker.internet.email(),
    ContactName: faker.internet.username(),
    Message: faker.lorem.sentence(),
  };
});

describe("Practical Cypress Exercise – E2E Journey on Demoblaze", () => {
  let user;

  before(() => {
    cy.generateUser().then((generatedUser) => {
      user = generatedUser;
    });
    cy.intercept("POST", "https://api.demoblaze.com/signup").as(
      "signupRequest"
    );
    cy.intercept("POST", "https://api.demoblaze.com/login").as("loginRequest");
  });

  it("Automate a complete user journey on Demoblaze", () => {
    cy.visit("https://www.demoblaze.com");
    cy.viewport("macbook-16");

    // Sign up
    cy.get("#signin2").click();
    cy.then(() => {
      cy.get("#sign-username").type(user.Username, { force: true });
      cy.get("#sign-password").type(user.Password, { force: true });
    });
    cy.get('button[onclick="register()"]').click();
    cy.wait("@signupRequest");

    // Login
    cy.get("#login2").click();
    cy.get("#loginusername").type(user.Username, { force: true });
    cy.get("#loginpassword").type(user.Password, { force: true });
    cy.get('button[onclick="logIn()"]').click();
    cy.wait("@loginRequest");

    // Logout
    cy.get("#logout2").click();

    // Login again
    cy.get("#login2").click();
    cy.get("#loginusername").type(user.Username, { force: true });
    cy.get("#loginpassword").type(user.Password, { force: true });
    cy.get('button[onclick="logIn()"]').click();
    cy.wait("@loginRequest");

    // Contact form
    cy.get('[data-target="#exampleModal"]').click();
    cy.get("#recipient-email").type(user.ContactEmail, { force: true });
    cy.get("#recipient-name").type(user.ContactName, { force: true });
    cy.get("#message-text").type(user.Message, { force: true });
    cy.get('button[onclick="send()"]').click();

    // Déclare selectedNames comme une variable locale
    const selectedNames = [];

    cy.get("[onclick=\"byCat('phone')\"]").click();
    cy.get(":nth-child(10) > .card > :nth-child(1) > .card-img-top").click();
    cy.get(".name")
      .should("be.visible")
      .invoke("text")
      .then((name) => {
        selectedNames.push(name.trim());
      });
    cy.get(".col-sm-12 > .btn").click();

    // Laptops
    cy.get(".active > .nav-link").click();
    cy.get("[onclick=\"byCat('notebook')\"]").click();
    cy.get(":nth-child(3) > .card > :nth-child(1) > .card-img-top").click();
    cy.get(".name")
      .should("be.visible")
      .invoke("text")
      .then((name) => {
        selectedNames.push(name.trim());
      });
    cy.get(".col-sm-12 > .btn").click();

    // Monitors
    cy.get(".active > .nav-link").click();
    cy.get("[onclick=\"byCat('monitor')\"]").click();
    cy.get(":nth-child(1) > .card > :nth-child(1) > .card-img-top").click();
    cy.get(".name")
      .should("be.visible")
      .invoke("text")
      .then((name) => {
        selectedNames.push(name.trim());
      });
    cy.get(".col-sm-12 > .btn").click();

    // Wrap the selectedNames array to use it later
    cy.wrap(null).then(() => {
      cy.log("Selected: " + selectedNames.join(", "));
      cy.get(":nth-child(4) > .nav-link").click();

      cy.get("#tbodyid")
        .children("tr")
        .should("have.length", selectedNames.length)
        .each(($row) => {
          cy.wrap($row)
            .find("td")
            .eq(1)
            .invoke("text")
            .then((text) => {
              expect(selectedNames).to.include(text.trim());
            });
        });
    });

    //place order

    cy.get(".col-lg-1 > .btn").click();
    cy.get("#name").type(user.Username, {force:true});
    cy.get("#country").type(faker.location.country(), {force:true});
    cy.get("#city").type(faker.location.city(), {force:true});
    cy.get("#card").type(
      faker.finance.creditCardNumber({ issuer: "63[7-9]#-####-####-###L" }), {force:true}
    );
    cy.get("#month").type(Math.floor(Math.random() * 12) + 1);
    cy.get("#year").type(Math.floor(Math.random() * 2030) + 2025);
    cy.get(
      "#orderModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary"
    ).click( {force:true});
    cy.get(".confirm").click();
    cy.get('#orderModal > .modal-dialog > .modal-content > .modal-footer > .btn-secondary').click()
  });
});
