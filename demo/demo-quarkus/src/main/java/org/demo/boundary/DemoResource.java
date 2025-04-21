package org.demo.boundary;

import jakarta.annotation.security.PermitAll;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import lombok.RequiredArgsConstructor;
import org.demo.control.DemoControl;
import org.demo.entity.Demo;

@RequiredArgsConstructor(onConstructor = @__(@Inject))
@Path("/demo")
public class DemoResource {

    private final DemoControl demoControl;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @PermitAll
    public Demo demo() {
        return demoControl.demo();
    }
}
