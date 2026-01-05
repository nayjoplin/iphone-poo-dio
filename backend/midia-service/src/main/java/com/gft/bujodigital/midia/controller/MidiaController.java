package com.gft.bujodigital.midia.controller;

import com.gft.bujodigital.midia.dto.FotoResponse;
import com.gft.bujodigital.midia.entidade.Video;
import com.gft.bujodigital.midia.servico.MidiaServico;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/midia")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MidiaController {

    private final MidiaServico servico;

    @PostMapping(value = "/foto", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<FotoResponse> uploadFoto(
            @RequestParam Long usuarioId,
            @RequestParam(required = false) Long cadernoId,
            @RequestParam(required = false) Long folhaId,
            @RequestParam("arquivo") MultipartFile arquivo,
            @RequestParam(required = false) String legenda) throws IOException {
        return ResponseEntity.ok(servico.uploadFoto(usuarioId, cadernoId, folhaId, arquivo, legenda));
    }

    @PostMapping(value = "/video", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Video> uploadVideo(
            @RequestParam Long usuarioId,
            @RequestParam(required = false) Long cadernoId,
            @RequestParam String titulo,
            @RequestParam("arquivo") MultipartFile arquivo,
            @RequestParam(required = false) String descricao,
            @RequestParam(required = false) String tipoVitoria) throws IOException {
        return ResponseEntity.ok(servico.uploadVideo(usuarioId, cadernoId, titulo, arquivo, descricao, tipoVitoria));
    }

    @GetMapping("/fotos/usuario/{usuarioId}")
    public ResponseEntity<List<FotoResponse>> listarFotosPorUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(servico.listarFotosPorUsuario(usuarioId));
    }

    @GetMapping("/fotos/usuario/{usuarioId}/data")
    public ResponseEntity<List<FotoResponse>> listarFotosPorData(
            @PathVariable Long usuarioId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data) {
        return ResponseEntity.ok(servico.listarFotosPorData(usuarioId, data));
    }

    @GetMapping("/videos/usuario/{usuarioId}")
    public ResponseEntity<List<Video>> listarVideosPorUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(servico.listarVideosPorUsuario(usuarioId));
    }

    @DeleteMapping("/foto/{id}")
    public ResponseEntity<Void> deletarFoto(@PathVariable Long id) {
        servico.deletarFoto(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/video/{id}")
    public ResponseEntity<Void> deletarVideo(@PathVariable Long id) {
        servico.deletarVideo(id);
        return ResponseEntity.noContent().build();
    }
}
