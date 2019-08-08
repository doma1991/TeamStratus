package PageObjects;
import java.util.List;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindAll;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.PageFactory;
import dataProvider.ConfigFileReader;
import selenium.Wait;

public class RegistrationPage {

    WebDriver driver;
    ConfigFileReader configFileReader;

    public RegistrationPage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
        configFileReader = new ConfigFileReader();

    }


    public String getCurrentPageUrl(){
        Wait.untilPageLoadComplete(driver);
        return driver.getCurrentUrl();
    }
}
