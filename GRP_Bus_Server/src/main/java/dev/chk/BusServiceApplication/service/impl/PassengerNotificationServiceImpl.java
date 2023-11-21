package dev.chk.BusServiceApplication.service.impl;

import dev.chk.BusServiceApplication.model.PassengerNotification;
import dev.chk.BusServiceApplication.repository.PassengerNotificationRepository;
import dev.chk.BusServiceApplication.service.PassengerNotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class PassengerNotificationServiceImpl implements PassengerNotificationService {

    private final PassengerNotificationRepository passengerNotificationRepository;

    private static final Map<String, Integer> busNotifications = new HashMap<>();

    @Override
    public Integer getLatestPassengerNum(String bus) {
        if (busNotifications.containsKey(bus)) {
            busNotifications.replace(bus, busNotifications.get(bus) + 1);
        } else {
            busNotifications.put(bus, 1);
        }
        return busNotifications.get(bus);
    }

    @Override
    @Async
    public void addLatestPassenger(String bus) {
        Optional<PassengerNotification> passengerNotification = passengerNotificationRepository.findByBus(bus);
        if (passengerNotification.isPresent()) {
            PassengerNotification toUpdatePassengerNotification = passengerNotification.get();
            toUpdatePassengerNotification.setLastNum(busNotifications.get(bus));
            save(toUpdatePassengerNotification);
        } else {
            log.error("New Bus Received {}", bus);
            save(PassengerNotification.builder().bus(bus).lastNum(0).build());
        }
    }

    @Async
    private void save(PassengerNotification passengerNotification) {
        passengerNotificationRepository.save(passengerNotification);
    }
}
