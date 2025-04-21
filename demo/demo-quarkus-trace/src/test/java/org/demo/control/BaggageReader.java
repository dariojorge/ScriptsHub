package org.demo.control;

import io.opentelemetry.api.baggage.Baggage;
import jakarta.enterprise.context.RequestScoped;

import static org.demo.entity.CommonLabels.MESSAGE_DATA_LABEL;
import static org.demo.entity.CommonLabels.TRACE_PARENT_LABEL;

@RequestScoped
public class BaggageReader {
    public String getMessageData() {
        return Baggage.current().getEntryValue(MESSAGE_DATA_LABEL);
    }

    public String getTraceParent() {
        return Baggage.current().getEntryValue(TRACE_PARENT_LABEL);
    }
}
