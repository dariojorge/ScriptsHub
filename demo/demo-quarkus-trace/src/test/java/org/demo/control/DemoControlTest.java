package org.demo.control;

import io.opentelemetry.api.baggage.Baggage;
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.SpanContext;
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.context.Context;
import io.opentelemetry.context.Scope;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import org.demo.entity.DemoQuarkusTraceResponse;
import org.demo.entity.MessageTypeEnum;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.mockito.MockedStatic;
import org.mockito.Mockito;

import static org.demo.entity.CommonLabels.MESSAGE_DATA_LABEL;
import static org.demo.entity.CommonLabels.TRACE_PARENT_LABEL;

@QuarkusTest
@TestInstance(TestInstance.Lifecycle.PER_METHOD)
class DemoControlTest {

    public static final String TRACE_ID_NOT_INITIALIZED = "00000000000000000000000000000000";
    @Inject
    private Tracer tracer;

    @Inject
    BaggageReader baggageReader;

    @Inject
    DemoControl demoControl;

    @Test
    void GivenMessageTypeMessageDataWhenDemoThenReturnMessageData() {
        final String messageData = "This is a random data that im sending";

        final Baggage baggage = Baggage.current()
                .toBuilder()
                .put(MESSAGE_DATA_LABEL, messageData)
                .build();

        try (final Scope scope = baggage.storeInContext(Context.current()).makeCurrent()) {
            if (scope != null) {
                addToTheSpan(MESSAGE_DATA_LABEL, messageData);
                final DemoQuarkusTraceResponse response = demoControl.demo(MessageTypeEnum.MESSAGE_DATA);

                Assertions.assertNull(baggageReader.getTraceParent());
                Assertions.assertEquals(TRACE_ID_NOT_INITIALIZED, Span.current().getSpanContext().getTraceId());
                Assertions.assertNotNull(response.getMessage());
                Assertions.assertEquals(messageData, response.getMessage());
            }
        }
    }

    @Test
    void GivenMessageTypeTraceParentWhenDemoThenReturnTraceParent() {
        final String traceParent = createTraceParent();
        final Baggage baggage = Baggage.current()
                .toBuilder()
                .put(TRACE_PARENT_LABEL, traceParent)
                .build();

        try (final Scope scope = baggage.storeInContext(Context.current()).makeCurrent()) {
            if (scope != null) {
                addToTheSpan(TRACE_PARENT_LABEL, traceParent);
                final DemoQuarkusTraceResponse response = demoControl.demo(MessageTypeEnum.TRACE_PARENT);

                Assertions.assertNull(baggageReader.getMessageData());
                Assertions.assertEquals(TRACE_ID_NOT_INITIALIZED, Span.current().getSpanContext().getTraceId());
                Assertions.assertNotNull(response.getMessage());
                Assertions.assertEquals(traceParent, response.getMessage());
            }
        }
    }

    @Test
    void GivenMessageTypeTraceIdWhenDemoThenReturnTraceId() {
        final Span span = this.tracer.spanBuilder("test-span").startSpan();

        try (MockedStatic<Span> mockedSpan = Mockito.mockStatic(Span.class)) {
            mockedSpan.when(Span::current).thenReturn(span);

            final DemoQuarkusTraceResponse response = demoControl.demo(MessageTypeEnum.TRACE_ID);

            Assertions.assertNull(baggageReader.getMessageData());
            Assertions.assertNull(baggageReader.getTraceParent());
            Assertions.assertNotNull(response.getMessage());
            Assertions.assertEquals(Span.current().getSpanContext().getTraceId(), response.getMessage());
        }
    }

    private static void addToTheSpan(final String header, final String data) {
        final Span currentSpan = Span.current();
        currentSpan.setAttribute("baggage." + header, data);
    }

    public String createTraceParent() {
        final Span span = this.tracer.spanBuilder("test-span").startSpan();
        final SpanContext spanContext = span.getSpanContext();
        final String traceId = spanContext.getTraceId();
        final String spanId = spanContext.getSpanId();
        final String traceFlags = spanContext.getTraceFlags().asHex();
        return String.format("00-%s-%s-%s", traceId, spanId, traceFlags);
    }
}