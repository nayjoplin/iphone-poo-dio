package com.gft.bujodigital.midia.repositorio;

import com.gft.bujodigital.midia.entidade.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoRepositorio extends JpaRepository<Video, Long> {
    List<Video> findByUsuarioIdOrderByDataCriacaoDesc(Long usuarioId);
    List<Video> findByCadernoIdOrderByDataCriacaoDesc(Long cadernoId);
}
