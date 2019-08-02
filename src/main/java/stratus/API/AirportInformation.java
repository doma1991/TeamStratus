package stratus.API;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class AirportInformation {

    static String apiKey = "fa7769554emshaab499374a3ea4dp179e68jsne2fbed25ad4d";

    /**
     * This static method returns a list containing the locations of airports dependant on the string argument
     * @param resP A HttpResponse object that will do the Get request
     * @param localInput A String that will be used for the query
     * @return A List of airport codes and names
     */
    public static List<String> printLocationData(HttpApiResponse resP, String localInput){
        ArrayList<String> listOfAirports = new ArrayList<>();
        String url = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query="+localInput;
        JSONObject objToReturn = new JSONObject(resP.getRapidApiResponse(url));
        JSONArray arr = objToReturn.getJSONArray("Places");
        for (int i = 0; i < arr.length() ; i++) {
            String code = arr.getJSONObject(i).getString("PlaceId");
            String nameAirport = arr.getJSONObject(i).getString("PlaceName");
            code = code.substring(0,code.length()-4);
            listOfAirports.add(code+","+nameAirport);
        }
        return listOfAirports;
    }

    /**
     * A method that resturns the airports longitude and latitude based on the airport code
     * @param airportCode A String of the airport code that you want to return the information
     * @return A string containing the longitude and latitude
     */
    public static String getLongLatofAirport(String airportCode){
        HttpApiResponse apiCaller = new HttpApiResponse(apiKey, "airport-info.p.rapidapi.com");
        JSONObject toGet = new JSONObject(apiCaller.getRapidApiResponse("https://airport-info.p.rapidapi.com/airport?iata="+airportCode));
        String longLat = toGet.getDouble("longitude") + "," + toGet.getDouble("latitude") + ","+toGet.getString("name");
        return longLat;
    }



}