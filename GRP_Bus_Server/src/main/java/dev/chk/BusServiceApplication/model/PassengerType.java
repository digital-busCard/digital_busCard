package dev.chk.BusServiceApplication.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PassengerType {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "passenger_type_seqnum", nullable = false)
    private Long passengerTypeSeqnum;

    private String passengerTypeName;

    private String passengerTypeValidType;

    private Integer passengerTypeValidFor;;

    private Integer passengerTypePrice;

    @OneToMany(mappedBy = "passengerTypeSeqnum")
    private List<PassengerTypeCriteria> passengerTypeCriteriaList;

}
