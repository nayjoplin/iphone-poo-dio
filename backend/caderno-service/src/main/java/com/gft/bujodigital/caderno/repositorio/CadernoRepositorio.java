package com.gft.bujodigital.caderno.repositorio;

import com.gft.bujodigital.caderno.entidade.Caderno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CadernoRepositorio extends JpaRepository<Caderno, Long> {
    List<Caderno> findByUsuarioIdOrderByDataCriacaoDesc(Long usuarioId);
}
