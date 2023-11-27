package dev.chk.BusServiceApplication.mapper;

import dev.chk.BusServiceApplication.dto.CardTypeDescription;
import dev.chk.BusServiceApplication.dto.PassengerQueryResponseDto;
import dev.chk.BusServiceApplication.dto.PassengerRecommendResponseDto;
import dev.chk.BusServiceApplication.dto.PassengerResponseDto;
import dev.chk.BusServiceApplication.model.Passenger;
import dev.chk.BusServiceApplication.model.PassengerType;
import dev.chk.BusServiceApplication.model.PassengerTypeCriteria;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PassengerTypeMapper {
    @Mapping(target = "cardTypeId", source = "passengerTypeSeqnum")
    @Mapping(target = "cardTypeDescription", source = "passengerTypeCriteriaList")
    @Mapping(target = "cardName", source = "passengerTypeName")
    @Mapping(target = "cardType", source = "passengerTypeValidType")
    @Mapping(target = "valid", source = "passengerTypeValidFor")
    @Mapping(target = "price", source = "passengerTypePrice")
    @Mapping(target = "isRecommended", constant = "false")
    PassengerRecommendResponseDto passengerTypeToPassengerRecommendResponseDto(PassengerType passengerType);
    List<PassengerRecommendResponseDto> passengerTypeToPassengerRecommendResponseDto(List<PassengerType> passengerType);

    @Mapping(target = "code", source = "passengerTypeDescriptionCode")
    @Mapping(target = "description", source = "passengerTypeDescription")
    CardTypeDescription passengerTypeCriteriaToCardTypeDescription(PassengerTypeCriteria passengerTypeCriteria);


    List<CardTypeDescription> passengerTypeCriteriaToCardTypeDescriptionList(List<PassengerTypeCriteria> passengerTypeCriteria);

}
