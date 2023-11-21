package dev.chk.BusServiceApplication.repository;

import dev.chk.BusServiceApplication.model.PassengerNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PassengerNotificationRepository extends JpaRepository<PassengerNotification, Long> {

    Optional<PassengerNotification> findByBus(String bus);
}
