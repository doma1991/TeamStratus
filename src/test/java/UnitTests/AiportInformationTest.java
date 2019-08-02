package UnitTests;

import org.junit.Test;
import stratus.API.AirportInformation;
import stratus.API.HttpApiResponse;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class AiportInformationTest {

    @Test
    public void testGetLongLatofAirport(){
        String[] airportInfo =  AirportInformation.getLongLatofAirport("lhr").split(",");
        assertEquals(3,airportInfo.length);
    }

    @Test
    public void testPrintLocationData(){
        HttpApiResponse apires = new HttpApiResponse("fa7769554emshaab499374a3ea4dp179e68jsne2fbed25ad4d","skyscanner-skyscanner-flight-search-v1.p.rapidapi.com");
        boolean isMoreThan = false;
        List<String> results = AirportInformation.printLocationData(apires,"London");
        if (results.size() > 0){
            isMoreThan = true;
        }
        assertTrue(isMoreThan);
    }

}
