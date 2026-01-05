package com.gft.bujodigital.pomodoro.entidade;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "sessoes_pomodoro")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessaoPomodoro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "usuario_id", nullable = false)
    private Long usuarioId;

    @Column(name = "caderno_id")
    private Long cadernoId;

    @Column(name = "folha_id")
    private Long folhaId;

    @Column(name = "duracao_minutos", nullable = false)
    private Integer duracaoMinutos;

    @Column(name = "duracao_segundos", nullable = false)
    private Integer duracaoSegundos;

    @Column(name = "tipo_sessao")
    private String tipoSessao;

    @Column(name = "data_inicio")
    private LocalDateTime dataInicio;

    @Column(name = "data_fim")
    private LocalDateTime dataFim;

    private Boolean completada = false;

    @Column(columnDefinition = "TEXT")
    private String observacao;

    @PrePersist
    protected void onCreate() {
        if (dataInicio == null) {
            dataInicio = LocalDateTime.now();
        }
    }
}
