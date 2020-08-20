#Author: your.email@your.domain.com
#Keywords Summary :
#Feature: List of scenarios.
#Scenario: Business rule through list of steps with arguments.
#Given: Some precondition step
#When: Some key actions
#Then: To observe outcomes or validation
#And,But: To enumerate more Given,When,Then steps
#Scenario Outline: List of steps for data-driven as an Examples and <placeholder>
#Examples: Container for s table
#Background: List of steps run before each of the scenarios
#""" (Doc Strings)
#| (Data Tables)
#@ (Tags/Labels):To group Scenarios
#<> (placeholder)
#""
## (Comments)
#Sample Feature Definition Template

Feature: User behavior of the Remit Page
  I want to use this template for my feature file

  Scenario: Go To Remittance Page
    Given I have Selenium installed
    When I go to the Consolidated Remittance Statement page
    Then I have the option to retrieve a remittance report 

  Scenario: Check Pharmacy name
    Given I am on the Consolidated Remittance Statement page
    When I check for the pharamcy name
    Then the name of the pharmacy is displayed
    
  Scenario: Check NCPDP number
    Given I am on the Consolidated Remittance Statement page
    When I check for the store's NCPDP number
    Then the NCPDP number is displayed
    
  Scenario: Select payment from dropdown 
    Given I am on the Consolidated Remittance Statement page
    When I click the payment dropdown
    Then I can select a payment from the list
    
 	Scenario: Select date range
    Given I am on the Consolidated Remittance Statement page
    And I have not selected a payment
    When I go to choose a date range
    Then I can select a begin date
    And I can select a end date

  Scenario: Download statement from dropdown
  	Given I have selected a payment from the dropdown
    When I click the download button
    Then that statement is downloaded
    
  Scenario: Download statement from selected range
  	Given I have inputed a valid begin payment date
  	And I have inputed a valid end payment date
  	When I click the download button
  	Then that statement is downloaded
  	
  Scenario: Download PDF statement
  	Given I have selected a payment from the dropdown
  	When I select the PDF button
  	And I click the download button
  	Then that statement is downloaded as a PDF
  	
  	
  	