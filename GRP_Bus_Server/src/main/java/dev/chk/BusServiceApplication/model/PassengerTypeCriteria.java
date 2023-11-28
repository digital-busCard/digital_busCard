package dev.chk.BusServiceApplication.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PassengerTypeCriteria {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "passenger_type_seqnum", nullable = false)
    private Long passengerTypeCriteriaSeqnum;

    private String passengerTypeDescriptionCode;
    @ManyToOne
    @JoinColumn(name = "passenger_type_seqnum", insertable = false, updatable = false)
    private PassengerType passengerTypeSeqnum;

    private String passengerTypeDescription;

}
