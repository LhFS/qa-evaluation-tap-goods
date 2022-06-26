Feature: Adding new product in Cart

  Scenario: I add and manage a new product in cart

    Given I access the demo application
    And I navigate to Shop page
    And I Add some products in cart
    When I access the cart clicking in the cart icon 
    Then I see the cart summary
    And I see the form details
    And I can see the tree to navigate through cart steps
    When I fill the form information and navigate through steps
    Then I finish my order 
    And I see success message
    And I see the items bought
    And I see the details from the order

