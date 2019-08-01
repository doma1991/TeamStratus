Feature: LoginFeature
  This Login feature deals with the functionality of the login

  Scenario: Login with correct username and password
    Given I navigate to the login page
    When I enter the correct username
    And I enter the correct Password
    And I click the submit
    Then i should be logged in

    Scenario: User cannot login with incorrect Username
      Given I navigate to the login page
      When I enter the incorrect username
      And I enter the correct Password
      And I click the submit
      Then i should be logged in
