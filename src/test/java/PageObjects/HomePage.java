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

    @FindBy(how = How.ID, using = "from_input" )
    private WebElement from_input ;

    @FindBy(how = How.ID, using = "to_input" )
    private WebElement to_input ;

    @FindBy(how = How.ID, using ="datepicker")
    private WebElement datepicker ;

    @FindBy(how = How.ID, using = "driving_mode")
    private WebElement drivingmode ;



    public void sendKeyToFromInput(String fromlocation){
        from_input.sendKeys(fromlocation);
    }

    public void sendKeystoDatepicker(String date){
        datepicker.sendKeys(date);
    }

    public void sendKeyToToInput(String tolocation){
        to_input.click();
        to_input.sendKeys(tolocation);
    }


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

    public void clickdrivingmoderadiobutton(){ drivingmode.click();}
}
