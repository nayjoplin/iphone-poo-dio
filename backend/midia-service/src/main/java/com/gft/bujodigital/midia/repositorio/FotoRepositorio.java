package com.gft.bujodigital.midia.repositorio;

import com.gft.bujodigital.midia.entidade.Foto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface FotoRepositorio extends JpaRepository<Foto, Long> {
    List<Foto> findByUsuarioIdAndDataUploadOrderByDataCriacaoDesc(Long usuarioId, LocalDate dataUpload);
    List<Foto> findByUsuarioIdOrderByDataCriacaoDesc(Long usuarioId);
    List<Foto> findByCadernoIdOrderByDataCriacaoDesc(Long cadernoId);
    Long countByUsuarioIdAndDataUpload(Long usuarioId, LocalDate dataUpload);
}
