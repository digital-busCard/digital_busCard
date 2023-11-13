package dev.chk.BusServiceApplication.service;

import dev.chk.BusServiceApplication.dto.PassengerQueryDto;
import dev.chk.BusServiceApplication.dto.PassengerQueryResponseDto;
import dev.chk.BusServiceApplication.dto.ResponseDto;

import java.util.List;

public interface PassengerService {
    ResponseDto verifyPassengersIdentity(PassengerQueryDto query);
}
