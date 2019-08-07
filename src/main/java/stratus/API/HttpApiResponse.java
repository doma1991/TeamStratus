package stratus.API;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

public class HttpApiResponse {

    private String apiKey;
    private String hostAddress;
    private HttpGet request;
    private HttpResponse response;

    public HttpResponse getResponse() {
        return response;
    }

    public HttpApiResponse(String apiKey, String hostAddress) {
        this.apiKey = apiKey;
        this.hostAddress = hostAddress;
    }

    public HttpApiResponse() {

    }

   public String getRapidApiResponse(String url){

        HttpClient httpClient = HttpClientBuilder.create().build();
        request = new HttpGet(url);
        request.addHeader("X-RapidAPI-Host",hostAddress);
        request.addHeader("X-RapidAPI-Key", apiKey);
        return getJson(request,httpClient).toString();
    }

    public String getApiResponse(String url){
        HttpClient httpClient = HttpClientBuilder.create().build();
        request = new HttpGet(url);
        return getJson(request,httpClient).toString();
    }

    private JSONObject getJson(HttpGet request, HttpClient httpClient){
        JSONObject toReturnJson = new JSONObject();
        try {
            response = httpClient.execute(request);
            System.out.println("Response code : "+ response.getStatusLine().getStatusCode());
            String json_string = EntityUtils.toString(response.getEntity());
            toReturnJson = new JSONObject(json_string);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.getLocalizedMessage();
        }

        return toReturnJson;
     }



}
