package org.demo.control;

import io.quarkus.logging.Log;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import jakarta.enterprise.event.Startup;
import lombok.Getter;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import java.util.Map;
import java.util.TreeMap;

@Getter
@ApplicationScoped
public class DemoConfigs {

    public static final String DEMO_MESSAGE_LABEL = "demo.message";

    @ConfigProperty(name = DEMO_MESSAGE_LABEL)
    private String message;

    void logConfigAtStartup(@Observes Startup event) {

        Map<String, Object> config = new TreeMap<>();
        config.put(DEMO_MESSAGE_LABEL, message);

        Log.info("=== Startup configuration ===");
        config.forEach((key, value) -> {
            Log.infof("%s=%s", key, value);
        });
    }
}
