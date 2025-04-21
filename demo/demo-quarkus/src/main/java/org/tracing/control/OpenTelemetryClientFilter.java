package org.tracing.control;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.SpanBuilder;
import io.opentelemetry.api.trace.SpanKind;
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.context.Context;
import io.opentelemetry.context.Scope;
import jakarta.inject.Inject;
import jakarta.ws.rs.client.ClientRequestContext;
import jakarta.ws.rs.client.ClientRequestFilter;
import jakarta.ws.rs.client.ClientResponseContext;
import jakarta.ws.rs.client.ClientResponseFilter;
import jakarta.ws.rs.core.MultivaluedMap;
import jakarta.ws.rs.ext.Provider;
import lombok.extern.java.Log;
import org.utils.JacksonObjectMapperConfigured;
import org.utils.HeaderUtils;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Objects;
import java.util.Optional;
import java.util.logging.Level;
import java.util.stream.Collectors;

import static org.tracing.entity.SpanAttributes.CLIENT_REQUEST_BODY;
import static org.tracing.entity.SpanAttributes.CLIENT_REQUEST_DATA;
import static org.tracing.entity.SpanAttributes.CLIENT_REQUEST_HEADERS;
import static org.tracing.entity.SpanAttributes.CLIENT_RESPONSE_BODY;
import static org.tracing.entity.SpanAttributes.CLIENT_RESPONSE_HEADERS;
import static org.tracing.entity.SpanAttributes.MAX_ENTITY_SIZE;

@Provider
@Log
public class OpenTelemetryClientFilter implements ClientResponseFilter, ClientRequestFilter {

    @Inject
    Tracer tracer;

    @Override
    public void filter(final ClientRequestContext requestContext, final ClientResponseContext responseContext) {
        addClientRequestData(requestContext, responseContext);
    }

    private void addClientRequestData(final ClientRequestContext requestContext, final ClientResponseContext responseContext) {
        try {
            final String spanName = buildClientSpanName(requestContext);
            final Span span = buildClientSpan(spanName);
            try (final Scope scope = span.makeCurrent()) {
                addHeadersToSpan(requestContext, responseContext, span);
                addBodiesToSpan(requestContext, responseContext, span);
            } finally {
                span.end();
            }
        } catch (final Exception exception) {
            logError(exception);
        }
    }

    private static String buildClientSpanName(final ClientRequestContext requestContext) {
        return String.join(
                " ",
                requestContext.getMethod(),
                Objects.toString(requestContext.getUri()),
                CLIENT_REQUEST_DATA
        );
    }

    private void logError(final Exception exception) {
        LOGGER.log(Level.SEVERE, exception, () -> "Error adding request data.");
    }

    private Span buildClientSpan(final String name) {
        final SpanBuilder spanBuilder = tracer.spanBuilder(name);
        spanBuilder.setParent(Context.current());
        spanBuilder.setSpanKind(SpanKind.CLIENT);
        return spanBuilder.startSpan();
    }

    private void addHeadersToSpan(final ClientRequestContext requestContext,
                                  final ClientResponseContext responseContext,
                                  final Span span) {

        MultivaluedMap<String, String> filteredRequestHeaders = HeaderUtils.removeSensitiveHeaders(requestContext.getStringHeaders());
        MultivaluedMap<String, String> filteredResponseHeaders = HeaderUtils.removeSensitiveHeaders(responseContext.getHeaders());
        addHeadersToSpan(filteredRequestHeaders, span, CLIENT_REQUEST_HEADERS);
        addHeadersToSpan(filteredResponseHeaders, span, CLIENT_RESPONSE_HEADERS);

    }

    private void addHeadersToSpan(final MultivaluedMap<String, String> headers,
                                  final Span span,
                                  final String spanAttribute) {
        Optional.ofNullable(headers).ifPresent(h -> span.setAttribute(spanAttribute, parseHeadersToString(h)));
    }

    private String parseHeadersToString(final MultivaluedMap<String, String> headers) {
        return headers.entrySet()
                .stream()
                .map(it -> it.getKey() + "=" + it.getValue().toString())
                .collect(Collectors.joining(", "));
    }


    private void addBodiesToSpan(final ClientRequestContext requestContext,
                                 final ClientResponseContext responseContext,
                                 final Span span) throws IOException {

        addRequestBodyToSpan(requestContext, span);
        addResponseBodyToSpan(responseContext, span);
    }

    private void addRequestBodyToSpan(final ClientRequestContext requestContext, final Span span) throws JsonProcessingException {
        final ObjectMapper objectMapper = JacksonObjectMapperConfigured.getObjectMapper();
        span.setAttribute(CLIENT_REQUEST_BODY, objectMapper.writeValueAsString(requestContext.getEntity()));
    }

    private void addResponseBodyToSpan(final ClientResponseContext responseContext, final Span span) throws IOException {
        final StringBuilder stringBuilder = new StringBuilder();
        if(responseContext.getEntityStream() == null) {
            return;
        }
        final InputStream inputStream = readEntity(stringBuilder, responseContext.getEntityStream());
        responseContext.setEntityStream(inputStream);
        span.setAttribute(CLIENT_RESPONSE_BODY, stringBuilder.toString());
    }

    private InputStream readEntity(final StringBuilder stringBuilder, InputStream inputStream) throws IOException {
        if (!inputStream.markSupported()) {
            inputStream = new BufferedInputStream(inputStream);
        }
        inputStream.mark(MAX_ENTITY_SIZE + 1);
        final byte[] entity = inputStream.readNBytes(MAX_ENTITY_SIZE + 1);
        stringBuilder.append(new String(entity, StandardCharsets.UTF_8));
        inputStream.reset();
        return inputStream;
    }

    @Override
    public void filter(ClientRequestContext clientRequestContext) {
        System.out.println("Nothing here yet.");
    }

}
