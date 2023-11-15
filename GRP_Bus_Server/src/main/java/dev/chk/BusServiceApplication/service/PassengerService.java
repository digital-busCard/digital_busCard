package dev.chk.BusServiceApplication.service;

import dev.chk.BusServiceApplication.dto.*;

import java.util.List;

public interface PassengerService {
    ResponseDto verifyPassengersIdentity(PassengerQueryDto query);
    PassengerResponseDto createNewPassenger(PassengerRequestDto passengerRequestDto);
}
