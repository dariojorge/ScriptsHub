package org.demo.control;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.enterprise.event.Startup;
import lombok.Data;
import lombok.extern.java.Log;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.logging.Level;

@ApplicationScoped
@Data
@Log
public class DemoConfigs {

    public static final String DEMO_MESSAGE_01_LABEL = "demo.message01";
    public static final String DEMO_MESSAGE_02_LABEL = "demo.message02";
    public static final String DEMO_MESSAGE_03_LABEL = "demo.message03";

    @ConfigProperty(name = DEMO_MESSAGE_01_LABEL)
    private String message01;

    @ConfigProperty(name = DEMO_MESSAGE_02_LABEL)
    private String message02;

    @ConfigProperty(name = DEMO_MESSAGE_03_LABEL)
    private String message03;

    void logConfigAtStartup(@Observes Startup event) {

        Map<String, Object> config = new TreeMap<>();
        config.put(DEMO_MESSAGE_01_LABEL, message01);
        config.put(DEMO_MESSAGE_02_LABEL, message02);
        config.put(DEMO_MESSAGE_03_LABEL, message03);

        LOGGER.log(Level.INFO, "=== Startup Demo configuration ===");
        config.forEach((key, value) -> LOGGER.log(Level.INFO, "{0}={1}", List.of(key, value)));
    }
}
