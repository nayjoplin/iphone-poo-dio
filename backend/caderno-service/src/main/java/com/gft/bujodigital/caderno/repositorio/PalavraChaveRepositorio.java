package com.gft.bujodigital.caderno.repositorio;

import com.gft.bujodigital.caderno.entidade.PalavraChave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PalavraChaveRepositorio extends JpaRepository<PalavraChave, Long> {
    List<PalavraChave> findByCadernoId(Long cadernoId);
}
