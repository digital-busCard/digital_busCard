package dev.chk.BusServiceApplication.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;
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
public class PassengerRecommendDto {
    private List<String> code;
}
