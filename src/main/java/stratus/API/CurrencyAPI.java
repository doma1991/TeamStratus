package stratus.API;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;

public class CurrencyAPI {

    private static Scanner scn;
    private static String host = "airport-info.p.rapidapi.com";
    private static String host2 = "cometari-airportsfinder-v1.p.rapidapi.com";
    private static String apiKey = "fa7769554emshaab499374a3ea4dp179e68jsne2fbed25ad4d";
    private static HttpApiResponse apiCaller = new HttpApiResponse(apiKey, host);
    private static Map<String,String> countryCurrencyMap = getCountryCode();


    private static String getRate()  {


        String endpoint = "latest";
        String access_key = "712b605881d34412b51d25d365875eb8";

// get the most recent exchange rates via the "latest" endpoint:


        HttpApiResponse har =new HttpApiResponse();
        String jsonString= har.getRapidApiResponse("http://data.fixer.io/api/" + endpoint + "?access_key=" + access_key);

        return PrettyJSON.print(jsonString);
    }

    public static void printTheRate(String string, String country){

        JSONObject myObjectData = new JSONObject(string);
        JSONObject rates= myObjectData.getJSONObject("rates");
        Float UK =rates.getFloat("GBP");


        Float countryC =rates.getFloat(country);

        System.out.println("currency rate for GBP to "+country+" is: " + (countryC/UK));

    }

    private static Map<String,String> getCountryCode(){
        BufferedReader br = null;
        TreeMap<String,String> map = new TreeMap<String, String>();
        try {
            br = new BufferedReader(new FileReader("/Users/nal33/IdeaProjects/TeamStratusCurrent/src/main/java/stratus/tableconvert_2019-07-25_154141.csv"));
            String line =  null;
            while((line=br.readLine())!=null){
                String arr[] = line.split(",");
                map.put(arr[1].replaceAll(" ",""), arr[3].replaceAll(" ",""));
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return map;
    }

    public static String currencyByCountry(String country){
       return countryCurrencyMap.get(country);
    }
    private static void getCurrencyByAirportCode(String airportCode){
        JSONObject toGet = new JSONObject(apiCaller.getRapidApiResponse("https://airport-info.p.rapidapi.com/airport?iata="+airportCode));
        String countryCode = toGet.getString("country_iso");
        String toPass = countryCurrencyMap.get(countryCode);
        String string=getRate();
        printTheRate(string, toPass);
    }

    private static void getCurrencyByCity(String city) {
        try {
            HttpResponse<JsonNode> response = Unirest.get("https://cometari-airportsfinder-v1.p.rapidapi.com/api/airports/by-text?text="+city)
                    .header("X-RapidAPI-Host", "cometari-airportsfinder-v1.p.rapidapi.com")
                    .header("X-RapidAPI-Key", "fa7769554emshaab499374a3ea4dp179e68jsne2fbed25ad4d")
                    .asJson();
            JSONArray arr = new JSONArray(response.getBody().toString());
            String countryCode = arr.getJSONObject(0).getString("countryCode");
            String toPass = countryCurrencyMap.get(countryCode);
            String string=getRate();
            printTheRate(string, toPass);


        } catch (UnirestException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args)  {


        scn = new Scanner(System.in);
        System.out.println("Please enter the Airport code of the currency you would like to view");
        String toPass = scn.next();
//        toPass = countryCurrencyMap.get(toPass);
//        String string=getRate();
//        printTheRate(string, toPass);
        //.getCurrencyByAirportCode(toPass);
        getCurrencyByCity(toPass);

    }
//"GBP": 0.895936,    "USD": 1.11557, "EUR": 1,

    // (1*(desired currency/GBP currency)

}



