package org.demo.control;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.demo.entity.Demo;

@ApplicationScoped
public class DemoControl {

    @Inject
    DemoConfigs demoConfigs;

    public Demo demo() {
        return Demo.builder()
                .Message(demoConfigs.getMessage())
                .build();
    }
}
