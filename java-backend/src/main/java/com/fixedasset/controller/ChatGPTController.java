package com.fixedasset.controller;

import com.fixedasset.common.lang.Result;
import com.fixedasset.entity.CodeType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Array;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import org.json.JSONObject;

import com.fixedasset.interfaceFiles.*;

@RestController
@RequestMapping("/chatGPT")
public class ChatGPTController {

    @PostMapping("/chat/text")
    public Result textChat(@RequestBody ChatGPT chatGPT) throws IOException {

        String url = "https://api.openai.com/v1/completions";
        HttpURLConnection con = (HttpURLConnection) new URL(url).openConnection();

        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/json");
        con.setRequestProperty("Authorization", "");



        JSONObject message = new JSONObject();
        message.put("role","user");
        message.put("content",chatGPT.getEnteyText());



        JSONObject data = new JSONObject();
        data.put("model", "gpt-3.5-turbo");
        data.put("prompt", chatGPT.getEnteyText());
        data.put("max_tokens", 4000);
        data.put("temperature", 1.0);



        con.setDoOutput(true);
        con.getOutputStream().write(data.toString().getBytes());

        String output = new BufferedReader(new InputStreamReader(con.getInputStream())).lines()
                .reduce((a, b) -> a + b).get();
        return Result.succ(new JSONObject(output).getJSONArray("choices").getJSONObject(0).getString("text"));
    }

}
