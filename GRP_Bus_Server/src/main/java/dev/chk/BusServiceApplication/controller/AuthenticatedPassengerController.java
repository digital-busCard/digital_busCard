package dev.chk.BusServiceApplication.controller;

import dev.chk.BusServiceApplication.dto.PassengerQueryDto;
import dev.chk.BusServiceApplication.dto.ResponseDto;
import dev.chk.BusServiceApplication.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

import static dev.chk.BusServiceApplication.constant.PassengerConstant.TOPIC;

@RestController
@RequestMapping("/api/v1")
@Slf4j
@RequiredArgsConstructor
public class AuthenticatedPassengerController {

    private final NotificationService notificationService;

    @PostMapping("/passengers")
    public ResponseDto submitNotification(@RequestBody final PassengerQueryDto message) {
        log.info("Received message {}", message);
        return notificationService.submitPassengerAlerts(message);
    }

    @MessageMapping("/passengers")
    @SendToUser(TOPIC)
    public ResponseDto submitNotification(final PassengerQueryDto message,
                                          final Principal principal) {
        log.info("From {} Received message {}", principal, message);
        return notificationService.submitPassengerAlerts(message);
    }
}
