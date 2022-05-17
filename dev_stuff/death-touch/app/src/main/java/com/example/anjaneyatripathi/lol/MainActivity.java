package com.example.anjaneyatripathi.lol;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.view.ViewDebug;
import android.widget.EditText;
import android.widget.TextView;

import java.util.Random;

public class MainActivity extends AppCompatActivity {

    private EditText age;
    private TextView wins;
    private int correct;
    private TextView loss;
    private int wrong;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        age = (EditText) findViewById(R.id.age);
        wins = (TextView) findViewById(R.id.wins);
        loss = (TextView) findViewById(R.id.loss);

        Intent intent = getIntent();
        correct = intent.getIntExtra("correct", 0);
        wrong = intent.getIntExtra("wrong", 0);

        String correctvalue = Integer.toString(correct);
        String wrongvalue = Integer.toString(wrong - correct);


        wins.setText(correctvalue);
        loss.setText(wrongvalue);
    }

    public void proceed(View view) {
        String a = age.getText().toString();
        String check = age.getText().toString().trim();
        int Attempts;
        if (check.isEmpty() || check.length() == 0 || check.equals("") || check == null || TextUtils.isEmpty(check) || "".equals(check)) {
            int Age;
            Log.i("Hello", "Hello");
            Random alternateAge = new Random();
            Age = 1 + alternateAge.nextInt(99);
            Attempts = optimum(Age);
            Intent intent = new Intent(getApplicationContext(), Main2Activity.class);
            intent.putExtra("age", Age);
            intent.putExtra("attempts", Attempts);
            intent.putExtra("correct", correct);
            intent.putExtra("wrong", wrong);
            startActivity(intent);
            age.setText("");
        }
        else {
            int Age = Integer.parseInt(a);
            if (Age < 101) {
                Attempts = optimum(Age);
                Intent intent = new Intent(getApplicationContext(), Main2Activity.class);
                intent.putExtra("age", Age);
                intent.putExtra("attempts", Attempts);
                intent.putExtra("correct", correct);
                intent.putExtra("wrong", wrong);
                startActivity(intent);
                age.setText("");
            }
            // if age is greater than 100
            else {
                Random alternateAge = new Random();
                Age = 1 + alternateAge.nextInt(99);
                Attempts = optimum(Age);
                Intent intent = new Intent(getApplicationContext(), Main2Activity.class);
                intent.putExtra("age", Age);
                intent.putExtra("attempts", Attempts);
                intent.putExtra("correct", correct);
                intent.putExtra("wrong", wrong);
                startActivity(intent);
                age.setText("");
            }
        }

    }

    private int binarySearch(int arr[], int l, int r, int x, int ans) {
        int mid = l + (r - l) / 2;
        ans++;
        if (arr[mid] == x)
            return ans;

        if (arr[mid] > x)
            return binarySearch(arr, l, mid - 1, x, ans);

        return binarySearch(arr, mid + 1, r, x, ans);
    }

    private int optimum(int age) {
        int[] arr = new int[100];
        int ans = 0;
        int i;
        for (i = 0; i < 100; i++) {
            arr[i] = i + 1;
        }
        int op = binarySearch(arr, 0, 99, age, ans);
        return op;
    }
}
