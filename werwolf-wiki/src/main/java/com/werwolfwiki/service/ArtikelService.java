package com.werwolfwiki.service;

import com.werwolfwiki.dto.ArtikelDTO;
import com.werwolfwiki.model.Artikel;
import com.werwolfwiki.repository.ArtikelRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArtikelService {

    private final ArtikelRepository artikelRepository;

    public ArtikelService(ArtikelRepository artikelRepository) {
        this.artikelRepository = artikelRepository;
    }

    // Alle Artikel abrufen
    public List<Artikel> alleArtikel() {
        return artikelRepository.findAll();
    }

    // Artikel nach ID abrufen
    public Artikel artikelNachId(Long id) {
        return artikelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Artikel mit ID " + id + " nicht gefunden"));
    }

    // Artikel nach Kategorie abrufen
    public List<Artikel> artikelNachKategorie(String kategorie) {
        return artikelRepository.findByKategorie(kategorie);
    }

    // Artikel suchen (nach Titel)
    public List<Artikel> artikelSuchen(String suchbegriff) {
        return artikelRepository.findByTitelContainingIgnoreCase(suchbegriff);
    }

    // Artikel erstellen
    public Artikel artikelErstellen(ArtikelDTO dto) {
        Artikel artikel = new Artikel();
        artikel.setTitel(dto.getTitel());
        artikel.setInhalt(dto.getInhalt());
        artikel.setKategorie(dto.getKategorie());
        return artikelRepository.save(artikel);
    }

    // Artikel bearbeiten
    public Artikel artikelBearbeiten(Long id, ArtikelDTO dto) {
        Artikel artikel = artikelNachId(id);
        artikel.setTitel(dto.getTitel());
        artikel.setInhalt(dto.getInhalt());
        artikel.setKategorie(dto.getKategorie());
        return artikelRepository.save(artikel);
    }

    // Artikel löschen
    public void artikelLoeschen(Long id) {
        if (!artikelRepository.existsById(id)) {
            throw new RuntimeException("Artikel mit ID " + id + " nicht gefunden");
        }
        artikelRepository.deleteById(id);
    }
}
