package com.gft.bujodigital.midia.entidade;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "videos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "usuario_id", nullable = false)
    private Long usuarioId;

    @Column(name = "caderno_id")
    private Long cadernoId;

    @Column(nullable = false)
    private String titulo;

    @Column(name = "nome_arquivo")
    private String nomeArquivo;

    @Column(name = "caminho_arquivo")
    private String caminhoArquivo;

    @Column(name = "url_video")
    private String urlVideo;

    @Column(name = "tamanho_bytes")
    private Long tamanhoBytes;

    @Column(name = "duracao_segundos")
    private Integer duracaoSegundos;

    @Column(name = "tipo_mime")
    private String tipoMime;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(name = "tipo_vitoria")
    private String tipoVitoria;

    @Column(name = "data_criacao")
    private LocalDateTime dataCriacao;

    @PrePersist
    protected void onCreate() {
        dataCriacao = LocalDateTime.now();
    }
}
