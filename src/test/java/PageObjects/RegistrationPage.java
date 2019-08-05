package PageObjects;
import java.util.List;

import Steps.Registration;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindAll;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.PageFactory;
import dataProvider.ConfigFileReader;

public class RegistrationPage {
    WebDriver driver;
    ConfigFileReader configFileReader;

    public RegistrationPage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
        configFileReader = new ConfigFileReader();

    }

    @FindBy(how = How.NAME, using = "name")
    private WebElement username_txtbox ;

    public void sendFirstName (){
        username_txtbox.sendKeys("Farhan");
    }



    public void navigateTo_GooglePage() {
        driver.get(configFileReader.getApplicationUrl());
    }
}


