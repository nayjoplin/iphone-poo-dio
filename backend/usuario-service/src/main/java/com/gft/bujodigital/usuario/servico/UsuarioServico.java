package com.gft.bujodigital.usuario.servico;

import com.gft.bujodigital.usuario.dto.*;
import com.gft.bujodigital.usuario.entidade.Usuario;
import com.gft.bujodigital.usuario.repositorio.UsuarioRepositorio;
import com.gft.bujodigital.usuario.seguranca.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UsuarioServico {

    private final UsuarioRepositorio repositorio;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthResponse registrar(RegistroRequest request) {
        if (repositorio.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }

        Usuario usuario = new Usuario();
        usuario.setEmail(request.getEmail());
        usuario.setSenha(passwordEncoder.encode(request.getSenha()));
        usuario.setNome(request.getNome());

        usuario = repositorio.save(usuario);

        String token = jwtUtil.gerarToken(usuario.getEmail(), usuario.getId());

        return new AuthResponse(token, usuario.getId(), usuario.getNome(), usuario.getEmail());
    }

    public AuthResponse autenticar(LoginRequest request) {
        Usuario usuario = repositorio.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Credenciais inválidas"));

        if (!passwordEncoder.matches(request.getSenha(), usuario.getSenha())) {
            throw new RuntimeException("Credenciais inválidas");
        }

        if (!usuario.getAtivo()) {
            throw new RuntimeException("Usuário inativo");
        }

        String token = jwtUtil.gerarToken(usuario.getEmail(), usuario.getId());

        return new AuthResponse(token, usuario.getId(), usuario.getNome(), usuario.getEmail());
    }

    public UsuarioResponse obterPerfil(Long id) {
        Usuario usuario = repositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return converterParaResponse(usuario);
    }

    public UsuarioResponse atualizarPerfil(Long id, UsuarioResponse request) {
        Usuario usuario = repositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (request.getNome() != null) {
            usuario.setNome(request.getNome());
        }
        if (request.getAvatar() != null) {
            usuario.setAvatar(request.getAvatar());
        }
        if (request.getBiografia() != null) {
            usuario.setBiografia(request.getBiografia());
        }

        usuario = repositorio.save(usuario);
        return converterParaResponse(usuario);
    }

    private UsuarioResponse converterParaResponse(Usuario usuario) {
        return new UsuarioResponse(
                usuario.getId(),
                usuario.getEmail(),
                usuario.getNome(),
                usuario.getAvatar(),
                usuario.getBiografia(),
                usuario.getDataCriacao(),
                usuario.getUltimoAcesso()
        );
    }
}
