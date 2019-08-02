package stratus.API;

import com.amadeus.Amadeus;
import com.amadeus.Params;
import com.amadeus.exceptions.ResponseException;
import com.amadeus.resources.FlightOffer;
import com.google.gson.*;

import java.util.ArrayList;
import java.util.Arrays;


public class AmadeusFlightsApi {

    /**
     * A method that takes the search queries and returns the flight information
     * @param originAirport A string containing the airport code of the starting airport
     * @param destinationAirport A string containing the airport code of the Destination airport
     * @param departureDate A String containing the date of the departure date
     * @return An array list containing the flight information
     */
    public static ArrayList<String> getFlightInfo(String originAirport,String destinationAirport,String departureDate){
        Amadeus amadeus = Amadeus.builder("4RbapAA123sW9QVA0PDHwnRkA9LVWO4u", "IIBYdRnZoRnVNED7").build();
        ArrayList<String> items = new ArrayList<>();
        try {
            ArrayList<String> toPass = new ArrayList<>();
            FlightOffer[] flightOffers = amadeus.shopping.flightOffers
                    .get(Params.with("origin", originAirport).and("destination", destinationAirport).and("departureDate", departureDate).and("max", "1"));
            JsonObject gson = flightOffers[0].getResponse().getResult();
            JsonObject flightName = gson.getAsJsonObject("dictionaries");
            JsonObject carrierName = flightName.getAsJsonObject("carriers");
             String airlineName = carrierName.get("SV").getAsString();
            toPass.add(airlineName);
            for (FlightOffer flightOffer : flightOffers) {
                FlightOffer.OfferItem[] itemsToGet = flightOffer.getOfferItems();
                for (FlightOffer.OfferItem offerItem : itemsToGet) {
                    toPass.add(Double.toString(offerItem.getPrice().getTotal()));
                    for (int k = 0; k < offerItem.getServices().length; k++) {
                        ArrayList<String> durationToPass = new ArrayList<>();
                        for (int l = 0; l < offerItem.getServices()[k].getSegments().length; l++) {
                            FlightOffer.Segment segment = offerItem.getServices()[k].getSegments()[l];
                            durationToPass.add(segment.getFlightSegment().getDuration());
                            if (l == 0) {
                                durationToPass.add(segment.getFlightSegment().getDeparture().getAt());
                            }
                            if (l == offerItem.getServices()[k].getSegments().length - 1) {
                                durationToPass.add(segment.getFlightSegment().getArrival().getAt());
                            }
                        }
                        toPass.add(durationToPass.toString());
                    }
                }
            }
            System.out.println(toPass.toString());
            String longLatOrigin = AirportInformation.getLongLatofAirport(originAirport);
            String longLatDestination = AirportInformation.getLongLatofAirport(destinationAirport);
            String[] originInfo = longLatOrigin.split(",");
            String[] destinationInfo = longLatDestination.split(",");
            items.add(toPass.toString());
            items.addAll(Arrays.asList(originInfo));
            items.addAll(Arrays.asList(destinationInfo));
            String countryCode = Maps.getCountryCode(destinationInfo[0],destinationInfo[1]);
            String currencyCode = CurrencyAPI.currencyByCountry(countryCode);
            items.add(currencyCode);
        } catch (ResponseException e) {
            e.printStackTrace();
        }
        return items;
    }
}
