package dev.chk.BusServiceApplication.controller;

import dev.chk.BusServiceApplication.dto.PassengerQueryDto;
import dev.chk.BusServiceApplication.dto.PassengerQueryResponseDto;
import dev.chk.BusServiceApplication.dto.ResponseDto;
import dev.chk.BusServiceApplication.service.PassengerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@Slf4j
@RequiredArgsConstructor
public class PassengerController {

    private final PassengerService passengerService;

    @PostMapping(path = "/passenger")
    public ResponseDto verifyPassenger(@RequestBody PassengerQueryDto passengerQueryDto) {
        return passengerService.verifyPassengersIdentity(passengerQueryDto);
    }
}
