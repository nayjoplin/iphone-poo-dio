package com.gft.bujodigital.caderno.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FolhaRequest {
    private Long cadernoId;
    private String titulo;
    private Integer numeroFolha;
    private LocalDate dataEstudo;
    private String conteudo;
    private String tipoSecao;
}
