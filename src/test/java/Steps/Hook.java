package Steps;

import io.cucumber.java.After;
import io.cucumber.java.Before;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;


public class Hook {

    WebDriver driver;

    @Before
    public void InitizializeTest() {
        System.out.println("Print before test");
    }

    @After
    public void TearDownTest(){
        driver = new ChromeDriver();
        driver.quit();
    }
}
