package Managers;
import org.openqa.selenium.WebDriver;
import PageObjects.LoginPage;

public class PageObjectManager {

    private WebDriver driver;
    private LoginPage loginpage;

    public PageObjectManager(WebDriver driver){
        this.driver = driver ;
    }

    public LoginPage getLoginpage(){
        return (loginpage == null) ?  loginpage = new LoginPage(driver) : loginpage ;
    }
}
