package dev.chk.BusServiceApplication.controller;

import dev.chk.BusServiceApplication.dto.PassengerQueryDto;
import dev.chk.BusServiceApplication.dto.PassengerQueryResponseDto;
import dev.chk.BusServiceApplication.dto.ResponseDto;
import dev.chk.BusServiceApplication.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@Slf4j
@RequiredArgsConstructor
public class AuthenticatedPassengerController {

    private final NotificationService notificationService;

    @PostMapping("/passengers")
    public ResponseDto sendPrivateMessage(@RequestBody final PassengerQueryDto message) {
        log.info("Received message {}", message);
        return notificationService.submitPassengerAlerts(message);
    }
}
