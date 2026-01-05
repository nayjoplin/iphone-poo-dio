package com.gft.bujodigital.usuario.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioResponse {
    private Long id;
    private String email;
    private String nome;
    private String avatar;
    private String biografia;
    private LocalDateTime dataCriacao;
    private LocalDateTime ultimoAcesso;
}
