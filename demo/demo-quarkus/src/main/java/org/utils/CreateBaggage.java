package org.utils;

import io.opentelemetry.api.baggage.Baggage;
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.context.Context;
import io.opentelemetry.context.Scope;

import static org.utils.CommonLabels.BAGGAGE_PREFIX;

public final class CreateBaggage {

    public static void createBaggage(final String header, final String data) {
        final Baggage baggage = Baggage.current()
                .toBuilder()
                .put(header, data)
                .build();

        baggage.storeInContext(Context.current()).makeCurrent();
        addToTheSpan(header, data);
    }

    private static void addToTheSpan(final String header, final String data) {
        final Span currentSpan = Span.current();
        currentSpan.setAttribute(BAGGAGE_PREFIX + header, data);
    }
}
