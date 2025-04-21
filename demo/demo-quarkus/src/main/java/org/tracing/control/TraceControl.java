package org.tracing.control;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import lombok.RequiredArgsConstructor;
import org.demo.control.DemoBuildMessageMapper;
import org.demo.control.DemoConfigs;
import org.demo.entity.Demo;
import org.integration.control.DemoQuarkusTraceControl;
import org.integration.entity.DemoQuarkusTraceResponse;
import org.tracing.entity.MessageTypeEnum;

@RequiredArgsConstructor(onConstructor = @__(@Inject))
@ApplicationScoped
public class TraceControl {

    @Inject
    DemoQuarkusTraceControl demoQuarkusTraceControl;

    public String trace(final MessageTypeEnum messageType) {
        final DemoQuarkusTraceResponse demoQuarkusTraceControlMessage = demoQuarkusTraceControl.getMessage(messageType);
        return demoQuarkusTraceControlMessage.getMessage();
    }
}
