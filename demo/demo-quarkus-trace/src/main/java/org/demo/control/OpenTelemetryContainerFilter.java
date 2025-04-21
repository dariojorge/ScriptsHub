package org.demo.control;

import io.opentelemetry.api.trace.Span;
import jakarta.inject.Inject;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.MultivaluedMap;
import jakarta.ws.rs.ext.Provider;
import lombok.extern.java.Log;

import java.text.MessageFormat;
import java.util.Optional;
import java.util.logging.Level;
import java.util.stream.Collectors;

import static org.demo.entity.CommonLabels.CONTAINER_REQUEST_HEADERS;

@Provider
@Log
public class OpenTelemetryContainerFilter implements ContainerRequestFilter {

    @Inject
    Span span;

    @Override
    public void filter(final ContainerRequestContext requestContext) {
        addHeadersToSpan(requestContext.getHeaders());
    }

    private void addHeadersToSpan(final MultivaluedMap<String, String> headers) {
        try {
            Optional.ofNullable(headers).ifPresent(header -> span.setAttribute(CONTAINER_REQUEST_HEADERS, parseHeadersToString(header)));
        } catch (final Exception exception) {
            logError(exception, CONTAINER_REQUEST_HEADERS);
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
}