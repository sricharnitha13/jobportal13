package com.charni.jobtracker.config;

import com.charni.jobtracker.security.JwtFilter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                // CORS

                .cors(cors -> {})

                // DISABLE CSRF

                .csrf(csrf -> csrf.disable())

                // ROUTES

                .authorizeHttpRequests(auth -> auth

                        // PUBLIC ROUTES

                        .requestMatchers(

                                "/auth/**",

                                "/admin/**",

                                "/profile/**",

                                "/applications/**"

                        ).permitAll()

                        // PUBLIC GET JOBS

                        .requestMatchers(
                                HttpMethod.GET,
                                "/jobs/**"
                        ).permitAll()

                        // EVERYTHING ELSE

                        .anyRequest().authenticated()

                )

                // JWT FILTER

                .addFilterBefore(

                        new JwtFilter(),

                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}