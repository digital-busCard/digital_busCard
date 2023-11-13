package dev.chk.BusServiceApplication.repository;

import dev.chk.BusServiceApplication.model.Passenger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PassengerRepository extends JpaRepository<Passenger, Long> {

    List<Passenger> findByPassengerIdInAndExpireDateAfter(List<String> passengerId, LocalDate expireDate);
}
