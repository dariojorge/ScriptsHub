package org.demo.control;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import lombok.RequiredArgsConstructor;
import org.demo.entity.Demo;

@RequiredArgsConstructor(onConstructor = @__(@Inject))
@ApplicationScoped
public class DemoControl {

    private final DemoConfigs demoConfigs;

    public Demo demo() {
        return DemoBuildMessageMapper.buildMessage(demoConfigs);
    }
}
