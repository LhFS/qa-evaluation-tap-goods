Feature: Adding new product in Cart

  Scenario: I add and manage a new product in cart

    Given I access the demo application
    And I navigate to Contact page
    When I fill all fields with correct information
    Then I should see the message of success