package PageObjects;
import java.util.List;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindAll;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.PageFactory;
import dataProvider.ConfigFileReader;

public class HomePage {
    WebDriver driver;
    ConfigFileReader configFileReader;

    public HomePage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
        configFileReader = new ConfigFileReader();


    }

    @FindBy(how = How.ID, using = "navloginbutton")
    private WebElement nav_loginbutton ;

    @FindBy(how = How.ID, using = "navregisterbutton")
    private WebElement nav_registerbutton ;


    public void navigateTo_HomePage() {
        driver.navigate().to("localhost:3000");
    }

    public String getCurrentPageUrl(){
        return driver.getCurrentUrl();
    }

    public void clickNavLoginButton(){
        nav_loginbutton.click();
    }

    public void clickNavRegisterButton(){
        nav_registerbutton.click();
    }
}
