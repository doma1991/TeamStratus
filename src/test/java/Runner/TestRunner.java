package Runner;

import cucumber.api.junit.Cucumber;
import io.cucumber.testng.AbstractTestNGCucumberTests;
import io.cucumber.testng.CucumberOptions;
import org.junit.runner.RunWith;


//@RunWith(Cucumber.class)
@CucumberOptions(features = {"src/test/java/features"},plugin = { "json:target/cucumber.json", "html:target/site/cucumber-pretty"},glue = "Steps",monochrome = true)
public class TestRunner extends AbstractTestNGCucumberTests {

}
