package dev.chk.BusServiceApplication.service;

import dev.chk.BusServiceApplication.dto.PassengerQueryDto;
import dev.chk.BusServiceApplication.dto.PassengerQueryResponseDto;

public interface PassengerService {
    PassengerQueryResponseDto verifyPassengerIdentity(PassengerQueryDto query);
}
