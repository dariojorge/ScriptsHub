package org.tracing.entity;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public enum MessageTypeEnum {
    MESSAGE_DATA("MESSAGE_DATA"),
    TRACE_ID("TRACE_ID"),
    TRACE_PARENT("TRACE_PARENT"),
    NONE("NONE");

    private final String value;

    @Override
    @JsonValue
    public String toString() {
        return value;
    }
}