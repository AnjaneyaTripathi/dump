package com.example.anjaneyatripathi.lol;

import android.content.Intent;
import android.graphics.Color;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;

public class Main2Activity extends AppCompatActivity {

    private EditText guess;
    private TextView result;
    private TextView status;
    private int age;
    private int attempts;
    private int correct;
    private int wrong;
    private int diff;
    private LinearLayout layout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main2);

        Intent intent = getIntent();
        age = intent.getIntExtra("age", 0);
        attempts = intent.getIntExtra("attempts", 1);
        correct = intent.getIntExtra("correct", 0);
        wrong = intent.getIntExtra("wrong", 0);

        guess = (EditText) findViewById(R.id.guess);
        result = (TextView) findViewById(R.id.result);
        layout = (LinearLayout) findViewById(R.id.layout);
        status = (TextView) findViewById(R.id.status);

    }

    public void check(View view) {

        String message = "Enter a number!";
        String chances;
        String Guess = guess.getText().toString();
        String check = guess.getText().toString().trim();

        if (check.isEmpty() || check.length() == 0 || check.equals("") || check == null || TextUtils.isEmpty(check) || "".equals(check)) {
            guess.setText("");
            Log.i("Hello", "Hello");
        }
        else {
            int g = Integer.parseInt(Guess);
            if (attempts > 0) {
                if (age == g) {
                    message = "Woah, you've got the death touch!";
                    diff = 0;
                    attempts = 1;
                    layout.setBackgroundColor(Color.parseColor("#00FF00"));
                    correct++;
                } else {
                    message = "Oof! You're wrong my child!";
                    diff = java.lang.Math.abs(age - g);
                    //indicating too high or low
                    if (age > g) {
                        message = message + " Don't kill him too soon.";
                    } else {
                        message = message + " He's overstaying...";
                    }
                    //altering background color
                    if (diff < 10) {
                        layout.setBackgroundColor(Color.parseColor("#33FF00"));
                    } else if (diff < 20) {
                        layout.setBackgroundColor(Color.parseColor("#66FF00"));
                    } else if (diff < 30) {
                        layout.setBackgroundColor(Color.parseColor("#99FF00"));
                    } else if (diff < 40) {
                        layout.setBackgroundColor(Color.parseColor("#CCFF00"));
                    } else if (diff < 50) {
                        layout.setBackgroundColor(Color.parseColor("#FFFF00"));
                    } else if (diff < 60) {
                        layout.setBackgroundColor(Color.parseColor("#FFCC00"));
                    } else if (diff < 70) {
                        layout.setBackgroundColor(Color.parseColor("#FF9900"));
                    } else if (diff < 80) {
                        layout.setBackgroundColor(Color.parseColor("#FF6600"));
                    } else if (diff < 90) {
                        layout.setBackgroundColor(Color.parseColor("#FF3300"));
                    } else {
                        layout.setBackgroundColor(Color.parseColor("#FF0000"));
                    }
                }
            }
            //reset the editText, display the result and decrement the number of tries
            result.setText(message);
            guess.setText("");
            attempts--;
            chances = "You have " + attempts + " chances left!";
            status.setText(chances);

            if (attempts == 0) {

                Handler handler = new Handler();
                handler.postDelayed(displayRunnable, 1000);
                wrong++;
            }
        }
    }


    private Runnable displayRunnable = new Runnable() {
        @Override
        public void run() {
            changePage();
        }
    };

    public void changePage() {
        Intent intent = new Intent(getApplicationContext(), MainActivity.class);
        intent.putExtra("correct", correct);
        intent.putExtra("wrong", wrong);
        startActivity(intent);
    }

}
