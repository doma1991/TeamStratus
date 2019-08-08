package Steps;

import PageObjects.LoginPage;
//import PageObjects.RegistrationPage;
import cucumber.api.java.en.And;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import java.util.concurrent.TimeUnit;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

import  java.sql.Connection;
import  java.sql.Statement;
import  java.sql.ResultSet;
import  java.sql.DriverManager;
import  java.sql.SQLException;

import org.openqa.selenium.chrome.ChromeDriver;
import Managers.PageObjectManager;
import dataProvider.ConfigFileReader;

public class RegistrationStep {
    WebDriver driver;
    PageObjectManager pageObjectManager;
    ConfigFileReader configFileReader;

    String fName = "farhan";
    String lName = "sadique";
    String address1 = "Morris Road";
    String City = "Birmingham";
    String PostCode = "b2 2re";
    String number = "07712345678";
    String emqail = "farhan1@live.co.uk";
    String userName = "mfarhanskjmjkjf6";
    String pss = "Theyellowduck1";




    @Given("i do not already have an account already")
    public void iDoNotAlreadyHaveAnAccountAlready() {
        configFileReader= new ConfigFileReader();
        System.setProperty("webdriver.chrome.driver", configFileReader.getDriverPath());
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(configFileReader.getImplicitlyWait(), TimeUnit.SECONDS);
        driver.get("http://localhost:3000/register");

    }

    @When("i submit my information")
    public void iSubmitMyInformation() {

        driver.findElement(By.name("firstName")).sendKeys(fName);
        driver.findElement(By.name("lastName")).sendKeys(lName);
        driver.findElement(By.name("address")).sendKeys(address1);
        driver.findElement(By.name("city")).sendKeys(City);
        driver.findElement(By.name("postCode")).sendKeys(PostCode);
        driver.findElement(By.name("telephoneNumber")).sendKeys(number);
        driver.findElement(By.name("email")).sendKeys(emqail);
        driver.findElement(By.name("login")).sendKeys(userName);
        driver.findElement(By.name("password")).sendKeys(pss);
        driver.findElement(By.name("submit")).click();


    }

    @Then("i should be see a confirmation message")
    public void iShouldBeSeeAConfirmationMessage() {



        String result = driver.findElement(By.id("registrationOutcome")).getText();

        Assert.assertEquals("Registration successful",  result);

    }

    @And ("details should be saved to the database")
    public void detailsShouldBeSavedToTheDatabase() throws SQLException{


        //  public static void  main(String[] args) throws  ClassNotFoundException, SQLException {

        //Connection URL Syntax: "jdbc:mysql://ipaddress:portnumber/db_name"
        try {
            String dbUrl = "jdbc:mysql://35.176.107.37:3306/getyourway";

            //Database Username
            String username = "root";

            //Database Password
            String password = "password";

            //Query to Execute
            String query = "select * from user where login = '"+userName+"';";
            //Load mysql jdbc driver
            //  Class.forName("com.mysql.jdbc.Driver");

            //Create Connection to DB
            Connection con = DriverManager.getConnection(dbUrl, username, password);

            //Create Statement Object
            Statement stmt = con.createStatement();

            // Execute the SQL Query. Store results in ResultSet
            ResultSet rs = stmt.executeQuery(query);

            // While Loop to iterate through all data and print results

            String firstName = rs.getString("firstName");
            String lastName = rs.getString("lastName");
            String address = rs.getString("address");
            String city = rs.getString("city");
            String postCode = rs.getString("postCode");
            String login = rs.getString("login");
            String password1 = rs.getString("password");
            String email = rs.getString("email");
            String telephoneNumber = rs.getString("telephoneNumber");


            Assert.assertEquals(fName, firstName);
            Assert.assertEquals(lName, lastName);
            Assert.assertEquals(address1, address);
            Assert.assertEquals(City, city);
            Assert.assertEquals(City, postCode);
            Assert.assertEquals(userName, login);
            Assert.assertEquals(pss, password1);
            Assert.assertEquals(emqail, email);
            Assert.assertEquals(number, telephoneNumber);
            con.close();
        } catch (SQLException e){System.out.println(e);}


        // closing DB Connection




    }

    @And("i should be able to log in with username and password")
    public void iShouldBeAbleToLogInWithUsernameAndPassword() {
        driver.findElement(By.id("signinLink")).click();
        driver.findElement(By.name("login")).sendKeys(userName);
        driver.findElement(By.name("password")).sendKeys(pss);
        driver.findElement(By.id("signinButton")).click();
        driver.findElement(By.name("logout"));




    }

    @Given("username has already been registered")
    public void detailsEnteredHaveAlreadyBeenRegistered() {

        try {

            String dbUrl = "jdbc:mysql://35.176.107.37:3306/getyourway";

            //Database Username
            String username = "root";

            //Database Password
            String password = "password";

            //Query to Execute
            String query = "select * from user where login = '"+userName+"';";            //Load mysql jdbc driver
            //  Class.forName("com.mysql.jdbc.Driver");

            //Create Connection to DB
            Connection con = DriverManager.getConnection(dbUrl, username, password);

            //Create Statement Object
            Statement stmt = con.createStatement();

            ResultSet rs = stmt.executeQuery(query);

            String login = rs.getString("login");

            Assert.assertEquals(userName, login);
        }catch (SQLException e){System.out.println(e);}


    }

    @When("i enter my details which have already been registered")
    public void iEnterMyDetailsWhichHaveAlreadyBeenRegistered() {

        driver.findElement(By.name("firstName")).sendKeys(fName);
        driver.findElement(By.name("lastName")).sendKeys(lName);
        driver.findElement(By.name("address")).sendKeys(address1);
        driver.findElement(By.name("city")).sendKeys(City);
        driver.findElement(By.name("postCode")).sendKeys(PostCode);
        driver.findElement(By.name("telephoneNumber")).sendKeys(number);
        driver.findElement(By.name("email")).sendKeys(emqail);
        driver.findElement(By.name("login")).sendKeys(userName);
        driver.findElement(By.name("password")).sendKeys(pss);
        driver.findElement(By.name("submit")).click();


    }

    @Then("registration should fail")
    public void registrationShouldFail() {

        try {

            String dbUrl = "jdbc:mysql://35.176.107.37:3306/getyourway";

            //Database Username
            String username = "root";

            //Database Password
            String password = "password";

            //Query to Execute
            String query = "select count(*) from user where login = 'mfarhansadique';";            //Load mysql jdbc driver
            //  Class.forName("com.mysql.jdbc.Driver");

            //Create Connection to DB
            Connection con = DriverManager.getConnection(dbUrl, username, password);

            //Create Statement Object
            Statement stmt = con.createStatement();


            ResultSet rs = stmt.executeQuery(query);

            rs.next();

            int test = rs.getInt(1);

            Assert.assertEquals(1, test);

        }catch (SQLException e){System.out.println(e);}


    }

    @And("a corresponding error message should be displayed")
    public void aCorrespondingErrorMessageShouldBeDisplayed() {

        driver.findElement(By.xpath("//*[text()[contains(.,'Unable to register')]]"));

    }

    @Given("The registration page is open")
    public void theRegistrationPageIsOpen() {

    }

    @When("the user populates the fields with invalid data")
    public void theUserPopulatesTheFieldsWithInvalidData() {

    }


    @Then("an invalid input error message should be displayed")
    public void anInvalidInputErrorMessageShouldBeDisplayed() {
    }
}

