package dev.chk.BusServiceApplication.service.impl;

import dev.chk.BusServiceApplication.dto.PassengerQueryDto;
import dev.chk.BusServiceApplication.dto.PassengerQueryResponseDto;
import dev.chk.BusServiceApplication.mapper.PassengerMapper;
import dev.chk.BusServiceApplication.model.Passenger;
import dev.chk.BusServiceApplication.repository.PassengerRepository;
import dev.chk.BusServiceApplication.service.PassengerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

import static dev.chk.BusServiceApplication.constant.PassengerConstant.FAIL;
import static dev.chk.BusServiceApplication.constant.PassengerConstant.PASS;

@Service
@RequiredArgsConstructor
@Slf4j
public class PassengerServiceImpl implements PassengerService {

    private final PassengerRepository passengerRepository;
    private final PassengerMapper passengerMapper;

    @Override
    public PassengerQueryResponseDto verifyPassengerIdentity(PassengerQueryDto query) {
        log.info(String.format("Finding query for %s", query.getPassengerId()));
        Optional<Passenger> passenger = passengerRepository
                .findByPassengerIdAndExpireDateAfter(query.getPassengerId(), LocalDate.now());
        log.info(String.format("%s is %s", query.getPassengerId(), passenger.isPresent()));
        PassengerQueryResponseDto passengerQueryResponseDto;
        if (passenger.isPresent()) {
            passengerQueryResponseDto = passengerMapper.passengerToPassengerQueryResponseDto(passenger.get());
            passengerQueryResponseDto.setStatus(PASS);
        } else {
            passengerQueryResponseDto = PassengerQueryResponseDto.builder().status(FAIL).build();
        }

        return passengerQueryResponseDto;
    }
}
