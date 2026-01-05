package com.gft.bujodigital.caderno.repositorio;

import com.gft.bujodigital.caderno.entidade.Snippet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SnippetRepositorio extends JpaRepository<Snippet, Long> {
}
