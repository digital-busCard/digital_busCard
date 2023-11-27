package dev.chk.BusServiceApplication.repository;

import dev.chk.BusServiceApplication.model.PassengerType;
import dev.chk.BusServiceApplication.model.PassengerTypeCriteria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PassengerTypeCriteriaRepository extends JpaRepository<PassengerTypeCriteria, Long> {

}
