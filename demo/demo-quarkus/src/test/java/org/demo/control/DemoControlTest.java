package org.demo.control;

import io.quarkus.test.InjectMock;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.mockito.Mockito;

@QuarkusTest
@TestInstance(TestInstance.Lifecycle.PER_METHOD)
class DemoControlTest {

    @InjectMock
    DemoConfigs demoConfigs;

    @Inject
    DemoControl demoControl;

    @ParameterizedTest(name = "{1}")
    @CsvSource({
            "This is a message, Test first message",
            "This is another message, Test Second message"
    })
    void GivenApplicationPropertiesWhenDemoThenReturnValues(final String value, final String message) {
        Mockito.when(demoConfigs.getMessage()).thenReturn(value);

        Assertions.assertNotNull(demoControl.demo());
        Assertions.assertEquals(value, demoControl.demo().getMessage());
    }
}