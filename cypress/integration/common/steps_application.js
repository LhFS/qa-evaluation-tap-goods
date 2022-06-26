/// <reference types='cypress' />
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
import CONSTANTS from "../../support/constants";
const wait_application = 1500;

Given("I access the demo application", () => {
  cy.intercept(CONSTANTS.URL).as("getShopSite");
  cy.visit(CONSTANTS.URL);
  cy.location().should((loc) => {
    expect(loc.pathname).to.eq("/home");
  });
  cy.wait("@getShopSite").its("response.statusCode").should("eq", 200);
});

And("I navigate to {} page", (item) => {
  cy.get('[class="subMenu"]').contains(item).should("be.visible").click();
});

And("I Add some products in cart", () => {
  cy.get('[class="storeItems"]')
    .contains("Micro Excavator")
    .get('[placeholder="Qty"]')
    .first()
    .type("10");
  cy.get('[class="storeItems"]')
    .contains("Micro Excavator")
    .get('[class="btn"]')
    .contains("Add")
    .click();
});

When("I access the cart clicking in the cart icon", () => {
  cy.get('[class="icon shoppingCart"]').click();
  cy.location().should((loc) => {
    expect(loc.pathname).to.eq("/cart");
  });
});

Then("I see the cart summary", () => {
  cy.get('[class="billingSummary"]').should("exist").and("be.visible");
  cy.get('[class="billingDetails"]').should("exist").and("be.visible");
});

And("I see the form details", () => {
  cy.get('[class="itemForm"]').should("exist").and("be.visible");
  cy.get('[class="details"]').should("exist").and("be.visible");
});

And("I can see the tree to navigate through cart steps", () => {
  cy.get('[class="progress"]').should("exist").and("be.visible");
});

And("I fill the form information and navigate through steps", () => {
  cy.get('[class="fields"]')
    .contains("Order Name")
    .get('input[type="text"]')
    .first()
    .type("Test Automation");
  cy.get('[class="fields dateRange"]')
    .contains("Order Start *")
    .get('[class="react-datepicker-component"]')
    .click({ multiple: true })
    .get('[class="react-datepicker-picker day current"]')
    .contains("29")
    .click();
  cy.get('[class="fields dateRange"]')
    .contains("Order End *")
    .get('[class="react-datepicker-component"]')
    .click({ multiple: true })
    .get('[class="react-datepicker-picker day current"]')
    .contains("30")
    .click();
  cy.get('[class="fields"]')
    .contains("Contact Name *")
    .get('[placeholder="First Name"]')
    .type("Peter");
  cy.get('[class="fields"]')
    .contains("Contact Name *")
    .get('[placeholder="Last Name"]')
    .type("Parker");
  cy.get('[class="fields"]')
    .contains("Contact Email Address *")
    .get('[name="email"]')
    .type("test@test.com");
  cy.get('[class="progress"]')
    .get('[class="btn secondary"]')
    .contains("Continue")
    .click();
  cy.get('[name="deliveryType"]').select("Pick Up");
  cy.get('[class="progress"]')
    .get('[class="btn secondary"]')
    .contains("Continue")
    .click();
});

Then("I finish my order", () => {
  cy.wait(wait_application).as("waitApplicationLoad");
  cy.get('[class="progress"]').find('[class="btn secondary"]').click();
  cy.location().should((loc) => {
    expect(loc.pathname).to.eq("/cart/confirmation");
  });
});

Then("I see success message", () => {
  cy.get('[class="complete"]').should("be.visible");
});

Then("I see the items bought", () => {
  cy.get('[class="companyItems"]')
    .get('[class="cartItemList"]')
    .should("be.visible");
});

Then("I see the details from the order", () => {
  cy.get('[class="eventDetails"]').should("be.visible");
});

When("I fill all fields with correct information", () => {
  cy.get('[placeholder="Name"]').type("Thor Odinson");
  cy.get('[placeholder="Phone"]').type("11111111111");
  cy.get('[placeholder="Company"]').type("Asgard LLC");
  cy.get('[placeholder="Email"]').type("abc@abc.com");
  cy.get('[placeholder="Message..."]').type(
    "This is just a single test message, do not worry"
  );
  cy.get('button[type="submit"]').contains("Submit").click();
});

Then("I should see the message of success", () => {
  cy.get('[class="fields"]').should("have.text", "Your message was sent!");
});
