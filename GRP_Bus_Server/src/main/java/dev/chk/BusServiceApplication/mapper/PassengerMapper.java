package dev.chk.BusServiceApplication.mapper;

import dev.chk.BusServiceApplication.dto.PassengerQueryResponseDto;
import dev.chk.BusServiceApplication.model.Passenger;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PassengerMapper {
    PassengerQueryResponseDto passengerToPassengerQueryResponseDto(Passenger passenger);
}
