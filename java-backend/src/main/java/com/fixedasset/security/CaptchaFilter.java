package com.fixedasset.security;

import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.fixedasset.common.exception.CaptchaException;
import com.fixedasset.common.lang.Const;
import com.fixedasset.utils.RedisUtil;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CaptchaFilter extends OncePerRequestFilter {

    @Autowired
    RedisUtil redisUtil;

    @Autowired
    LoginFailureHandler loginFailureHandler;


    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {

        String url = httpServletRequest.getRequestURI();

        if(url.equals("/login") && httpServletRequest.getMethod().equals("POST")) {
            // Verify verification code 
            try { 
                validate(httpServletRequest);
            } catch (CaptchaException e) {
                // If not correct, jump to the authentication failure handler 
                loginFailureHandler.onAuthenticationFailure(httpServletRequest, httpServletResponse, e);
            }
        }

        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

    private void validate(HttpServletRequest httpServletRequest) {
        String code = httpServletRequest.getParameter("code");
        String key = httpServletRequest.getParameter("token");

        if(StringUtils.isBlank(code) || StringUtils.isBlank(key)) {
            throw new CaptchaException("Verification code failure");
        }

        if(!code.equals(redisUtil.hget(Const.CAPTCHA_KEY, key))) {
            throw new CaptchaException("Verification code failure");
        }

        // invalid 
        redisUtil.hdel(Const.CAPTCHA_KEY, key);

    }
}
