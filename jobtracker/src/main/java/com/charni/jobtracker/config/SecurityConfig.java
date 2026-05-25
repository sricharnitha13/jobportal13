package com.charni.jobtracker.config;

import com.charni.jobtracker.security.JwtFilter;
import org.springframework.web.cors.CorsConfiguration;
import java.util.List;
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
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .cors(cors -> cors.configurationSource(request -> {
                    var config = new CorsConfiguration();
                    config.setAllowedOriginPatterns(List.of(
                            "http://localhost:3000",
                            "https://jobportal13-dpfd.vercel.app",
                            "https://*.vercel.app"
                    ));
                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    config.setAllowedHeaders(List.of("*"));
                    config.setAllowCredentials(true);
                    return config;
                }))

                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**", "/jobs/recommended", "/profile/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/jobs/**").permitAll()
                        .requestMatchers("/applications/**").authenticated()
                        .anyRequest().authenticated()
                )

                .addFilterBefore(
                        new JwtFilter(),
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}