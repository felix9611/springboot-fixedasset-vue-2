package com.fixedasset;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Scanner;

public class test {
    public static void main(String args[]) throws Exception {
        read("D:\\LOCALHOSTjava\\ImageFileIO\\digit0.pgm");
    }

    public static void read(String filename) throws Exception{

        Path path = Paths.get(filename);
        /*** Students' work here ***/
        //creating File instance to reference text file in Java
        File new_File = new File(String.valueOf(path));
        //Creating Scanner instance to read File in Java
        Scanner file_text= new Scanner(new_File);
        String header = file_text.next();

        int width = 0;
        int height = 0;
        int maxValue = 0;
        if (header.equals("P2")) {
            width = file_text.nextInt();
            height = file_text.nextInt();
            maxValue = file_text.nextInt();

            System.out.println("width: "+ width);
            System.out.println("height: "+ height);
            System.out.println("maxValue: "+ maxValue);

            StringBuilder sb = new StringBuilder();

            while (file_text.hasNext()) {
                sb.append(file_text.next()); //now original string is changed
                String pixels = sb + "/n";
                System.out.println(pixels);
                //sb.insert(i, "/n");
                for(int i=0; i<sb.length();i++) {
                    if (i % width == 0) {
                        System.out.println("TT: "+ i * 2);
                    }
                }

                /* for (int i = height*width ; i < height*width ; i++){
                    System.out.println(file_text.next());
                    sb.append(file_text.next()); //now original string is changed
                    String pixels = sb.toString();
                    System.out.println(pixels);
                } */
            }

        } else {
            throw new Exception("Invalid header");
        }
        //System.out.println(header);
      /*
      public void read(String filename) throws Exception
    {
        /*** Students' work here ***//*
        //creating File instance to reference text file in Java
        File new_File = new File(filename);
        //Creating Scanner instance to read File in Java
        Scanner file_text= new Scanner(new_File);
        String header;
        header= file_text.next();
        //System.out.println(header);
        if (header.equals("P2")) {

        } else {
            throw new Exception("Invalid header");

        }
        width = file_text.nextInt();
        height = file_text.nextInt();
        maxValue = file_text.nextInt();
        //System.out.println(width);
        //System.out.println(height);
        //System.out.println(maxValue);
        while (file_text.hasNext()) {


            StringBuilder sb = new StringBuilder();

            for (int i = height*width ; i < height*width ; i++){

                sb.append(file_text.next()); //now original string is changed
                pixels = sb.toString();
                System.out.println(pixels);
            }
            /**for(int i=0; i<sb.length();i++){
             if (i %width==0){
             sb.insert(i,"/n");
             }*/
        // file_text.close();
        System.out.println("Read " + filename + " with header " + header + " of image size " + width + "x" + height);
    }

        // System.out.println("Read " + filename + " with header " + header + " of image size " + width + "x" + height);
      // file_text.close();
       // System.out.println("Read " + filename + " with header " + header + " of image size " + width + "x" + height);


}
