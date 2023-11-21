package dev.chk.BusServiceApplication.service;

import dev.chk.BusServiceApplication.dto.PassengerQueryDto;
import dev.chk.BusServiceApplication.dto.PassengerQueryResponseDto;
import dev.chk.BusServiceApplication.model.Passenger;

public interface NotificationService {
    Integer submitPassengerAlert(final PassengerQueryDto passengerQueryDto, final PassengerQueryResponseDto passengerQueryResponseDto);
    void submitNewPassenger(final Passenger dto);
}
