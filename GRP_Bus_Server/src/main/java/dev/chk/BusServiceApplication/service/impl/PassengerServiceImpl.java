package dev.chk.BusServiceApplication.service.impl;

import dev.chk.BusServiceApplication.dto.PassengerQueryDto;
import dev.chk.BusServiceApplication.dto.PassengerQueryResponseDto;
import dev.chk.BusServiceApplication.dto.ResponseDto;
import dev.chk.BusServiceApplication.mapper.PassengerMapper;
import dev.chk.BusServiceApplication.model.Passenger;
import dev.chk.BusServiceApplication.repository.PassengerRepository;
import dev.chk.BusServiceApplication.service.PassengerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static dev.chk.BusServiceApplication.constant.PassengerConstant.FAIL;

@Service
@RequiredArgsConstructor
@Slf4j
public class PassengerServiceImpl implements PassengerService {

    private final PassengerRepository passengerRepository;
    private final PassengerMapper passengerMapper;

    @Override
    public ResponseDto verifyPassengersIdentity(PassengerQueryDto query) {
        log.info(String.format("Finding query for %s", query.getPassengerId()));
        List<Passenger> passengers = passengerRepository
                .findByPassengerIdInAndExpireDateAfter(query.getPassengerId(), LocalDate.now());
        log.info(String.format("%s is %s", query.getPassengerId(), passengers.size()));
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

}
