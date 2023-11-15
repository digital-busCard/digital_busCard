package dev.chk.BusServiceApplication.service;

import dev.chk.BusServiceApplication.dto.PassengerQueryDto;
import dev.chk.BusServiceApplication.dto.ResponseDto;
import dev.chk.BusServiceApplication.model.Passenger;

public interface NotificationService {
    ResponseDto submitPassengerAlerts(final PassengerQueryDto userId);
    void submitNewPassenger(final Passenger dto);
}
