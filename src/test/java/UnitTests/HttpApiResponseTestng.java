package UnitTests;

import org.junit.Test;
import stratus.API.HttpApiResponse;

import static org.junit.jupiter.api.Assertions.assertEquals;


public class HttpApiResponseTestng {

    private HttpApiResponse res = new HttpApiResponse("fa7769554emshaab499374a3ea4dp179e68jsne2fbed25ad4d","skyscanner-skyscanner-flight-search-v1.p.rapidapi.com");
    private HttpApiResponse res2 = new HttpApiResponse();

    @Test
    public void testGetRapidApiResponse(){

        String results = res.getRapidApiResponse("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=London");
        assertEquals(200,res.getResponse().getStatusLine().getStatusCode());
    }

    @Test
    public void testGetApiResponse(){
        String results = res2.getApiResponse("https://maps.googleapis.com/maps/api/directions/json?origin=Brooklyn&destination=Queens&departure_time=1343641500&mode=transit&key=AIzaSyBktdACICn5zDhtfxywVJRRUuB53aE1V-I");
        assertEquals(200,res2.getResponse().getStatusLine().getStatusCode());
    }

}
