package dev.chk.BusServiceApplication.service.impl;

import dev.chk.BusServiceApplication.dto.*;
import dev.chk.BusServiceApplication.mapper.PassengerMapper;
import dev.chk.BusServiceApplication.model.Passenger;
import dev.chk.BusServiceApplication.repository.PassengerRepository;
import dev.chk.BusServiceApplication.service.NotificationService;
import dev.chk.BusServiceApplication.service.PassengerService;
import dev.chk.BusServiceApplication.util.UUIDGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static dev.chk.BusServiceApplication.constant.PassengerConstant.FAIL;
import static dev.chk.BusServiceApplication.constant.PassengerConstant.PASS;

@Service
@RequiredArgsConstructor
@Slf4j
public class PassengerServiceImpl implements PassengerService {

    private final PassengerRepository passengerRepository;
    private final PassengerMapper passengerMapper;

    private final NotificationService notificationService;

    @Override
    public ResponseDto verifyPassengersIdentity(PassengerQueryDto query) {
        List<String> passengerIdList = query.getPassengers().stream()
                .map(PassengerVerificationDto::getPassengerId).collect(Collectors.toList());
        log.info(String.format("Finding query for %s", passengerIdList));
        List<Passenger> passengers = passengerRepository
                .findByPassengerIdInAndExpireDateAfter(passengerIdList, LocalDate.now());
        log.info(String.format("%s is %s", passengerIdList, passengers.size()));
        List<PassengerQueryResponseDto> passengerQueryResponseDto;
        if (!passengers.isEmpty()) {
            passengerQueryResponseDto = passengerMapper.passengerToPassengerQueryResponseDto(passengers);
        } else {
            passengerQueryResponseDto = Collections.singletonList(
                    PassengerQueryResponseDto.builder().status(FAIL).build());
        }

        return ResponseDto.builder().passengers(passengerQueryResponseDto)
                .status("OK").timeStamp(LocalDateTime.now()).build();
    }

    public PassengerResponseDto createNewPassenger(PassengerRequestDto passengerRequestDto) {
        log.info(String.format("Creating new passenger " +
                "with passenger type %s", passengerRequestDto.getPassengerTypeCode()));
        Passenger passenger = Passenger
                .builder()
                .passengerId(UUIDGenerator.getNewUUID())
                .expireDate(getExpireDate(passengerRequestDto.getPassengerTypeCode()))
                .build();
        log.info(String.format("Saving new passenger %s " +
                "with passenger type %s", passenger.getPassengerId(),
                passengerRequestDto.getPassengerTypeCode()));
        passengerRepository.save(passenger);
        notificationService.submitNewPassenger(passenger);
        return map(passengerRequestDto, passenger);
    }

    private PassengerResponseDto map(PassengerRequestDto passengerRequestDto, Passenger passenger) {
        PassengerResponseDto passengerResponseDto = passengerMapper.passengerToPassengerResponseDto(passenger);
        passengerResponseDto.setPassengerPurchaseResult(PASS);
        passengerResponseDto.setPassengerTypeCode(passengerRequestDto.getPassengerTypeCode());
        passengerResponseDto.setTimeStamp(LocalDateTime.now());
        return passengerResponseDto;
    }

    private LocalDate getExpireDate(String passengerTypeCode) {
        return LocalDate.now().plusMonths(1);
    }

}
