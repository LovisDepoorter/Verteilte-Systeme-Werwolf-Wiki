package com.werwolfwiki.controller;

import com.werwolfwiki.dto.ArtikelDTO;
import com.werwolfwiki.model.Artikel;
import com.werwolfwiki.service.ArtikelService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/artikel")
@Tag(name = "Artikel", description = "Wiki-Artikel verwalten")
@CrossOrigin(origins = "*") // erlaubt Anfragen von überall (z.B. Frontend)
public class ArtikelController {

    private final ArtikelService artikelService;

    public ArtikelController(ArtikelService artikelService) {
        this.artikelService = artikelService;
    }

    @GetMapping
    @Operation(summary = "Alle Artikel abrufen")
    public ResponseEntity<List<Artikel>> alleArtikel() {
        return ResponseEntity.ok(artikelService.alleArtikel());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Artikel nach ID abrufen")
    public ResponseEntity<Artikel> artikelNachId(@PathVariable Long id) {
        return ResponseEntity.ok(artikelService.artikelNachId(id));
    }

    @GetMapping("/kategorie/{kategorie}")
    @Operation(summary = "Artikel nach Kategorie abrufen")
    public ResponseEntity<List<Artikel>> artikelNachKategorie(@PathVariable String kategorie) {
        return ResponseEntity.ok(artikelService.artikelNachKategorie(kategorie));
    }

    @GetMapping("/suche")
    @Operation(summary = "Artikel nach Titel durchsuchen")
    public ResponseEntity<List<Artikel>> artikelSuchen(@RequestParam String q) {
        return ResponseEntity.ok(artikelService.artikelSuchen(q));
    }

    @PostMapping
    @Operation(summary = "Neuen Artikel erstellen")
    public ResponseEntity<Artikel> artikelErstellen(@Valid @RequestBody ArtikelDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(artikelService.artikelErstellen(dto));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Artikel bearbeiten")
    public ResponseEntity<Artikel> artikelBearbeiten(@PathVariable Long id, @Valid @RequestBody ArtikelDTO dto) {
        return ResponseEntity.ok(artikelService.artikelBearbeiten(id, dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Artikel löschen")
    public ResponseEntity<Void> artikelLoeschen(@PathVariable Long id) {
        artikelService.artikelLoeschen(id);
        return ResponseEntity.noContent().build();
    }
}
