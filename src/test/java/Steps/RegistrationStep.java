package Steps;
import PageObjects.LoginPage;
//import PageObjects.RegistrationPage;
import cucumber.api.java.en.And;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import java.util.concurrent.TimeUnit;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import Managers.PageObjectManager;
import dataProvider.ConfigFileReader;

public class RegistrationStep {
    WebDriver driver;
    LoginPage loginPage;
   // RegistationPage registrationPage;
    PageObjectManager pageObjectManager;
    ConfigFileReader configFileReader;




    @Given("i do not already have an account already")
    public void iDoNotAlreadyHaveAnAccountAlready() {
        configFileReader= new ConfigFileReader();
        System.setProperty("webdriver.chrome.driver", configFileReader.getDriverPath());
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(configFileReader.getImplicitlyWait(), TimeUnit.SECONDS);
        driver.get("http://localhost:3000/register");

    }

    @When("i submit my information")
    public void iSubmitMyInformation() {

        driver.findElement(By.name("firstName")).sendKeys("Farhan");
        driver.findElement(By.name("lastName")).sendKeys("Sadique");
        driver.findElement(By.name("address")).sendKeys("123 Morris Road");
        driver.findElement(By.name("city")).sendKeys("Birmingham");
        driver.findElement(By.name("postCode")).sendKeys("B8 2RW");
        driver.findElement(By.name("telephoneNumber")).sendKeys("07712345678");
        driver.findElement(By.name("email")).sendKeys("farhan1@live.co.uk");
        driver.findElement(By.name("login")).sendKeys("mfarhansadique");
        driver.findElement(By.name("password")).sendKeys("Theyellowduck1");
        driver.findElement(By.name("submit")).click();


    }

    @Then("i should be see a confirmation message")
    public void iShouldBeSeeAConfirmationMessage() {
        driver.findElement(By.id("registrationOutcome")).sendKeys("registered successfully");

    }

    @And("be able to log in with username and password")
    public void beAbleToLogInWithUsernameAndPassword() {

    }

    @Given("details entered have already been registered")
    public void detailsEnteredHaveAlreadyBeenRegistered() {

    }

    @When("i enter my details which have already been registered")
    public void iEnterMyDetailsWhichHaveAlreadyBeenRegistered() {

    }

    @Then("registration should fail")
    public void registrationShouldFail() {

    }

    @And("a corresponding error message should be displayed")
    public void aCorrespondingErrorMessageShouldBeDisplayed() {

    }

    @Given("The registration page is open")
    public void theRegistrationPageIsOpen() {

    }

    @When("the user populates the fields with invalid data")
    public void theUserPopulatesTheFieldsWithInvalidData() {

    }


    @Then("an invalid input error message should be displayed")
    public void anInvalidInputErrorMessageShouldBeDisplayed() {
    }
}
