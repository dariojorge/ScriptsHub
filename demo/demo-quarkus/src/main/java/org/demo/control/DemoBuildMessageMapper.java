package org.demo.control;

import jakarta.enterprise.context.ApplicationScoped;
import org.demo.entity.Demo;

@ApplicationScoped
public final class DemoBuildMessageMapper {

    public static Demo buildMessage(final DemoConfigs demoConfigs) {
        return Demo.builder()
                .Message01(demoConfigs.getMessage01())
                .Message02(demoConfigs.getMessage02())
                .Message03(demoConfigs.getMessage03())
                .build();
    }
}
