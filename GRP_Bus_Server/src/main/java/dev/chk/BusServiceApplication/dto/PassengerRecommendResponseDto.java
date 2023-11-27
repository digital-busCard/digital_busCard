package dev.chk.BusServiceApplication.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
@JsonAutoDetect
@NoArgsConstructor
@AllArgsConstructor
public class PassengerRecommendResponseDto {
    private String cardTypeId;
    private List<CardTypeDescription> cardTypeDescription;
    private String cardName;
    private String cardType;
    private String valid;
    private String price;
    private String isRecommended;
}
