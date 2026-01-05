package com.gft.bujodigital.pomodoro.repositorio;

import com.gft.bujodigital.pomodoro.entidade.SessaoPomodoro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SessaoPomodoroRepositorio extends JpaRepository<SessaoPomodoro, Long> {
    List<SessaoPomodoro> findByUsuarioIdAndDataInicioBetweenOrderByDataInicioDesc(
            Long usuarioId, LocalDateTime inicio, LocalDateTime fim);

    List<SessaoPomodoro> findByCadernoIdOrderByDataInicioDesc(Long cadernoId);

    @Query("SELECT SUM(s.duracaoMinutos) FROM SessaoPomodoro s WHERE s.usuarioId = :usuarioId AND s.completada = true")
    Integer somarMinutosPorUsuario(Long usuarioId);

    @Query("SELECT SUM(s.duracaoMinutos) FROM SessaoPomodoro s WHERE s.cadernoId = :cadernoId AND s.completada = true")
    Integer somarMinutosPorCaderno(Long cadernoId);
}
