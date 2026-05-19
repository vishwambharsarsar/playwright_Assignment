Feature: Register new user and Complete purchase flow.
@smoke
  Scenario: Register and complete purchase flow
    Given I am on homePage
    When I click on Signup or login button
    And I enter name and Email Address
    And I click on Signup button
    And I Enter Account Information
    And I click on Create Account
    Then My account is created Successfully
    And I add product to cart
    And I Proceed to checkout
    And I enter comment and place order
    And I enter card details and confirm order
    Then my order will place successfully


@smoke
    Scenario: Duplicate email registration.
    Given I am on homePage
    When I click on Signup or login button
    And I enter name and Email Address of already registered user
    And I click on Signup button
    Then System display Error message
@regression
    Scenario Outline: Register and Login with multiple users.
    Given I am on homePage
    When I click on Signup or login button
    And I enter name as "<username>" and Email as "<email>" Address
    And I click on Signup button
    And I Enter Account Information password as "<password>" and firstname as "<firstname>" and lastname as "<lastname>" and company as "<company>" and Address1 as "<address1>" and Address2 as "<address2>" and State as "<state>" and city as "<city>" and Zipcode as "<zipcode>" and mobilenumber as "<mobilenumber>"
    And I click on Create Account
    Then My account is created Successfully
    And I click on logout button
    Then I successfully logout
    And I login with valid "<email>" and "<password>"
    Then I should be logged in as "<username>"
    And I click on logout button



    Examples:
    |username|email|password|firstname|lastname|company|address1|address2|state|city|zipcode|mobilenumber|
    |vishwambhar12|uniqueEmail|vish123|vishwambhar|sarsar|globant1|Pune1|Wakad1|Maharashtra|Hinjewadi|443322|7766554433|
    |vishwambhar22|uniqueEmail|vish456|vijay|chauhan|globant2|Pune2|Wakad2|Maharashtra|marunji|443322|7766554433|
    |vishwambhar32|uniqueEmail|vish789|hritik|roshan|globant3|Pune3|Wakad2|Maharashtra|punawale|443322|7766554433|

  @smoke
    Scenario Outline:Partial product name search
    Given I am on homePage
    When I click on Signup or login button
    And I am loggedin
    And I click on products button
    And I Enter Partial name as "<partialName>" of product in search box
    And I press search button
    Then I will get product with name containg entered "<partialName>"
    And I click on logout button



    Examples:
    |partialName|
    |top|
@smoke
    Scenario: Guest to logged-in cart persistence
    Given I am on homePage
    When I click on products button
    And  I add product to cart
    And  I click on Signup or login button
    And I am loggedin
    And I click on Cart button
    Then I verify guest cart becomes usercart after login
@smoke
    Scenario:Sort products by price (Low to High)
    Given I am on homepage of SauceDemo.com
    When I enter Valid username and password and Click on login button
    Then I Land to Inventory  homePage
    And I select Filter dropdown as price low to high
    Then I Verify prices of first 3 items should be ascending order

    Scenario:
















