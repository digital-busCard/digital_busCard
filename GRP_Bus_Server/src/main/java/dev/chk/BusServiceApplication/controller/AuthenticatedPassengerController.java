package dev.chk.BusServiceApplication.controller;

import dev.chk.BusServiceApplication.dto.PassengerQueryDto;
import dev.chk.BusServiceApplication.dto.PassengerRequestDto;
import dev.chk.BusServiceApplication.dto.PassengerResponseDto;
import dev.chk.BusServiceApplication.dto.ResponseDto;
import dev.chk.BusServiceApplication.service.NotificationService;
import dev.chk.BusServiceApplication.service.PassengerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

import static dev.chk.BusServiceApplication.constant.PassengerConstant.TOPIC_NEW_PASSENGER;
import static dev.chk.BusServiceApplication.constant.PassengerConstant.TOPIC_VERIFIED_PASSENGER;

@RestController
@RequestMapping("/api/v1")
@Slf4j
@RequiredArgsConstructor
public class AuthenticatedPassengerController {

    private final NotificationService notificationService;

    private final PassengerService passengerService;

    @PostMapping("/passengers")
    public ResponseDto submitNotification(@RequestBody final PassengerQueryDto message) {
        log.info("Received message {}", message);
        return notificationService.submitPassengerAlerts(message);
    }

    @MessageMapping("/passengers")
    @SendToUser(TOPIC_VERIFIED_PASSENGER)
    public ResponseDto submitNotification(final PassengerQueryDto message,
                                          final Principal principal) {
        log.info("From {} Received message {}", principal, message);
        return notificationService.submitPassengerAlerts(message);
    }

    @MessageMapping("/new-passenger")
    @SendTo(TOPIC_NEW_PASSENGER)
    public PassengerResponseDto submitNewPassengerInfo(final PassengerRequestDto message) {
        log.info("Received message {}", message);
        return passengerService.createNewPassenger(message);
    }
}
