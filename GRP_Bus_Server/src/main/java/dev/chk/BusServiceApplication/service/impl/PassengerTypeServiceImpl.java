package dev.chk.BusServiceApplication.service.impl;

import dev.chk.BusServiceApplication.dto.CardTypeDescription;
import dev.chk.BusServiceApplication.dto.PassengerRecommendResponseDto;
import dev.chk.BusServiceApplication.dto.PassengerTypeResponseDto;
import dev.chk.BusServiceApplication.mapper.PassengerMapper;
import dev.chk.BusServiceApplication.mapper.PassengerTypeMapper;
import dev.chk.BusServiceApplication.model.PassengerType;
import dev.chk.BusServiceApplication.model.PassengerTypeCriteria;
import dev.chk.BusServiceApplication.repository.PassengerTypeCriteriaRepository;
import dev.chk.BusServiceApplication.repository.PassengerTypeRepository;
import dev.chk.BusServiceApplication.service.PassengerTypeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static java.lang.Integer.parseInt;

@Service
@RequiredArgsConstructor
@Slf4j
public class PassengerTypeServiceImpl implements PassengerTypeService {

    private final PassengerTypeRepository passengerTypeRepository;

    private final PassengerTypeCriteriaRepository passengerTypeCriteriaRepository;
    private final PassengerTypeMapper passengerTypeMapper;

    public List<PassengerType> getAllPassengerType() {
        return passengerTypeRepository.findAll();
    }

    public PassengerType getPassengerType(Long passengerTypeSeqnum) {
        return passengerTypeRepository.findById(passengerTypeSeqnum).get();
    }

    public List<PassengerRecommendResponseDto> getRecommendedPassenger(List<String> passengerTypeDescriptionCodeList) {
        List<PassengerType> allPassengerTypeList = getAllPassengerType();
        List<PassengerRecommendResponseDto> recommendedPassengerList =
                passengerTypeMapper.passengerTypeToPassengerRecommendResponseDto(allPassengerTypeList);
        return  recommendedPassengerList.stream().map(item -> {
            String isRecommended = "true";
            for (CardTypeDescription criteria : item.getCardTypeDescription()) {
                log.info("Comparing given criteria: {} with server: {}", passengerTypeDescriptionCodeList, criteria);
                if (criteria != null &&
                        !passengerTypeDescriptionCodeList.contains(criteria.getCode())) {
                    isRecommended = "false";
                    break;
                }
            }
            item.setIsRecommended(isRecommended);
            return item;
        }).collect(Collectors.toList()).stream().sorted((a, b) -> {
            if (a.getIsRecommended().equals("true") && b.getIsRecommended().equals("true")) {
                return parseInt(b.getValid()) - parseInt(a.getValid());
            } else if (a.getIsRecommended().equals("true")) {
                return -1;
            } else {
                return 1;
            }
        }).collect(Collectors.toList());
    }

    public List<PassengerTypeResponseDto> getPassengerTypeCriteria() {
        List<PassengerTypeCriteria> passengerTypeCriteriaList = passengerTypeCriteriaRepository.findAll();
        return passengerTypeCriteriaList.stream().map((item) ->
                PassengerTypeResponseDto.builder()
                        .label(item.getPassengerTypeDescription())
                        .value(item.getPassengerTypeDescriptionCode()).build()
        ).distinct().collect(Collectors.toList());
    }

}
