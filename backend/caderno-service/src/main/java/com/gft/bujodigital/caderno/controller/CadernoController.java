package com.gft.bujodigital.caderno.controller;

import com.gft.bujodigital.caderno.dto.CadernoRequest;
import com.gft.bujodigital.caderno.entidade.Caderno;
import com.gft.bujodigital.caderno.servico.CadernoServico;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cadernos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CadernoController {

    private final CadernoServico servico;

    @PostMapping
    public ResponseEntity<Caderno> criar(@RequestBody CadernoRequest request) {
        return ResponseEntity.ok(servico.criar(request));
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Caderno>> listarPorUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(servico.listarPorUsuario(usuarioId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Caderno> obterPorId(@PathVariable Long id) {
        return ResponseEntity.ok(servico.obterPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Caderno> atualizar(@PathVariable Long id, @RequestBody CadernoRequest request) {
        return ResponseEntity.ok(servico.atualizar(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        servico.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/progresso")
    public ResponseEntity<Void> atualizarProgresso(@PathVariable Long id, @RequestParam Integer progresso) {
        servico.atualizarProgresso(id, progresso);
        return ResponseEntity.ok().build();
    }
}
