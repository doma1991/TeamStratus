
Feature: Registering an account in order to use service

  Scenario: Fill in registration form
    Given i do not already have an account already
    When i submit my information
    Then i should be see a confirmation message
    And be able to log in with username and password

  Scenario: Fill in registration form again
    Given details entered have already been registered
    When i enter my details which have already been registered
    Then registration should fail
    And a corresponding error message should be displayed

  Scenario: Register with invalid input
    Given The registration page is open
    When the user populates the fields with invalid data
    Then an invalid input error message should be displayed