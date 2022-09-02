package com.example.anjaneyatripathi.bmicalculator;

import android.content.Context;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    float bmi;
    private EditText height;
    private EditText weight;
    private TextView finalBMI;
    private Handler handler = new Handler();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        height = (EditText) findViewById(R.id.height);
        weight = (EditText) findViewById(R.id.weight);
        finalBMI = (TextView) findViewById(R.id.finalBMI);
    }

    public void calculate(View view) {

        Context context = getApplicationContext();
        CharSequence text = "Calculating...";
        int duration = Toast.LENGTH_SHORT;

        Toast toast = Toast.makeText(context, text, duration);
        toast.show();

        //converting to string type

        String h = height.getText().toString();
        String w = weight.getText().toString();

        //parsing to float
        //ensuring h or w isn't empty or pointing to null

        if(h != null && !"".equals(h) && w != null && !"".equals(w)) {
            float H = Float.parseFloat(h) / 100;
            float W = Float.parseFloat(w);

            bmi = W / (H * H);

            handler.postDelayed(displayRunnable, 3000);
        }
    }

    private Runnable displayRunnable = new Runnable() {
        @Override
        public void run() {
            display(bmi);
        }
    };

    private void display(float bmi) {
        String message = "";

        if(bmi<18f) {
            message = "Underweight! Grab a Hulk-Burger fast!";
        }
        else if(bmi>25f) {
            message = "Oof! You better get moving there! How about a trip to Asgard?";
        }
        else {
            message = "You have proved yourself a worthy Asgardian!";
        }
        message = bmi + "\n\n" + message;
        finalBMI.setText(message);
    }
}
