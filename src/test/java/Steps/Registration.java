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

public class Registration
{WebDriver driver;
    LoginPage loginPage;
    PageObjectManager pageObjectManager;
    ConfigFileReader configFileReader;

    @Given("i do not have an account")
    public void iDoNotHaveAnAccountAlready() {
        configFileReader= new ConfigFileReader();
        System.setProperty("webdriver.chrome.driver", configFileReader.getDriverPath());
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(configFileReader.getImplicitlyWait(), TimeUnit.SECONDS);
        pageObjectManager = new PageObjectManager(driver);
        loginPage = pageObjectManager.getLoginpage();
        loginPage.navigateTo_GooglePage();
    }


    @When("i submit my information")
    public void iSubmitMyInformation() {
    }

    @Then("i should be see a confirmation message")
    public void iShouldSeeAConfirmationMessage() {

    }

    @And("be able to log in with username and password")
    public void beAbleToLogInWithUsernameAndPassword() {
        driver.quit();
    }

    @When("I enter the incorrect username")
    public void iEnterTheIncorrectUsername() {

    }

}
