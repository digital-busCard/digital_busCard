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
public class PassengerQueryDto {
    private List<String> passengerId;
    private String bus;
}
