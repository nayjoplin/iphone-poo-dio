package com.gft.bujodigital.caderno.entidade;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "snippets")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Snippet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "folha_id", nullable = false)
    private Folha folha;

    @Column(nullable = false)
    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String codigo;

    private String linguagem;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(name = "data_criacao")
    private LocalDateTime dataCriacao;

    @PrePersist
    protected void onCreate() {
        dataCriacao = LocalDateTime.now();
    }
}
