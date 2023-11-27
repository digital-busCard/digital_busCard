package dev.chk.BusServiceApplication.service;

import dev.chk.BusServiceApplication.dto.PassengerRecommendResponseDto;
import dev.chk.BusServiceApplication.dto.PassengerTypeResponseDto;
import dev.chk.BusServiceApplication.model.PassengerType;

import java.util.List;

public interface PassengerTypeService {

    List<PassengerType> getAllPassengerType();
    PassengerType getPassengerType(Long passengerTypeSeqnum);

    List<PassengerRecommendResponseDto> getRecommendedPassenger(List<String> passengerTypeDescriptionCodeList);

    List<PassengerTypeResponseDto> getPassengerTypeCriteria();
}
