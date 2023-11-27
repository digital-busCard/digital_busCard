package dev.chk.BusServiceApplication.controller;

import dev.chk.BusServiceApplication.dto.*;
import dev.chk.BusServiceApplication.service.PassengerService;
import dev.chk.BusServiceApplication.service.PassengerTypeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

import static dev.chk.BusServiceApplication.constant.PassengerConstant.TOPIC_NEW_PASSENGER;
import static dev.chk.BusServiceApplication.constant.PassengerConstant.TOPIC_VERIFIED_PASSENGER;

@RestController
@RequestMapping("/api/v1")
@Slf4j
@RequiredArgsConstructor
public class AuthenticatedPassengerController {

    private final PassengerService passengerService;
    private final PassengerTypeService passengerTypeService;

    @PostMapping("/passengers")
    public ResponseDto submitNotification(@RequestBody final PassengerQueryDto message) {
        log.info("Received message {}", message);
        return passengerService.submitPassengerAlert(message);
    }

    @MessageMapping("/passengers")
    @SendToUser(TOPIC_VERIFIED_PASSENGER)
    public ResponseDto submitNotification(final PassengerQueryDto message,
                                          final Principal principal) {
        log.info("From {} Received message {}", principal, message);
        return passengerService.submitPassengerAlert(message);
    }

    @MessageMapping("/new-passenger")
    @SendTo(TOPIC_NEW_PASSENGER)
    public PassengerResponseDto submitNewPassengerInfo(final PassengerRequestDto message) {
        log.info("Received message {}", message);
        return passengerService.createNewPassenger(message);
    }

    @PostMapping("/new-passenger")
    public PassengerResponseDto createPassenger(final PassengerRequestDto message) {
        log.info("Received message {}", message);
        return passengerService.createNewPassenger(message);
    }

    @PostMapping("/recommend")
    public List<PassengerRecommendResponseDto> getRecommendCard(@RequestBody final PassengerRecommendDto message) {
        log.info("Received message {}", message);
        return passengerTypeService.getRecommendedPassenger(message.getCode());
    }

    @GetMapping("/cards")
    public List<PassengerTypeResponseDto> getRecommendCard() {
        return passengerTypeService.getPassengerTypeCriteria();
    }
}
