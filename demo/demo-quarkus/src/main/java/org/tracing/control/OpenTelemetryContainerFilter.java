package org.tracing.control;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.SpanContext;
import jakarta.inject.Inject;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.container.ContainerResponseContext;
import jakarta.ws.rs.container.ContainerResponseFilter;
import jakarta.ws.rs.core.MultivaluedMap;
import jakarta.ws.rs.ext.Provider;
import lombok.extern.java.Log;
import org.utils.CreateBaggage;
import org.utils.JacksonObjectMapperConfigured;
import org.tracing.entity.SpanAttributes;
import org.utils.HeaderUtils;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.text.MessageFormat;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.stream.Collectors;

import static org.tracing.entity.SpanAttributes.CONTAINER_REQUEST_BODY;
import static org.tracing.entity.SpanAttributes.CONTAINER_REQUEST_HEADERS;
import static org.tracing.entity.SpanAttributes.CONTAINER_RESPONSE_BODY;
import static org.tracing.entity.SpanAttributes.CONTAINER_RESPONSE_HEADERS;
import static org.tracing.entity.SpanAttributes.TRACE_ID_RESPONSE_HEADER;

@Provider
@Log
public class OpenTelemetryContainerFilter implements ContainerRequestFilter, ContainerResponseFilter {

    @Inject
    Span span;

    @Override
    public void filter(final ContainerRequestContext requestContext) {
        requestContext.getHeaders().put(SpanAttributes.AUTHORIZATION_HEADER, List.of("To be removed!"));
        MultivaluedMap<String, String> filteredRequestHeaders = HeaderUtils.removeSensitiveHeaders(requestContext.getHeaders());
        addHeadersToSpan(filteredRequestHeaders, CONTAINER_REQUEST_HEADERS);
        addRequestBodyToSpan(requestContext);
        CreateBaggage.createBaggage("message-data","This is a random data that im sending");
    }

    private void addHeadersToSpan(final MultivaluedMap<String, String> headers, final String spanAttribute) {
        try {
            Optional.ofNullable(headers).ifPresent(header -> span.setAttribute(spanAttribute, parseHeadersToString(header)));
        } catch (final Exception exception) {
            logError(exception, spanAttribute);
        }
    }

    private String parseHeadersToString(final MultivaluedMap<String, String> headers) {
        return headers.entrySet()
                .stream()
                .map(it -> it.getKey() + "=" + it.getValue().toString())
                .collect(Collectors.joining(", "));
    }

    private void logError(final Exception exception, final String spanAttribute) {
        LOGGER.log(Level.SEVERE, exception, () -> MessageFormat.format("Error setting span attribute = {0}", spanAttribute));
    }

    private void addRequestBodyToSpan(final ContainerRequestContext requestContext) {
        try (final InputStream inputStream = requestContext.getEntityStream()) {
            final byte[] bytes = inputStream.readAllBytes();
            requestContext.setEntityStream(new ByteArrayInputStream(bytes));
            span.setAttribute(CONTAINER_REQUEST_BODY, new String(bytes, StandardCharsets.UTF_8));
        } catch (final Exception exception) {
            logError(exception, CONTAINER_REQUEST_BODY);
        }
    }

    @Override
    public void filter(final ContainerRequestContext requestContext,
                       final ContainerResponseContext responseContext) {
        addTraceIdToResponseHeaders(responseContext);

        MultivaluedMap<String, String> filteredResponseHeaders = HeaderUtils.removeSensitiveHeaders(responseContext.getStringHeaders());
        addHeadersToSpan(filteredResponseHeaders, CONTAINER_RESPONSE_HEADERS);
        addResponseBodyToSpan(responseContext.getEntity());
    }

    private void addResponseBodyToSpan(final Object entity) {
        try {
            final ObjectMapper objectMapper = JacksonObjectMapperConfigured.getObjectMapper();
            span.setAttribute(CONTAINER_RESPONSE_BODY, objectMapper.writeValueAsString(entity));
        } catch (final Exception exception) {
            logError(exception, CONTAINER_RESPONSE_BODY);
        }
    }

    private void addTraceIdToResponseHeaders(final ContainerResponseContext responseContext) {
        Optional.ofNullable(span)
                .map(Span::getSpanContext)
                .map(SpanContext::getTraceId)
                .ifPresent(traceId -> addTraceIdToResponseHeaders(traceId, responseContext));
    }

    private void addTraceIdToResponseHeaders(final String traceId, final ContainerResponseContext responseContext) {
        Optional.ofNullable(responseContext)
                .map(ContainerResponseContext::getHeaders)
                .ifPresent(headers -> headers.putSingle(TRACE_ID_RESPONSE_HEADER, traceId));
    }
}
