package dev.chk.BusServiceApplication.mapper;

import dev.chk.BusServiceApplication.dto.PassengerQueryResponseDto;
import dev.chk.BusServiceApplication.model.Passenger;
import java.time.format.DateTimeFormatter;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-10-10T00:41:11-0600",
    comments = "version: 1.5.5.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.4.1.jar, environment: Java 11.0.15 (Eclipse Adoptium)"
)
@Component
public class PassengerMapperImpl implements PassengerMapper {

    @Override
    public PassengerQueryResponseDto passengerToPassengerQueryResponseDto(Passenger passenger) {
        if ( passenger == null ) {
            return null;
        }

        PassengerQueryResponseDto.PassengerQueryResponseDtoBuilder passengerQueryResponseDto = PassengerQueryResponseDto.builder();

        passengerQueryResponseDto.passengerId( passenger.getPassengerId() );
        if ( passenger.getExpireDate() != null ) {
            passengerQueryResponseDto.expireDate( DateTimeFormatter.ISO_LOCAL_DATE.format( passenger.getExpireDate() ) );
        }

        return passengerQueryResponseDto.build();
    }
}
