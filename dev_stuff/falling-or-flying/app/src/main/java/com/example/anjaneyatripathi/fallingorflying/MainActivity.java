package com.example.anjaneyatripathi.fallingorflying;

import android.animation.AnimatorSet;
import android.animation.ObjectAnimator;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;

import java.util.Random;

public class MainActivity extends AppCompatActivity {

    private ImageView orange;
    private ImageView blue;
    private ImageView red;
    private ImageView green;
    private ImageView yellow;
    private ImageView purple;
    private long duration = 1200;
    private boolean x = true;
    private int posX;
    private int posY;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        orange = (ImageView) findViewById(R.id.image0);
        blue = (ImageView) findViewById(R.id.image1);
        green = (ImageView) findViewById(R.id.image2);
        red = (ImageView) findViewById(R.id.image3);
        yellow = (ImageView) findViewById(R.id.image4);
        purple = (ImageView) findViewById(R.id.image5);
    }

    public void changeGravity(View view) {

        if (x) {

            ObjectAnimator o = ObjectAnimator.ofFloat(orange, "y", 1120f);
            ObjectAnimator r = ObjectAnimator.ofFloat(red, "y", 1120f);
            ObjectAnimator b = ObjectAnimator.ofFloat(blue, "y", 1120f);
            ObjectAnimator p = ObjectAnimator.ofFloat(purple, "y", 1120f);
            ObjectAnimator g = ObjectAnimator.ofFloat(green, "y", 1120f);
            ObjectAnimator y = ObjectAnimator.ofFloat(yellow, "y", 1120f);
            o.setDuration(duration);
            y.setDuration(duration);
            r.setDuration(duration);
            g.setDuration(duration);
            p.setDuration(duration);
            b.setDuration(duration);

            AnimatorSet animatorSet = new AnimatorSet();
            animatorSet.playTogether(o, y, r ,g, b, p);
            animatorSet.start();

            x = false;
            Log.i("hello", "hello");

        }

        else {

            ObjectAnimator o = ObjectAnimator.ofFloat(orange, "y", 20f);
            ObjectAnimator r = ObjectAnimator.ofFloat(red, "y", 20f);
            ObjectAnimator b = ObjectAnimator.ofFloat(blue, "y", 20f);
            ObjectAnimator p = ObjectAnimator.ofFloat(purple, "y", 20f);
            ObjectAnimator g = ObjectAnimator.ofFloat(green, "y", 20f);
            ObjectAnimator y = ObjectAnimator.ofFloat(yellow, "y", 20f);
            o.setDuration(duration);
            y.setDuration(duration);
            r.setDuration(duration);
            g.setDuration(duration);
            p.setDuration(duration);
            b.setDuration(duration);

            AnimatorSet animatorSet = new AnimatorSet();
            animatorSet.playTogether(o, y, r ,g, b, p);
            animatorSet.start();
            Log.i("bye", "bye");

            x = true;
        }

    }

    public void generateRandom(View view) {

        blue.setVisibility(View.INVISIBLE);
        red.setVisibility(View.INVISIBLE);
        yellow.setVisibility(View.INVISIBLE);
        purple.setVisibility(View.INVISIBLE);
        orange.setVisibility(View.INVISIBLE);
        green.setVisibility(View.INVISIBLE);

            int y;

            Random color = new Random();
            y = color.nextInt(6);

            Random random = new Random();

            if (y != 0) {
                posX = random.nextInt(600);
                posY = random.nextInt(800) + 40;
                blue.setX(posX);
                blue.setY(posY);
                blue.setVisibility(View.VISIBLE);
            }

            if (y != 1) {
                posX = random.nextInt(600);
                posY = random.nextInt(800);
                red.setX(posX);
                red.setY(posY);
                red.setVisibility(View.VISIBLE);
            }

            if (y != 2) {
                posX = random.nextInt(600);
                posY = random.nextInt(800);
                yellow.setX(posX);
                yellow.setY(posY);
                yellow.setVisibility(View.VISIBLE);
            }

            if (y != 3) {
                posX = random.nextInt(600);
                posY = random.nextInt(800);
                purple.setX(posX);
                purple.setY(posY);
                purple.setVisibility(View.VISIBLE);
            }

            if (y != 4) {
                posX = random.nextInt(600);
                posY = random.nextInt(800);
                green.setX(posX);
                green.setY(posY);
                green.setVisibility(View.VISIBLE);
            }

            if (y != 5) {
                posX = random.nextInt(600);
                posY = random.nextInt(800);
                orange.setX(posX);
                orange.setY(posY);
                orange.setVisibility(View.VISIBLE);
            }
    }


}
