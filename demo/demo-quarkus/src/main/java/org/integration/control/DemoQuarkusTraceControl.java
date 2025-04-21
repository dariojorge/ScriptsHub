package org.integration.control;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.integration.boundary.DemoQuarkusTrace;
import org.integration.entity.DemoQuarkusTraceResponse;
import org.tracing.entity.MessageTypeEnum;

@ApplicationScoped
public class DemoQuarkusTraceControl {

    private final DemoQuarkusTrace demoQuarkusTrace;

    public DemoQuarkusTraceControl(@RestClient final DemoQuarkusTrace demoQuarkusTrace) {
        this.demoQuarkusTrace = demoQuarkusTrace;
    }

    public DemoQuarkusTraceResponse getMessage(final MessageTypeEnum messageType) {
        return demoQuarkusTrace.getDemoTrace(messageType);
    }
}
