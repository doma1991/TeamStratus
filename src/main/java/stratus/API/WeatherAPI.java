package stratus.API;

import org.json.JSONArray;
import org.json.JSONObject;
import stratus.DAO.Route;

import java.util.Arrays;
import java.util.Scanner;

public class WeatherAPI {


    private static Scanner scn;

    private static String apiKey = "fa7769554emshaab499374a3ea4dp179e68jsne2fbed25ad4d";
    private static String host = "dark-sky.p.rapidapi.com";
    private static String host2 = "airport-info.p.rapidapi.com";
    private static HttpApiResponse apiCaller = new HttpApiResponse(apiKey,host);
    private static HttpApiResponse apiCaller2 = new HttpApiResponse(apiKey,host2);

    //   TO GET THE WEATHER FOR TODAY OR THIS WEEK

    public static String getWeatherByLatLon(String lat, String lon){
        System.out.println("https://api.darksky.net/forecast/bf9f707809e17d5ff1b5d0cfc9d931f9/" + lat +","+ lon);
        return apiCaller.getApiResponse("https://api.darksky.net/forecast/bf9f707809e17d5ff1b5d0cfc9d931f9/"+ lat +","+ lon);

    }

    public static HttpApiResponse getApiCaller() {
        return apiCaller;
    }

    public static String[] outputWeatherNow(Route route){
        String string=getWeatherByLatLon(route.getEndLatitude(),route.getEndLongitude());
        JSONObject myObjectData = new JSONObject(string);
        Float temp= myObjectData.getJSONObject("currently").getFloat("temperature");

        String summary=myObjectData.getJSONObject("currently").getString("icon");
        String icon=myObjectData.getJSONObject("currently").getString("summary");
        String temps=temp.toString();

        String[] result=new String[]{temps,icon,summary};
        return result;
    }



    public static String[] outputWeatherWeek(Route route, int dayDiff){
        //dayDiff is the amount of days of difference between today and the day of interest plus 1. So if it is Monday and we want Tuesday we need to enter 2
        String string=getWeatherByLatLon(route.getEndLatitude(),route.getEndLongitude());
        JSONObject myObjectData = new JSONObject(string);
        String[] result=new String[3];

        if((0<=dayDiff)&&(dayDiff<=6)){
            Float temp =myObjectData.getJSONObject("daily").getJSONArray("data").getJSONObject(dayDiff).getFloat("temperature");
            result[0]=temp.toString();
            result[1]=myObjectData.getJSONObject("daily").getJSONArray("data").getJSONObject(dayDiff).getString("icon");
            result[2]=myObjectData.getJSONObject("daily").getJSONArray("data").getJSONObject(dayDiff).getString("summary");

            return result;
        }
        return result;
    }

//    WEATHER FOR A FURTHER DATE



    public static String outputWeatherFuture(Route route, String time){
//time can be UNIX or [YYYY]-[MM]-[DD]T[HH]:[MM]:[SS][timezone]
        String lat=route.getEndLatitude();
        String lon=route.getEndLongitude();
        String string=PrettyJSON.print(apiCaller.getRapidApiResponse("https://dark-sky.p.rapidapi.com/"+ lat +","+ lon +","+time+"?lang=en&units=auto"));
        JSONObject myObjectData = new JSONObject(string);
        String summary=myObjectData.getJSONObject("currently").getString("icon");
        return summary;
    }


    //BY AIRPORT CODE

    public static String getWeatherByAirportCode(String  latitude, String longitude){
//        double lat = latitude;
//        double lon = longitude;
//        JSONObject toGet = new JSONObject(apiCaller2.getRapidApiResponse("https://airport-info.p.rapidapi.com/airport?iata="+airportCode));
        //System.out.println(toGet);
//        lat = toGet.getDouble("latitude");
//        lon = toGet.getDouble("longitude");
        //String myData = getWeatherByLatLon(Double.toString(lat),Double.toString(lon));
        return getWeatherByLatLon(latitude,longitude);
    }



}
