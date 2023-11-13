package dev.chk.BusServiceApplication.websocket;

import com.sun.security.auth.UserPrincipal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.security.Principal;
import java.util.Map;

@Slf4j
public class UserHandshake extends DefaultHandshakeHandler {

    @Override
    protected Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler, Map<String, Object> attributes) {
        String userToken = request.getURI().getQuery().split("=")[1];
        log.info("User with ID '{}' opened the page", userToken);
        return new UserPrincipal(userToken);
    }
}
