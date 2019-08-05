package Steps;
import PageObjects.LoginPage;
import PageObjects.RegistrationPage;
import cucumber.api.java.en.And;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import java.util.concurrent.TimeUnit;
import org.openqa.selenium.By;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import Managers.PageObjectManager;
import dataProvider.ConfigFileReader;

public class Registration
{WebDriver driver;
    LoginPage loginPage;
    RegistrationPage registrationPage;
    PageObjectManager pageObjectManager;
    ConfigFileReader configFileReader;

    @Given("i do not have an account")
    public void iDoNotHaveAnAccountAlready() {
        configFileReader= new ConfigFileReader();
        System.setProperty("webdriver.chrome.driver", configFileReader.getDriverPath());
        driver = new ChromeDriver();
        driver.get("http://172.17.14.192:3000/");
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(configFileReader.getImplicitlyWait(), TimeUnit.SECONDS);



    }


    @When("i submit my information")
    public void iSubmitMyInformation() {
//        registrationPage = pageObjectManager.getRegistrationPage();
//        registrationPage.sendFirstName();
        driver.findElement(By.name("firstName")).sendKeys("Farhan");
        driver.findElement(By.name("lastName")).sendKeys("Sadique");
        driver.findElement(By.name("address")).sendKeys("123 Morris Road");
        driver.findElement(By.name("city")).sendKeys("Birmingham");
        driver.findElement(By.name("postCode")).sendKeys("B8 2RW");
        driver.findElement(By.name("telephoneNumber")).sendKeys("07712345678");
        driver.findElement(By.name("email")).sendKeys("farhan1@live,.co.uk");
        driver.findElement(By.name("name")).sendKeys("mfarhansadique");
        driver.findElement(By.name("password")).sendKeys("Theyellowduck1");
        driver.findElement(By.name("submit")).click();

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


//    driver = None
//
//            def opening_browser(self):
//            driverLocation = "./SeleniumDriver/chromedriver"
//            os.environ["webdriver.chrome.driver"] = driverLocation
//            self.driver = webdriver.Chrome(driverLocation)
//            self.driver.get("http://localhost:3000/")
//            time.sleep(1)
//            # inputElement = self.driver.find_element_by_xpath('//*[@id="root"]/div/nav/a[3]/button').click()
//            self.driver.maximize_window()


