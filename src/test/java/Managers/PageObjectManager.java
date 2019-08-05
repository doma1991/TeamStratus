package Managers;
import Steps.Registration;
import org.openqa.selenium.WebDriver;
import PageObjects.LoginPage;
import PageObjects.RegistrationPage;

public class PageObjectManager {

    private WebDriver driver;
    private LoginPage loginpage;
    private RegistrationPage registrationPage;

    public PageObjectManager(WebDriver driver){
        this.driver = driver ;
    }

    public LoginPage getLoginpage(){
        return (loginpage == null) ?  loginpage = new LoginPage(driver) : loginpage ;
    }
    public RegistrationPage getRegistrationPage(){ return (registrationPage== null) ?  registrationPage  = new RegistrationPage(driver) : registrationPage  ;
    }
}
