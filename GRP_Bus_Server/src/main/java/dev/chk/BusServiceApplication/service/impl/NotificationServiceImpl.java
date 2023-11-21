package dev.chk.BusServiceApplication.service.impl;

import dev.chk.BusServiceApplication.dto.PassengerQueryDto;
import dev.chk.BusServiceApplication.dto.PassengerQueryResponseDto;
import dev.chk.BusServiceApplication.model.Passenger;
import dev.chk.BusServiceApplication.service.NotificationService;
import dev.chk.BusServiceApplication.service.PassengerNotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import static dev.chk.BusServiceApplication.constant.PassengerConstant.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationServiceImpl implements NotificationService {
    private final SimpMessagingTemplate messagingTemplate;

    private final PassengerNotificationService passengerNotificationService;

    public Integer submitPassengerAlert(final PassengerQueryDto passengerQueryDto, PassengerQueryResponseDto passenger) {
        log.info("--BUS {}-- Submitting to Kiosk", passengerQueryDto.getBus());
        int verification = passengerNotificationService.getLatestPassengerNum(passengerQueryDto.getBus());
        PassengerQueryResponseDto user =
                PassengerQueryResponseDto.builder()
                        .bus(passengerQueryDto.getBus())
                        .verification(String.valueOf(verification))
                        .expireDate(String.valueOf(passenger.getExpireDate()))
                        .passengerId(passenger.getPassengerId()).status(OK).build();
        submitMessage(passengerQueryDto.getBus(), TOPIC_VERIFIED_PASSENGER, user);
        passengerNotificationService.addLatestPassenger(passengerQueryDto.getBus());
        return verification;
    }

    @Async
    private void submitMessage(String bus, String topic, PassengerQueryResponseDto user) {
        messagingTemplate.convertAndSendToUser(bus, topic, user);
    }

    public void submitNewPassenger(final Passenger dto) {
        log.info("Sharing new passenger detail {}", dto.getPassengerId());
        messagingTemplate.convertAndSend(TOPIC_NEW_PASSENGER, dto);
    }
}
