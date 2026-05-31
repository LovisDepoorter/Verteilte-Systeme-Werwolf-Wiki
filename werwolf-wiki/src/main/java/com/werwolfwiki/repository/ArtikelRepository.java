package com.werwolfwiki.repository;

import com.werwolfwiki.model.Artikel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArtikelRepository extends JpaRepository<Artikel, Long> {

    // Suche nach Kategorie
    List<Artikel> findByKategorie(String kategorie);

    // Suche nach Titel (case-insensitive, teilweise)
    List<Artikel> findByTitelContainingIgnoreCase(String titel);

    // Suche nach Titel exakt
    Optional<Artikel> findByTitel(String titel);
}
