package com.gft.bujodigital.caderno.repositorio;

import com.gft.bujodigital.caderno.entidade.Duvida;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DuvidaRepositorio extends JpaRepository<Duvida, Long> {
    List<Duvida> findByFolhaIdAndResolvidaFalse(Long folhaId);
}
