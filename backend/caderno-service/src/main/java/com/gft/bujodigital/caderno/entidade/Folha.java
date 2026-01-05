package com.gft.bujodigital.caderno.entidade;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "folhas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Folha {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "caderno_id", nullable = false)
    private Caderno caderno;

    @Column(nullable = false)
    private String titulo;

    @Column(name = "numero_folha")
    private Integer numeroFolha;

    @Column(name = "data_estudo")
    private LocalDate dataEstudo;

    @Column(columnDefinition = "TEXT")
    private String conteudo;

    @Column(name = "tipo_secao")
    private String tipoSecao;

    @Column(name = "data_criacao")
    private LocalDateTime dataCriacao;

    @Column(name = "data_atualizacao")
    private LocalDateTime dataAtualizacao;

    @OneToMany(mappedBy = "folha", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Sticker> stickers = new ArrayList<>();

    @OneToMany(mappedBy = "folha", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Duvida> duvidas = new ArrayList<>();

    @OneToMany(mappedBy = "folha", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Snippet> snippets = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        dataCriacao = LocalDateTime.now();
        dataAtualizacao = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        dataAtualizacao = LocalDateTime.now();
    }
}
