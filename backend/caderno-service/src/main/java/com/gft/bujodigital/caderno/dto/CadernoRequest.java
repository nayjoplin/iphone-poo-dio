package com.gft.bujodigital.caderno.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CadernoRequest {
    private Long usuarioId;
    private String titulo;
    private String tipoProjeto;
    private String finalidade;
    private LocalDate dataInicio;
    private LocalDate dataFim;
    private Integer notaDificuldade;
    private String corTema;
    private String iconeLinguagem;
    private String descricao;
}
