package com.charni.jobtracker.config;

import com.charni.jobtracker.security.JwtFilter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(

            HttpSecurity http

    ) throws Exception {

        http

                // 🚀 DISABLE CSRF

                .csrf(csrf -> csrf.disable())

                // 🚀 ENABLE CORS

                .cors(cors -> {})

                // 🚀 STATELESS JWT

                .sessionManagement(session ->

                        session.sessionCreationPolicy(

                                SessionCreationPolicy.STATELESS
                        )
                )

                // 🚀 ROUTES

                .authorizeHttpRequests(auth -> auth

                        // PUBLIC ROUTES

                        .requestMatchers(

                                "/auth/**",

                                "/jobs/recommended",

                                "/profile/**"

                        ).permitAll()

                        // PUBLIC GET JOBS

                        .requestMatchers(

                                HttpMethod.GET,

                                "/jobs/**"

                        ).permitAll()

                        // APPLICATION ROUTES

                        .requestMatchers(

                                "/applications/**"

                        ).authenticated()

                        // EVERYTHING ELSE

                        .anyRequest()

                        .authenticated()
                )

                // 🚀 JWT FILTER

                .addFilterBefore(

                        new JwtFilter(),

                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}