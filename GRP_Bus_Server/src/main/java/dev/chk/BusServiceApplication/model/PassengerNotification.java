package dev.chk.BusServiceApplication.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PassengerNotification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "passenger_notification_seqnum", nullable = false)
    private Long passengerNotificationSeqnum;

    private String bus;

    private Integer lastNum;

}
