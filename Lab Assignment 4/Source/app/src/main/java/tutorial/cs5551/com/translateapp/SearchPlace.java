package tutorial.cs5551.com.translateapp;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class SearchPlace extends AppCompatActivity {

    String API_URL = "https://api.fullcontact.com/v2/person.json?";
    String API_KEY = "aszt5ofexupwbn81tw5llaaz";
    String sourceText;
    TextView outputTextView;
    Context mContext;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_translate);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        outputTextView = (TextView) findViewById(R.id.txt_Result);
    }
    public void logout(View v) {
        Intent redirect = new Intent(SearchPlace.this, LoginActivity.class);
        startActivity(redirect);
    }
    public void translateText(View v) {
        TextView sourceTextView = (TextView) findViewById(R.id.txt_Email);

        sourceText = sourceTextView.getText().toString();
        System.out.println(sourceText);
        String getURL ="http://api.datafinder.com/qdf.php?service=zip5&&d_zip="+sourceText+"&k2=aszt5ofexupwbn81tw5llaaz";//The API service URL
        System.out.println(getURL);
        final String response1 = "";
        OkHttpClient client = new OkHttpClient();
        try {

            Request request = new Request.Builder()
                    .url(getURL)
                    .build();
            System.out.println(request);
            client.newCall(request).enqueue(new Callback() {

                @Override
                public void onFailure(Call call, IOException e) {
                    System.out.println(e.getMessage());

                }
                @Override
                public void onResponse(Call call, Response response) throws IOException {
                    System.out.println("1");
                    final JSONObject jsonResult;
                    final String results = response.body().string();
                    System.out.print("working");
                    System.out.print(results);
                    try {
                      jsonResult = new JSONObject(results);
                        JSONArray convertedTextArray = jsonResult.getJSONObject("datafinder").getJSONArray("results");
                        System.out.print(convertedTextArray);
                        final String convertedText = convertedTextArray.getJSONObject(0).getString("City");
                        System.out.print(convertedText);
                        Log.d("okHttp", jsonResult.toString());
                        runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                outputTextView.setText(convertedText);
                            }
                        });
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    System.out.println("2");}
            });


        } catch (Exception ex) {
            outputTextView.setText(ex.getMessage());

        }

    }
}
