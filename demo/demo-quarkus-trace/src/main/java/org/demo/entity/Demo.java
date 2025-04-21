package org.demo.entity;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Demo {
    private final String Message01;
    private final String Message02;
    private final String Message03;
}
