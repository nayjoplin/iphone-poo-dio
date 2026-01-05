package com.gft.bujodigital.midia.servico;

import com.gft.bujodigital.midia.dto.FotoResponse;
import com.gft.bujodigital.midia.entidade.Foto;
import com.gft.bujodigital.midia.entidade.Video;
import com.gft.bujodigital.midia.repositorio.FotoRepositorio;
import com.gft.bujodigital.midia.repositorio.VideoRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MidiaServico {

    private final FotoRepositorio fotoRepositorio;
    private final VideoRepositorio videoRepositorio;

    @Value("${upload.diretorio}")
    private String diretorioUpload;

    public FotoResponse uploadFoto(Long usuarioId, Long cadernoId, Long folhaId, MultipartFile arquivo, String legenda) throws IOException {
        LocalDate hoje = LocalDate.now();
        Long fotosDoDia = fotoRepositorio.countByUsuarioIdAndDataUpload(usuarioId, hoje);

        if (fotosDoDia >= 3) {
            throw new RuntimeException("Limite de 3 fotos por dia atingido");
        }

        String nomeArquivo = UUID.randomUUID() + "_" + arquivo.getOriginalFilename();
        Path diretorio = Paths.get(diretorioUpload + "fotos/");

        if (!Files.exists(diretorio)) {
            Files.createDirectories(diretorio);
        }

        Path caminhoCompleto = diretorio.resolve(nomeArquivo);
        arquivo.transferTo(caminhoCompleto.toFile());

        Foto foto = new Foto();
        foto.setUsuarioId(usuarioId);
        foto.setCadernoId(cadernoId);
        foto.setFolhaId(folhaId);
        foto.setNomeArquivo(arquivo.getOriginalFilename());
        foto.setCaminhoArquivo(caminhoCompleto.toString());
        foto.setUrlFoto("/uploads/fotos/" + nomeArquivo);
        foto.setTamanhoBytes(arquivo.getSize());
        foto.setTipoMime(arquivo.getContentType());
        foto.setLegenda(legenda);
        foto.setDataUpload(hoje);

        foto = fotoRepositorio.save(foto);
        return converterParaResponse(foto);
    }

    public Video uploadVideo(Long usuarioId, Long cadernoId, String titulo, MultipartFile arquivo, String descricao, String tipoVitoria) throws IOException {
        String nomeArquivo = UUID.randomUUID() + "_" + arquivo.getOriginalFilename();
        Path diretorio = Paths.get(diretorioUpload + "videos/");

        if (!Files.exists(diretorio)) {
            Files.createDirectories(diretorio);
        }

        Path caminhoCompleto = diretorio.resolve(nomeArquivo);
        arquivo.transferTo(caminhoCompleto.toFile());

        Video video = new Video();
        video.setUsuarioId(usuarioId);
        video.setCadernoId(cadernoId);
        video.setTitulo(titulo);
        video.setNomeArquivo(arquivo.getOriginalFilename());
        video.setCaminhoArquivo(caminhoCompleto.toString());
        video.setUrlVideo("/uploads/videos/" + nomeArquivo);
        video.setTamanhoBytes(arquivo.getSize());
        video.setTipoMime(arquivo.getContentType());
        video.setDescricao(descricao);
        video.setTipoVitoria(tipoVitoria);

        return videoRepositorio.save(video);
    }

    public List<FotoResponse> listarFotosPorUsuario(Long usuarioId) {
        return fotoRepositorio.findByUsuarioIdOrderByDataCriacaoDesc(usuarioId)
                .stream()
                .map(this::converterParaResponse)
                .collect(Collectors.toList());
    }

    public List<FotoResponse> listarFotosPorData(Long usuarioId, LocalDate data) {
        return fotoRepositorio.findByUsuarioIdAndDataUploadOrderByDataCriacaoDesc(usuarioId, data)
                .stream()
                .map(this::converterParaResponse)
                .collect(Collectors.toList());
    }

    public List<Video> listarVideosPorUsuario(Long usuarioId) {
        return videoRepositorio.findByUsuarioIdOrderByDataCriacaoDesc(usuarioId);
    }

    public void deletarFoto(Long id) {
        Foto foto = fotoRepositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("Foto não encontrada"));

        try {
            Files.deleteIfExists(Paths.get(foto.getCaminhoArquivo()));
        } catch (IOException e) {
        }

        fotoRepositorio.deleteById(id);
    }

    public void deletarVideo(Long id) {
        Video video = videoRepositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("Vídeo não encontrado"));

        try {
            Files.deleteIfExists(Paths.get(video.getCaminhoArquivo()));
        } catch (IOException e) {
        }

        videoRepositorio.deleteById(id);
    }

    private FotoResponse converterParaResponse(Foto foto) {
        return new FotoResponse(
                foto.getId(),
                foto.getUsuarioId(),
                foto.getCadernoId(),
                foto.getFolhaId(),
                foto.getNomeArquivo(),
                foto.getUrlFoto(),
                foto.getLegenda(),
                foto.getDataUpload(),
                foto.getDataCriacao()
        );
    }
}
