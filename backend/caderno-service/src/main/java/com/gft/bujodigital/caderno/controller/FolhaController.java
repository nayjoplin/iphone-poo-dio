package com.gft.bujodigital.caderno.controller;

import com.gft.bujodigital.caderno.dto.FolhaRequest;
import com.gft.bujodigital.caderno.entidade.Folha;
import com.gft.bujodigital.caderno.servico.FolhaServico;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/folhas")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class FolhaController {

    private final FolhaServico servico;

    @PostMapping
    public ResponseEntity<Folha> criar(@RequestBody FolhaRequest request) {
        return ResponseEntity.ok(servico.criar(request));
    }

    @GetMapping("/caderno/{cadernoId}")
    public ResponseEntity<List<Folha>> listarPorCaderno(@PathVariable Long cadernoId) {
        return ResponseEntity.ok(servico.listarPorCaderno(cadernoId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Folha> obterPorId(@PathVariable Long id) {
        return ResponseEntity.ok(servico.obterPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Folha> atualizar(@PathVariable Long id, @RequestBody FolhaRequest request) {
        return ResponseEntity.ok(servico.atualizar(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        servico.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
