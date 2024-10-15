package com.fixedasset.common.lang;

import lombok.Data;

import java.io.Serializable;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * Encapsulate result data
 */
@Data
public class Result implements Serializable {

    @Schema(description = "HTTP Response Code")
    private int code;

    @Schema(description = "HTTP Response Message")
    private String msg;

    @Schema(description = "HTTP Response Data")
    private Object data;

    public static Result succ(Object data) {
        return succ(200, "Successful", data);
    }

    public static Result succ(int code, String msg, Object data) {
        Result r = new Result();
        r.setCode(code);
        r.setMsg(msg);
        r.setData(data);
        return r;
    }

    public static Result fail(String msg) {
        return fail(400, msg, null);
    }

    public static Result fail(int code, String msg, Object data) {
        Result r = new Result();
        r.setCode(code);
        r.setMsg(msg);
        r.setData(data);
        return r;
    }

}
