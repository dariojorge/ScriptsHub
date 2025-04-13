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

        Log.info("=== Startup configuration ===");
        config.forEach((key, value) -> {
            Log.infof("%s=%s", key, value);
        });
    }
}
