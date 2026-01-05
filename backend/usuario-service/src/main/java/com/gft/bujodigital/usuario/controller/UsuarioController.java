package com.gft.bujodigital.usuario.controller;

import com.gft.bujodigital.usuario.dto.*;
import com.gft.bujodigital.usuario.servico.UsuarioServico;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioServico servico;

    @PostMapping("/registro")
    public ResponseEntity<AuthResponse> registrar(@RequestBody RegistroRequest request) {
        return ResponseEntity.ok(servico.registrar(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(servico.autenticar(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponse> obterPerfil(@PathVariable Long id) {
        return ResponseEntity.ok(servico.obterPerfil(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponse> atualizarPerfil(
            @PathVariable Long id,
            @RequestBody UsuarioResponse request) {
        return ResponseEntity.ok(servico.atualizarPerfil(id, request));
    }
}
