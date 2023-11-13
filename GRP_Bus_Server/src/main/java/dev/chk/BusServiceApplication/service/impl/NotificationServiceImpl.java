package dev.chk.BusServiceApplication.service.impl;

import dev.chk.BusServiceApplication.dto.PassengerQueryDto;
import dev.chk.BusServiceApplication.dto.PassengerQueryResponseDto;
import dev.chk.BusServiceApplication.dto.ResponseDto;
import dev.chk.BusServiceApplication.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static dev.chk.BusServiceApplication.constant.PassengerConstant.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationServiceImpl implements NotificationService {
    private final SimpMessagingTemplate messagingTemplate;

    public ResponseDto submitPassengerAlerts(final PassengerQueryDto dto) {
        List<PassengerQueryResponseDto> passengers = new ArrayList<>();
        for (String passengerId : dto.getPassengerId()) {
            processPassenger(dto.getBus(), passengers, passengerId);
        }
        return ResponseDto.builder().passengers(passengers).status(OK).timeStamp(LocalDateTime.now()).build();
    }

    private void processPassenger(final String bus, List<PassengerQueryResponseDto> passengers, final String passengerId) {
        try {
            submitPassengerAlert(bus, passengerId);
            passengers.add(PassengerQueryResponseDto.builder()
                    .passengerId(passengerId)
                    .status(PASS)
                    .build());
        } catch (Exception ex) {
            log.error("--BUS {}--Submitting to passenger {} error due to {}", bus, passengerId, ex.getMessage());
            passengers.add(PassengerQueryResponseDto.builder()
                    .passengerId(passengerId)
                    .status(FAIL)
                    .build());
        }
    }

    private void submitPassengerAlert(final String bus, final String userId) {
        log.info("--BUS {}-- Submitting to passenger {}", bus, userId);
        PassengerQueryResponseDto user =
                PassengerQueryResponseDto.builder().bus(bus).passengerId(userId).status(OK).build();
        messagingTemplate.convertAndSendToUser(userId, TOPIC, user);
    }
}
