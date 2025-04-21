package org.utils;

import jakarta.ws.rs.core.MultivaluedHashMap;
import jakarta.ws.rs.core.MultivaluedMap;
import org.tracing.entity.SpanAttributes;

public final class HeaderUtils {

    public static MultivaluedMap<String, String> removeSensitiveHeaders(final MultivaluedMap<String, String> headers) {
        if(headers == null) {
            return new MultivaluedHashMap<>();
        }

        final MultivaluedMap<String, String> filteredHeaders = new MultivaluedHashMap<>(headers);
        filteredHeaders.keySet().removeIf(key -> SpanAttributes.HEADERS_TO_FILTER.stream().anyMatch(header -> header.equals(key)));
        return filteredHeaders;
    }
}
