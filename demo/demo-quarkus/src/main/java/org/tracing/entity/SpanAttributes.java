package org.tracing.entity;

import java.util.List;

public class SpanAttributes {
    public static final String CLIENT_REQUEST_HEADERS = "http.client-request.headers";
    public static final String CLIENT_REQUEST_BODY = "http.client-request.body";
    public static final String CLIENT_RESPONSE_HEADERS = "http.client-response.headers";
    public static final String CLIENT_RESPONSE_BODY = "http.client-response.body";

    public static final String CONTAINER_REQUEST_HEADERS = "http.request.headers";
    public static final String CONTAINER_REQUEST_BODY = "http.request.body";
    public static final String CONTAINER_RESPONSE_HEADERS = "http.response.headers";
    public static final String CONTAINER_RESPONSE_BODY = "http.response.body";

    public static final String CLIENT_REQUEST_DATA = "Client Request Data";
    public static final int MAX_ENTITY_SIZE = 1024 * 1024;
    public static final String TRACE_ID_RESPONSE_HEADER = "Trace-Id";

    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static List<String> HEADERS_TO_FILTER = List.of(AUTHORIZATION_HEADER);
}
