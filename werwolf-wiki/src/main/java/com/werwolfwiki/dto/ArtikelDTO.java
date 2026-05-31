package com.werwolfwiki.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ArtikelDTO {

    @NotBlank(message = "Titel darf nicht leer sein")
    private String titel;

    @NotBlank(message = "Inhalt darf nicht leer sein")
    private String inhalt;

    @NotBlank(message = "Kategorie darf nicht leer sein")
    private String kategorie;
}
