package Steps;

import Managers.PageObjectManager;
import PageObjects.HomePage;
import PageObjects.LoginPage;
import PageObjects.RegistrationPage;
import cucumber.api.java.en.And;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import dataProvider.ConfigFileReader;
import org.junit.Assert;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.concurrent.TimeUnit;

public class HomePageSteps {
    WebDriver driver;
    LoginPage loginPage;
    PageObjectManager pageObjectManager;
    ConfigFileReader configFileReader;
    RegistrationPage registrationPage ;
    HomePage homePage;


    @Given("I am on the homepage")
    public void iAmOnTheHomepage() {
        configFileReader= new ConfigFileReader();
        System.setProperty("webdriver.chrome.driver", configFileReader.getDriverPath());
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(configFileReader.getImplicitlyWait(), TimeUnit.SECONDS);
        pageObjectManager = new PageObjectManager(driver);
        homePage = pageObjectManager.getHomepage();
        homePage.navigateTo_HomePage();
        try {
            Thread.sleep(100);
            Assert.assertEquals("http://localhost:3000/",homePage.getCurrentPageUrl());

        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    @When("I click the register button in the navbar")
    public void iClickTheRegisterButtonInTheNavbar() {
        homePage.clickNavRegisterButton();
    }

    @Then("i should be redirected to the registration page")
    public void iShouldBeRedirectedToTheRegistrationPage() {

        pageObjectManager = new PageObjectManager(driver);
        registrationPage = pageObjectManager.getRegistrationpage();

        Assert.assertEquals("http://localhost:3000/register",registrationPage.getCurrentPageUrl());
    }

    @When("i click the log in button in the navbar")
    public void iClickTheLogInButtonInTheNavbar() {
        homePage.clickNavLoginButton();

    }

    @When("I enter a valid location in the From input box")
    public void iEnterAValidLocationInTheFromInputBox() {

        homePage.sendKeyToFromInput("Luton");
    }

    @And("I enter a valid location in the To input box")
    public void iEnterAValidLocationInTheToInputBox() {
        try {
            Thread.sleep(100);
            homePage.sendKeyToToInput("Osterley");

        } catch (InterruptedException e) {
            e.printStackTrace();
        }


    }

    @And("I select a valid date")
    public void iSelectAValidDate() {
     homePage.sendKeystoDatepicker("2020-01-01 01:00");
    }

    @And("I select the driving mode")
    public void iSelectTheDrivingMode() {
        homePage.clickdrivingmoderadiobutton();

    }



    @Then("I should see my map updated with the route")
    public void iShouldSeeMyMapUpdatedWithTheRoute() {

    }

    @Then("i should be redirected to the login page")
    public void iShouldBeRedirectedToTheLoginPage() {

    }

    @And("I click the submit button")
    public void iClickTheSubmitButton() {
        homePage.clickgobutton();
    }

    @Given("I am on the homepage and i am  not logged in")
    public void iAmOnTheHomepageAndIAmNotLoggedIn() {

        configFileReader= new ConfigFileReader();
        System.setProperty("webdriver.chrome.driver", configFileReader.getDriverPath());
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(configFileReader.getImplicitlyWait(), TimeUnit.SECONDS);
        pageObjectManager = new PageObjectManager(driver);
        homePage = pageObjectManager.getHomepage();
        homePage.navigateTo_HomePage();
        try {
            Thread.sleep(100);
            Assert.assertEquals("http://localhost:3000/",homePage.getCurrentPageUrl());

        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Then("I should see a user should log in message")
    public void iShouldSeeAUserShouldLogInMessage() {
        homePage.Findloginreminder();

    }
}
