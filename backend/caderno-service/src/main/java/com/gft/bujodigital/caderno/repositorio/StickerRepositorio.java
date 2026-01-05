package com.gft.bujodigital.caderno.repositorio;

import com.gft.bujodigital.caderno.entidade.Sticker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StickerRepositorio extends JpaRepository<Sticker, Long> {
}
