package dev.chk.BusServiceApplication.mapper;

import dev.chk.BusServiceApplication.dto.PassengerQueryResponseDto;
import dev.chk.BusServiceApplication.dto.PassengerResponseDto;
import dev.chk.BusServiceApplication.model.Passenger;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PassengerMapper {
    @Mapping(target = "status", constant = "PASS")
    PassengerQueryResponseDto passengerToPassengerQueryResponseDto(Passenger passenger);
    List<PassengerQueryResponseDto> passengerToPassengerQueryResponseDto(List<Passenger> passenger);

    PassengerResponseDto passengerToPassengerResponseDto(Passenger passenger);
}
