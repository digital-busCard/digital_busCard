package dev.chk.BusServiceApplication.configuration;

import dev.chk.BusServiceApplication.websocket.UserHandshake;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.HandshakeInterceptor;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(final MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic");
        registry.setApplicationDestinationPrefixes("/ws");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/stream")
                .setAllowedOriginPatterns("*")
                .setHandshakeHandler(new UserHandshake());
        registry.addEndpoint("/stream")
                .setAllowedOriginPatterns("*")
                .setHandshakeHandler(new UserHandshake())
                .withSockJS();
    }
}
