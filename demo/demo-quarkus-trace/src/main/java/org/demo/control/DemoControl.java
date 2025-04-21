package org.demo.control;

import io.opentelemetry.api.baggage.Baggage;
import io.opentelemetry.api.trace.Span;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.demo.entity.DemoQuarkusTraceResponse;
import org.demo.entity.MessageTypeEnum;

import java.util.logging.Level;

import static org.demo.entity.CommonLabels.MESSAGE_DATA_LABEL;
import static org.demo.entity.CommonLabels.TRACE_PARENT_LABEL;

@RequiredArgsConstructor(onConstructor = @__(@Inject))
@ApplicationScoped
@Log
public class DemoControl {

    public DemoQuarkusTraceResponse demo(final MessageTypeEnum messageType) {
        return getResponseType(messageType);
    }

    private DemoQuarkusTraceResponse getResponseType(final MessageTypeEnum messageType) {
        final Span current = Span.current();

        final String traceId = current.getSpanContext().getTraceId();
        LOGGER.log(Level.INFO, "Received Trade ID: {0}", traceId);

        final String messageDataFromBaggage = getMessageDataFromBaggage();
        LOGGER.log(Level.INFO, "Received Message Data: {0}", messageDataFromBaggage);

        final String traceParent = getTraceParent();
        LOGGER.log(Level.INFO, "Received TraceParent: {0}", traceParent);

        return switch (messageType) {
            case MESSAGE_DATA -> getDemoQuarkusTraceResponse(messageDataFromBaggage);
            case TRACE_ID -> getDemoQuarkusTraceResponse(traceId);
            case TRACE_PARENT -> getDemoQuarkusTraceResponse(traceParent);
            case NONE -> getDemoQuarkusTraceResponse("");
        };
    }

    private static DemoQuarkusTraceResponse getDemoQuarkusTraceResponse(final String message) {
        return DemoQuarkusTraceResponse.builder().message(message).build();
    }

    private String getMessageDataFromBaggage() {
        final Baggage baggage = Baggage.current();
        return baggage.getEntryValue(MESSAGE_DATA_LABEL);
    }

    private String getTraceParent() {
        //final Span current = Span.current();
        return "Dunno yet";
    }
}
