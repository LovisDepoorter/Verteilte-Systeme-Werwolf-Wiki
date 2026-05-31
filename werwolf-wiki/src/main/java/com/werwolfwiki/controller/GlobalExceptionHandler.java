package com.werwolfwiki.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Validierungsfehler (z.B. leerer Titel)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, String> fehler = new HashMap<>();
        ex.getBindingResult().getFieldErrors()
                .forEach(error -> fehler.put(error.getField(), error.getDefaultMessage()));
        return ResponseEntity.badRequest().body(fehler);
    }

    // Artikel nicht gefunden
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleRuntimeException(RuntimeException ex) {
        Map<String, String> fehler = new HashMap<>();
        fehler.put("fehler", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(fehler);
    }
}
