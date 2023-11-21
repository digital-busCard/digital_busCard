package dev.chk.BusServiceApplication.service;

import dev.chk.BusServiceApplication.dto.*;

public interface PassengerService {

    ResponseDto submitPassengerAlert(final PassengerQueryDto dto);
    ResponseDto verifyPassengersIdentity(String id);
    PassengerResponseDto createNewPassenger(PassengerRequestDto passengerRequestDto);
}
