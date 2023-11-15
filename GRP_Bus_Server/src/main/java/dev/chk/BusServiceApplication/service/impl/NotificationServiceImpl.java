package dev.chk.BusServiceApplication.service.impl;

import dev.chk.BusServiceApplication.dto.PassengerQueryDto;
import dev.chk.BusServiceApplication.dto.PassengerQueryResponseDto;
import dev.chk.BusServiceApplication.dto.PassengerVerificationDto;
import dev.chk.BusServiceApplication.dto.ResponseDto;
import dev.chk.BusServiceApplication.model.Passenger;
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
        for (PassengerVerificationDto passenger : dto.getPassengers()) {
            processPassenger(dto.getBus(), passengers, passenger);
        }
        return ResponseDto.builder().passengers(passengers).status(OK).timeStamp(LocalDateTime.now()).build();
    }

    private void processPassenger(final String bus, List<PassengerQueryResponseDto> passengers, final PassengerVerificationDto passenger) {
        try {
            submitPassengerAlert(bus, passenger);
            passengers.add(PassengerQueryResponseDto.builder()
                    .passengerId(passenger.getPassengerId())
                    .status(PASS)
                    .build());
        } catch (Exception ex) {
            log.error("--BUS {}--Submitting to passenger {} error due to {}", bus, passenger.getPassengerId(), ex.getMessage());
            passengers.add(PassengerQueryResponseDto.builder()
                    .passengerId(passenger.getPassengerId())
                    .status(FAIL)
                    .build());
        }
    }

    private void submitPassengerAlert(final String bus, final PassengerVerificationDto passenger) {
        log.info("--BUS {}-- Submitting to passenger {}", bus, passenger.getPassengerId());
        PassengerQueryResponseDto user =
                PassengerQueryResponseDto.builder()
                        .bus(bus)
                        .verification(passenger.getVerification())
                        .passengerId(passenger.getPassengerId()).status(OK).build();
        messagingTemplate.convertAndSendToUser(passenger.getPassengerId(), TOPIC_VERIFIED_PASSENGER, user);
    }

    public void submitNewPassenger(final Passenger dto) {
        log.info("Sharing new passenger detail {}", dto.getPassengerId());
        messagingTemplate.convertAndSend(TOPIC_NEW_PASSENGER, dto);
    }
}
