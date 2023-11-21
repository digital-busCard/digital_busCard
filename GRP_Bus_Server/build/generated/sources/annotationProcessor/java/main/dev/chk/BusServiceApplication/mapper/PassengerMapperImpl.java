package dev.chk.BusServiceApplication.mapper;

import dev.chk.BusServiceApplication.dto.PassengerQueryResponseDto;
import dev.chk.BusServiceApplication.dto.PassengerResponseDto;
import dev.chk.BusServiceApplication.model.Passenger;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-11-20T18:04:15-0600",
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

        passengerQueryResponseDto.status( "PASS" );

        return passengerQueryResponseDto.build();
    }

    @Override
    public List<PassengerQueryResponseDto> passengerToPassengerQueryResponseDto(List<Passenger> passenger) {
        if ( passenger == null ) {
            return null;
        }

        List<PassengerQueryResponseDto> list = new ArrayList<PassengerQueryResponseDto>( passenger.size() );
        for ( Passenger passenger1 : passenger ) {
            list.add( passengerToPassengerQueryResponseDto( passenger1 ) );
        }

        return list;
    }

    @Override
    public PassengerResponseDto passengerToPassengerResponseDto(Passenger passenger) {
        if ( passenger == null ) {
            return null;
        }

        PassengerResponseDto.PassengerResponseDtoBuilder passengerResponseDto = PassengerResponseDto.builder();

        passengerResponseDto.passengerId( passenger.getPassengerId() );
        if ( passenger.getExpireDate() != null ) {
            passengerResponseDto.expireDate( DateTimeFormatter.ISO_LOCAL_DATE.format( passenger.getExpireDate() ) );
        }

        return passengerResponseDto.build();
    }
}
