package stratus.web;

import com.google.gson.Gson;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import stratus.API.*;
import stratus.DAO.Route;
import stratus.DAO.RouteDAO;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import stratus.API.HttpApiResponse;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
public class ApiController {

@Autowired
RouteDAO route;


 @GetMapping("/getairportcode/{location}")
 @ResponseBody
    public String getAirportCode(@PathVariable("location") String location){
     HttpApiResponse apires = new HttpApiResponse("fa7769554emshaab499374a3ea4dp179e68jsne2fbed25ad4d","skyscanner-skyscanner-flight-search-v1.p.rapidapi.com");
     List<String> airportCodes = AirportInformation.printLocationData(apires,location);
     String json = new Gson().toJson(airportCodes);
     System.out.println(json);
     return json;
 }



 @GetMapping("/getflight/{destinationcode}/{arrivalcode}/{destinationdate}")
 @ResponseBody
 public String getFlight(@PathVariable("destinationcode") String destinationcode, @PathVariable("arrivalcode") String arrivalcode, @PathVariable("destinationdate") String destinationdate){
  ArrayList flights = AmadeusFlightsApi.getFlightInfo(arrivalcode,destinationcode,destinationdate);
//  String destinationWeather = WeatherAPI.getWeatherByAirportCode(destinationcode);
//  String arrivalWeather = WeatherAPI.getWeatherByAirportCode(arrivalcode);
//  String createWeatherJson = "{\"destinationWeather\":"+destinationWeather + ",\"arrivalWeather\":"+arrivalWeather+"}";
  String json = flights.get(0).toString();
     System.out.println(flights.get(0));
     Date date1 = null;
     try {
         destinationdate = destinationdate.replaceAll("-","/");
         date1 = new SimpleDateFormat("yyyy/MM/dd").parse(destinationdate);
     } catch (ParseException e) {
         e.printStackTrace();
     }

     Route routeToSave = new Route(flights.get(0).toString(),flights.get(3).toString(),flights.get(6).toString(),date1,false,'f',flights.get(1).toString(),flights.get(2).toString(),flights.get(4).toString(),flights.get(5).toString(),flights.get(7).toString()," ",null);
     System.out.println(routeToSave.getEndLatitude());
     boolean toSave = route.save(routeToSave);
     System.out.println(toSave);
      //json =  json + "," + createWeatherJson ;

  return json;
 }

 @GetMapping("/getmaps/{start}/{destination}/{date}/{transportMethod}")//url
 @ResponseBody
public String getRouteFromMaps(@PathVariable("start") String start, @PathVariable("destination") String destination, @PathVariable("date")String date, @PathVariable("transportMethod")char transportMethod){
  Route routeMaps=Maps.makeRoute(start, destination, date,transportMethod);
  route.save( routeMaps );
  return routeMaps.getRouteDetails();
 }

 @GetMapping("/getcurrency/{id}")
 @ResponseBody
 public String setCurrencyAPI(@PathVariable("id") int id){
  String a= route.updateCurrency(id);
  return a;

 }

 @GetMapping("/getWeatherNow/{id}")
 @ResponseBody
 public String[] getWeatherNow(@PathVariable("id") int id){
  Route routeO=route.findRouteById(id);
  return WeatherAPI.outputWeatherNow(routeO);

 }

 @GetMapping("/getWeatherWeek/{id}/{dayDiff}")
 @ResponseBody
 public String[] getWeatherWeek(@PathVariable("id") int id,@PathVariable("dayDiff") int dayDiff){
  Route routeO=route.findRouteById(id);
  return WeatherAPI.outputWeatherWeek(routeO, dayDiff);

 }

 @GetMapping("/getWeatherFuture/{id}/{time}")
 @ResponseBody
 public String getWeatherFuture(@PathVariable("id") int id,@PathVariable("time") String time){
  Route routeO=route.findRouteById(id);
  return WeatherAPI.outputWeatherFuture(routeO, time);

 }

}
