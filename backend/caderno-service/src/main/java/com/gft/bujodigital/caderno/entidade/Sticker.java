package com.gft.bujodigital.caderno.entidade;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "stickers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Sticker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "folha_id", nullable = false)
    private Folha folha;

    @Column(nullable = false)
    private String tipo;

    private String icone;

    private String cor;

    @Column(name = "posicao_x")
    private Integer posicaoX;

    @Column(name = "posicao_y")
    private Integer posicaoY;

    private String texto;
}
