package UnitTests;

import org.junit.Test;
import stratus.API.WeatherAPI;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class WeatherAPITest {

    @Test
    public void testGetWeatherByLongLat(){
        WeatherAPI.getWeatherByLatLon("51.4","31.5");
        assertEquals(200,WeatherAPI.getApiCaller().getResponse().getStatusLine().getStatusCode());
    }

}
