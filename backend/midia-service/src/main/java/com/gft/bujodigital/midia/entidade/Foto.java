package com.gft.bujodigital.midia.entidade;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "fotos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Foto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "usuario_id", nullable = false)
    private Long usuarioId;

    @Column(name = "caderno_id")
    private Long cadernoId;

    @Column(name = "folha_id")
    private Long folhaId;

    @Column(name = "nome_arquivo")
    private String nomeArquivo;

    @Column(name = "caminho_arquivo")
    private String caminhoArquivo;

    @Column(name = "url_foto")
    private String urlFoto;

    @Column(name = "tamanho_bytes")
    private Long tamanhoBytes;

    @Column(name = "tipo_mime")
    private String tipoMime;

    @Column(columnDefinition = "TEXT")
    private String legenda;

    @Column(name = "data_upload")
    private LocalDate dataUpload;

    @Column(name = "data_criacao")
    private LocalDateTime dataCriacao;

    @PrePersist
    protected void onCreate() {
        dataCriacao = LocalDateTime.now();
        if (dataUpload == null) {
            dataUpload = LocalDate.now();
        }
    }
}
