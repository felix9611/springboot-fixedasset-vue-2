package com.fixedasset.interfaceFiles;

import io.swagger.v3.oas.annotations.media.Schema;

public class ChatGPT {
    @Schema(description = "Entry Text")
    private String enteyText;

    public String getEnteyText() {
        return enteyText;
    }

    public void setEnteyText(String enteyText) {
        this.enteyText = enteyText;
    }
}
