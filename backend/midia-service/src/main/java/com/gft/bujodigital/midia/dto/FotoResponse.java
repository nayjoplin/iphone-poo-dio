package com.gft.bujodigital.midia.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FotoResponse {
    private Long id;
    private Long usuarioId;
    private Long cadernoId;
    private Long folhaId;
    private String nomeArquivo;
    private String urlFoto;
    private String legenda;
    private LocalDate dataUpload;
    private LocalDateTime dataCriacao;
}
