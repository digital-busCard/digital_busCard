package dev.chk.BusServiceApplication.repository;

import dev.chk.BusServiceApplication.model.PassengerType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PassengerTypeRepository extends JpaRepository<PassengerType, Long> {

}
