package org.tracing.boundary;

import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import lombok.RequiredArgsConstructor;
import org.tracing.control.TraceControl;
import org.tracing.entity.MessageTypeEnum;

@RequiredArgsConstructor(onConstructor = @__(@Inject))
@Path("/trace")
public class TraceResource {

    private final TraceControl traceControl;

    @GET
    //@RolesAllowed({"user", "admin"})
    @Path("/tracing")
    @Produces(MediaType.APPLICATION_JSON)
    public String trace(@QueryParam("message-type") MessageTypeEnum messageType) {
        return traceControl.trace(messageType);
    }
}
