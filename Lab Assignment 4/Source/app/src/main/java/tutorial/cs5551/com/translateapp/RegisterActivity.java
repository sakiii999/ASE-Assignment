package tutorial.cs5551.com.translateapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

public class RegisterActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
    }
    public void goLogin(View v)
    {
        Intent redirect = new Intent(RegisterActivity.this, LoginActivity.class);
        startActivity(redirect);
    }
}
