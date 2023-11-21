package dev.chk.BusServiceApplication.service;

import dev.chk.BusServiceApplication.dto.PassengerQueryDto;
import dev.chk.BusServiceApplication.dto.PassengerRequestDto;
import dev.chk.BusServiceApplication.dto.PassengerResponseDto;
import dev.chk.BusServiceApplication.dto.ResponseDto;

public interface PassengerNotificationService {
    Integer getLatestPassengerNum(String bus);

    void addLatestPassenger(String bus);
}
