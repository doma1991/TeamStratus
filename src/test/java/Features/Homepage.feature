Feature:HomePageFeature
This Homepage feature deals with the functionality of the homepage

  Scenario: User should be able to navigate to the register page from the homepage
    Given I am on the homepage
    When I click the register button in the navbar
    Then i should be redirected to the registration page

    Scenario: User should be able to navigate to the login page from the homepage
      Given I am on the homepage
      When i click the log in button in the navbar
      Then i should be redirected to the login page

      Scenario: User should NOT be able to search from A to B and it should show on the map if not logged in
        Given I am on the homepage and i am  not logged in
        When I enter a valid location in the From input box
        And I enter a valid location in the To input box
        And I select a valid date
        And I select the driving mode
        And I click the submit button
        Then I should see a user should log in message


