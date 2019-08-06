package Steps;
import PageObjects.LoginPage;
import cucumber.api.java.en.And;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import java.util.concurrent.TimeUnit;

import org.junit.Assert;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import Managers.PageObjectManager;
import dataProvider.ConfigFileReader;

public class LoginStep {
    WebDriver driver;
    LoginPage loginPage;
    PageObjectManager pageObjectManager;
    ConfigFileReader configFileReader;

    @Given("I navigate to the login page")
    public void iNavigateToTheLoginPage() {
        configFileReader= new ConfigFileReader();
        System.setProperty("webdriver.chrome.driver", configFileReader.getDriverPath());
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(configFileReader.getImplicitlyWait(), TimeUnit.SECONDS);
        pageObjectManager = new PageObjectManager(driver);
        loginPage = pageObjectManager.getLoginpage();
        loginPage.navigateTo_LoginPage();
        Assert.assertEquals("http://localhost:3000/login",loginPage.getCurrentPageUrl());
        driver.manage().timeouts().pageLoadTimeout(20, TimeUnit.SECONDS);

    }

    @When("I enter the correct username")
    public void iEnterTheCorrectUsername() {

        loginPage.sendKeysToUsername("test");
    }

    @And("I enter the correct Password")
    public void iEnterTheCorrectPassword() {
        loginPage.sendKeysToPassword("password");
    }

    @And("I click the submit")
    public void iClickTheSubmit() {
        loginPage.clickSignInButton();

    }

    @Then("i should be logged in")
    public void iShouldBeLoggedIn() {
        driver.manage().timeouts().pageLoadTimeout(20, TimeUnit.SECONDS);
        Assert.assertEquals("http://localhost:3000",driver.getCurrentUrl());
        driver.quit();
    }

    @When("I enter the incorrect username")
    public void iEnterTheIncorrectUsername() {

        loginPage.sendKeysToUsername("wrongusername");

    }

    @Then("i should see a error message")
    public void iShouldSeeAErrorMessage() {
        Assert.assertEquals("http://localhost:3000/login",driver.getCurrentUrl());
        driver.quit();
    }
}
