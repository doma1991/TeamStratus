package Steps;
import PageObjects.LoginPage;
import cucumber.api.java.en.And;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import java.util.concurrent.TimeUnit;
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
        loginPage.navigateTo_GooglePage();
    }

    @When("I enter the correct username")
    public void iEnterTheCorrectUsername() {
    }

    @And("I enter the correct Password")
    public void iEnterTheCorrectPassword() {
    }

    @And("I click the submit")
    public void iClickTheSubmit() {

    }

    @Then("i should be logged in")
    public void iShouldBeLoggedIn() {
        driver.quit();
    }

    @When("I enter the incorrect username")
    public void iEnterTheIncorrectUsername() {

    }

}
