<H1>How to run automated tests to QA Evaluation to Tap Goods</h1>

<h3>Requirements</h3>

- Node installed in the machine

<h3>Steps to execute</h3>

- Clone this repository to your local computer
- Run the following comands:

```sh
npm install #to install dependencies
npm run cypress:open #to execute the tests one by one using cypress UI
npm run cypress:run  #to execute all tests at the same time and not use the cypress UI
```

<h3>About the project</h3>

In this project was used Cypress with Cucumber using Gherkin syntax, each feature has it own file located in `cypress/integration/e2e`.

The language used was JavaScript.

In the folder `cypress/integration/common` we have all scripts files with the codes, was used one structure of files that allow us to reuse already created steps.

Was created 2 automated scenarios for: Add product in cart and Send contact form.
