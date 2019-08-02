package PageObjects;
import java.util.List;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindAll;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.PageFactory;
import dataProvider.ConfigFileReader;

public class LoginPage {
    WebDriver driver;
    ConfigFileReader configFileReader;

    public LoginPage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
        configFileReader = new ConfigFileReader();

    }

    @FindBy(how = How.ID, using = "id_name")
    private WebElement username_txtbox ;


    public void navigateTo_GooglePage() {
        driver.get(configFileReader.getApplicationUrl());
    }
}
