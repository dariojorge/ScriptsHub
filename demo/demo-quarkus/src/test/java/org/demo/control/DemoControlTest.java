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

    @ParameterizedTest(name = "{3}")
    @CsvSource({
            "This is a message01, This is a message02, This is a message03, Test first test message",
            "This is another message01, This is another message02, This is another message03, Test Second test message"
    })
    void GivenApplicationPropertiesWhenDemoThenReturnValues(final String value01,
                                                            final String value02,
                                                            final String value03,
                                                            final String message) {
        Mockito.when(demoConfigs.getMessage01()).thenReturn(value01);
        Mockito.when(demoConfigs.getMessage02()).thenReturn(value02);
        Mockito.when(demoConfigs.getMessage03()).thenReturn(value03);

        Assertions.assertNotNull(demoControl.demo());
        Assertions.assertEquals(value01, demoControl.demo().getMessage01());
        Assertions.assertEquals(value02, demoControl.demo().getMessage02());
        Assertions.assertEquals(value03, demoControl.demo().getMessage03());
    }
}