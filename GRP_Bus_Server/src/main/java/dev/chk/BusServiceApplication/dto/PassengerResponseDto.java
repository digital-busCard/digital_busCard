package dev.chk.BusServiceApplication.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Data
@JsonAutoDetect
@NoArgsConstructor
@AllArgsConstructor
public class PassengerResponseDto {
    private String passengerTypeCode;
    private String passengerPurchaseResult;
    private String passengerId;
    private String expireDate;
    private LocalDateTime timeStamp;
}
