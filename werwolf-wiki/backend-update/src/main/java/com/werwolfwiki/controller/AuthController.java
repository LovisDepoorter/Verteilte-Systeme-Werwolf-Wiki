package com.werwolfwiki.controller;

import com.werwolfwiki.dto.LoginRequest;
import com.werwolfwiki.dto.LoginResponse;
import com.werwolfwiki.security.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Auth", description = "Authentifizierung")
@CrossOrigin(origins = "*")
public class AuthController {

    @Value("${wiki.password}")
    private String wikiPassword;

    private final JwtUtil jwtUtil;

    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    @Operation(summary = "Mit globalem Passwort einloggen und JWT Token erhalten")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        if (request.getPassword().equals(wikiPassword)) {
            String token = jwtUtil.generateToken();
            return ResponseEntity.ok(new LoginResponse(token, "Erfolgreich eingeloggt"));
        }
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(new LoginResponse(null, "Falsches Passwort"));
    }
}
