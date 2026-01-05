package com.gft.bujodigital.pomodoro.entidade;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "estatisticas_tempo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EstatisticaTempo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "usuario_id", nullable = false)
    private Long usuarioId;

    @Column(name = "caderno_id")
    private Long cadernoId;

    @Column(nullable = false)
    private LocalDate data;

    @Column(name = "total_minutos")
    private Integer totalMinutos = 0;

    @Column(name = "total_sessoes")
    private Integer totalSessoes = 0;

    @Column(name = "sessoes_completadas")
    private Integer sessoesCompletadas = 0;
}
