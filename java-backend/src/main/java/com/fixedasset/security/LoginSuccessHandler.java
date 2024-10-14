package com.fixedasset.security;

import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.fixedasset.common.lang.Result;
import com.fixedasset.entity.SysUser;
import com.fixedasset.service.SysUserService;
import com.fixedasset.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

	@Autowired
	JwtUtils jwtUtils;

	@Resource private SysUserService service;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
		response.setContentType("application/json;charset=UTF-8");
		ServletOutputStream outputStream = response.getOutputStream();

		SysUser sysUser = service.getByUsername(authentication.getName());
		
		String jwt = jwtUtils.generateToken(sysUser);
		// response.setHeader(jwtUtils.getHeader(), jwt);
		JSONObject loginResult = new JSONObject();
		loginResult.putOnce("token", jwt);

		Result result = Result.succ(loginResult);

		outputStream.write(JSONUtil.toJsonStr(result).getBytes("UTF-8"));

		outputStream.flush();
		outputStream.close();
	}

}
