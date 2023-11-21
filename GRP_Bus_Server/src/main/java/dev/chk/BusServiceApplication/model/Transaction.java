package dev.chk.BusServiceApplication.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "transaction_seqnum", nullable = false)
    private Long transactionSeqnum;

    private String bus;

    @ManyToOne
    @JoinColumn(name = "passenger_passenger_seqnum")
    private Passenger passengerSeqnum;

    private LocalDateTime timeStamp;


}
