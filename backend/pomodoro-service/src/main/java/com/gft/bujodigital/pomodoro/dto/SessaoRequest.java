package com.gft.bujodigital.pomodoro.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessaoRequest {
    private Long usuarioId;
    private Long cadernoId;
    private Long folhaId;
    private Integer duracaoMinutos;
    private Integer duracaoSegundos;
    private String tipoSessao;
    private LocalDateTime dataInicio;
    private LocalDateTime dataFim;
    private Boolean completada;
    private String observacao;
}
