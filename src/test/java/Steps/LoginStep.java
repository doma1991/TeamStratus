package Steps;
import PageObjects.LoginPage;
import PageObjects.RegistrationPage;
import cucumber.api.java.en.And;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import java.util.concurrent.TimeUnit;
import java.lang.Thread;

import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.WebDriverWait;
import Managers.FileReaderManager;

import io.cucumber.java.After;
import org.junit.Assert;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import Managers.PageObjectManager;
import dataProvider.ConfigFileReader;
import selenium.Wait;

public class LoginStep {
    WebDriver driver;
    LoginPage loginPage;
    PageObjectManager pageObjectManager;
    ConfigFileReader configFileReader;
    RegistrationPage registrationPage;

    @Given("I navigate to the login page")
    public void iNavigateToTheLoginPage() {
        configFileReader= new ConfigFileReader();
        System.setProperty("webdriver.chrome.driver", FileReaderManager.getInstance().getConfigReader().getDriverPath());
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(FileReaderManager.getInstance().getConfigReader().getImplicitlyWait(), TimeUnit.SECONDS);
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
        try {
            Thread.sleep(100);

        } catch (InterruptedException e) {
            e.printStackTrace();
        }


    }

    @Then("i should be logged in")
    public void iShouldBeLoggedIn() {



        registrationPage = pageObjectManager.getRegistrationpage();
        Assert.assertEquals("http://localhost:3000",registrationPage.getCurrentPageUrl());

    }

    @When("I enter the incorrect username")
    public void iEnterTheIncorrectUsername() {

        loginPage.sendKeysToUsername("wrongusername");

    }

    @Then("i should see a error message")
    public void iShouldSeeAErrorMessage() {
        driver.manage().timeouts().pageLoadTimeout(100, TimeUnit.SECONDS);
        driver.findElement(By.xpath("//*[@id=\"signInPanel\"]/div[1]/div[2]/form/div/div[3]/p[1]"));
    }

}
