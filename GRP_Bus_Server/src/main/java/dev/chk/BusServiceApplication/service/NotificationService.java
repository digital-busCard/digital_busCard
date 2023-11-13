package dev.chk.BusServiceApplication.service;

import dev.chk.BusServiceApplication.dto.PassengerQueryDto;
import dev.chk.BusServiceApplication.dto.ResponseDto;

public interface NotificationService {
    ResponseDto submitPassengerAlerts(final PassengerQueryDto userId);
}
