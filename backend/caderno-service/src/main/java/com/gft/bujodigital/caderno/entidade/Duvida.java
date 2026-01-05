package com.gft.bujodigital.caderno.entidade;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "duvidas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Duvida {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "folha_id", nullable = false)
    private Folha folha;

    @Column(columnDefinition = "TEXT")
    private String pergunta;

    @Column(columnDefinition = "TEXT")
    private String resposta;

    private Boolean resolvida = false;

    @Column(name = "data_criacao")
    private LocalDateTime dataCriacao;

    @Column(name = "data_resolucao")
    private LocalDateTime dataResolucao;

    @PrePersist
    protected void onCreate() {
        dataCriacao = LocalDateTime.now();
    }
}
