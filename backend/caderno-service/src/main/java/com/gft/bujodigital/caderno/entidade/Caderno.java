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
@Table(name = "cadernos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Caderno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "usuario_id", nullable = false)
    private Long usuarioId;

    @Column(nullable = false)
    private String titulo;

    @Column(name = "tipo_projeto")
    private String tipoProjeto;

    private String finalidade;

    @Column(name = "data_inicio")
    private LocalDate dataInicio;

    @Column(name = "data_fim")
    private LocalDate dataFim;

    @Column(name = "nota_dificuldade")
    private Integer notaDificuldade;

    @Column(name = "cor_tema")
    private String corTema;

    @Column(name = "icone_linguagem")
    private String iconeLinguagem;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(name = "data_criacao")
    private LocalDateTime dataCriacao;

    @Column(name = "data_atualizacao")
    private LocalDateTime dataAtualizacao;

    @Column(name = "progresso_percentual")
    private Integer progressoPercentual = 0;

    @OneToMany(mappedBy = "caderno", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Folha> folhas = new ArrayList<>();

    @OneToMany(mappedBy = "caderno", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PalavraChave> palavrasChave = new ArrayList<>();

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
