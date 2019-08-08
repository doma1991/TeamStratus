package Managers;
import PageObjects.HomePage;
import PageObjects.RegistrationPage;
import org.openqa.selenium.WebDriver;
import PageObjects.LoginPage;

public class PageObjectManager {

    private WebDriver driver;
    private LoginPage loginpage;
    private HomePage homepage;
    private RegistrationPage registrationpage;

    public PageObjectManager(WebDriver driver){
        this.driver = driver ;
    }

    public LoginPage getLoginpage(){
        return (loginpage == null) ?  loginpage = new LoginPage(driver) : loginpage ;
    }

    public HomePage getHomepage(){
        return (homepage == null) ?  homepage = new HomePage(driver) : homepage ;
    }

    public RegistrationPage getRegistrationpage(){ return (registrationpage == null) ?  registrationpage = new RegistrationPage(driver) : registrationpage ; }
}
