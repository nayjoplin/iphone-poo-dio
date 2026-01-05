package com.gft.bujodigital.caderno.repositorio;

import com.gft.bujodigital.caderno.entidade.Folha;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FolhaRepositorio extends JpaRepository<Folha, Long> {
    List<Folha> findByCadernoIdOrderByNumeroFolhaAsc(Long cadernoId);
}
