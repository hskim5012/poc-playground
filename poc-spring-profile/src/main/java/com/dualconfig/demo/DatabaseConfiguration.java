package com.dualconfig.demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
public class DatabaseConfiguration {
	
	@Bean
	@Primary
	@ConfigurationProperties("app.datasource.first")
	public DataSourceProperties sqlDataSourceProperties() {
		System.out.println("Database Connection ");
		return new DataSourceProperties();
 	}
 	
}