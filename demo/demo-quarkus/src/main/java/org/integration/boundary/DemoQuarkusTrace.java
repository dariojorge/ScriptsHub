package org.integration.boundary;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import org.integration.entity.DemoQuarkusTraceResponse;
import org.tracing.entity.MessageTypeEnum;

@Path("/demo-quarkus-trace")
@RegisterRestClient(configKey = "demo-quarkus-trace")
public interface DemoQuarkusTrace {

    @GET
    @Path("/demo")
    @Produces(MediaType.APPLICATION_JSON)
    DemoQuarkusTraceResponse getDemoTrace(@QueryParam("message-type") MessageTypeEnum messageType);
}
