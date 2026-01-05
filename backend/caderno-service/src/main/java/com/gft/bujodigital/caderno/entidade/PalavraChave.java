package com.gft.bujodigital.caderno.entidade;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "palavras_chave")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PalavraChave {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "caderno_id", nullable = false)
    private Caderno caderno;

    @Column(nullable = false)
    private String termo;

    @Column(columnDefinition = "TEXT")
    private String definicao;

    private String categoria;
}
