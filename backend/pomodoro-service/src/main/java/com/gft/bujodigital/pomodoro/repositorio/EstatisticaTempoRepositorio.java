package com.gft.bujodigital.pomodoro.repositorio;

import com.gft.bujodigital.pomodoro.entidade.EstatisticaTempo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface EstatisticaTempoRepositorio extends JpaRepository<EstatisticaTempo, Long> {
    Optional<EstatisticaTempo> findByUsuarioIdAndCadernoIdAndData(Long usuarioId, Long cadernoId, LocalDate data);
    List<EstatisticaTempo> findByUsuarioIdAndDataBetween(Long usuarioId, LocalDate inicio, LocalDate fim);
}
