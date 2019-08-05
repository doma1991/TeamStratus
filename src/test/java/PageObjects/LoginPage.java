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

    @FindBy(how = How.ID, using = "login")
    private WebElement username_loginbox ;

    @FindBy(how = How.ID, using = "password")
    private WebElement password_loginbox ;

    @FindBy(how = How.ID, using = "signin")
    private WebElement signin_button;


    public void navigateTo_LoginPage() {
        driver.navigate().to("localhost:3000/login");
    }

    public void sendKeysToUsername(String Input){
        username_loginbox.sendKeys(Input);
    }

    public void sendKeysToPassword(String Input){
        password_loginbox.sendKeys(Input);
    }

    public String getCurrentPageUrl(){
        return driver.getCurrentUrl();
    }

    public void clickSignInButton(){
        signin_button.click();
    }


}
