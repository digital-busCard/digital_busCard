package dev.chk.BusServiceApplication.service.impl;

import dev.chk.BusServiceApplication.dto.*;
import dev.chk.BusServiceApplication.mapper.PassengerMapper;
import dev.chk.BusServiceApplication.model.Passenger;
import dev.chk.BusServiceApplication.model.PassengerType;
import dev.chk.BusServiceApplication.repository.PassengerRepository;
import dev.chk.BusServiceApplication.service.NotificationService;
import dev.chk.BusServiceApplication.service.PassengerService;
import dev.chk.BusServiceApplication.service.PassengerTypeService;
import dev.chk.BusServiceApplication.util.UUIDGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static dev.chk.BusServiceApplication.constant.PassengerConstant.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class PassengerServiceImpl implements PassengerService {

    private final PassengerRepository passengerRepository;

    private final PassengerTypeService passengerTypeService;
    private final PassengerMapper passengerMapper;
    private final NotificationService notificationService;

    @Override
    @Cacheable(value = "passenger", key = "#id")
    public ResponseDto verifyPassengersIdentity(String id) {
        log.info(String.format("Finding query for %s", id));
        Optional<Passenger> passenger = passengerRepository
                .findByPassengerIdAndExpireDateAfter(id, LocalDate.now());
        PassengerQueryResponseDto passengerQueryResponseDto;
        if (passenger.isPresent()) {
            log.info(String.format("Found passenger for %s", id));
            passengerQueryResponseDto = passengerMapper.passengerToPassengerQueryResponseDto(passenger.get());
        } else {
            log.info(String.format("No passenger for %s", id));
            passengerQueryResponseDto =
                    PassengerQueryResponseDto.builder().status(FAIL).build();
        }
        return ResponseDto.builder().passenger(passengerQueryResponseDto)
                .status("OK").timeStamp(LocalDateTime.now()).build();
    }

    public ResponseDto submitPassengerAlert(final PassengerQueryDto dto) {
        PassengerQueryResponseDto passengerQueryResponseDto = processPassenger(dto);
        return ResponseDto.builder().passenger(passengerQueryResponseDto).status(OK).timeStamp(LocalDateTime.now()).build();
    }

    private PassengerQueryResponseDto processPassenger(PassengerQueryDto dto) {
        ResponseDto responseDto = verifyPassengersIdentity(dto.getPassenger());
        if (!FAIL.equals(responseDto.getPassenger().getStatus())) {
            try {
                Integer verification = notificationService.submitPassengerAlert(dto, responseDto.getPassenger());
                return PassengerQueryResponseDto.builder().passengerId(dto.getPassenger())
                        .expireDate(responseDto.getPassenger().getExpireDate())
                        .verification(String.valueOf(verification))
                        .bus(dto.getBus())
                        .status(PASS)
                        .build();
            } catch (Exception ex) {
                log.error("--BUS {}-- Submitting to Kiosk error due to {}", dto.getBus(), ex.getMessage());
                return PassengerQueryResponseDto.builder()
                        .passengerId(dto.getPassenger())
                        .bus(dto.getBus())
                        .status(FAIL)
                        .build();
            }
        }
        log.error("--BUS {}-- Verification failed for {}", dto.getBus(), dto.getPassenger());
        return PassengerQueryResponseDto.builder()
                .passengerId(dto.getPassenger())
                .status(FAIL)
                .build();
    }

    @Override
    public PassengerResponseDto createNewPassenger(PassengerRequestDto passengerRequestDto) {
        log.info(String.format("Creating new passenger " +
                "with passenger type %s", passengerRequestDto.getPassengerTypeCode()));
        Passenger passenger = Passenger
                .builder()
                .passengerId(UUIDGenerator.getNewUUID())
                .expireDate(getExpireDate(passengerRequestDto.getValidFrom(), passengerRequestDto.getPassengerTypeCode()))
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

    private LocalDate getExpireDate(String validFrom, String passengerTypeCode) {
        PassengerType passengerType = passengerTypeService
                .getPassengerType(Long.parseLong(passengerTypeCode));
        LocalDate transformedDate = LocalDate
                .of(Integer.parseInt(validFrom.split("/")[2]),
                        Integer.parseInt(validFrom.split("/")[1]),
                        Integer.parseInt(validFrom.split("/")[0]));
        return transformedDate.plusDays(passengerType.getPassengerTypeValidFor());
    }
}
