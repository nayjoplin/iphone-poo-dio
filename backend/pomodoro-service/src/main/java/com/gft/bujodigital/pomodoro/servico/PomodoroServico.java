package com.gft.bujodigital.pomodoro.servico;

import com.gft.bujodigital.pomodoro.dto.SessaoRequest;
import com.gft.bujodigital.pomodoro.entidade.EstatisticaTempo;
import com.gft.bujodigital.pomodoro.entidade.SessaoPomodoro;
import com.gft.bujodigital.pomodoro.repositorio.EstatisticaTempoRepositorio;
import com.gft.bujodigital.pomodoro.repositorio.SessaoPomodoroRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PomodoroServico {

    private final SessaoPomodoroRepositorio repositorio;
    private final EstatisticaTempoRepositorio estatisticaRepositorio;

    public SessaoPomodoro iniciarSessao(SessaoRequest request) {
        SessaoPomodoro sessao = new SessaoPomodoro();
        sessao.setUsuarioId(request.getUsuarioId());
        sessao.setCadernoId(request.getCadernoId());
        sessao.setFolhaId(request.getFolhaId());
        sessao.setDuracaoMinutos(request.getDuracaoMinutos());
        sessao.setDuracaoSegundos(request.getDuracaoSegundos() != null ? request.getDuracaoSegundos() : 0);
        sessao.setTipoSessao(request.getTipoSessao());
        sessao.setDataInicio(request.getDataInicio() != null ? request.getDataInicio() : LocalDateTime.now());
        sessao.setCompletada(false);

        return repositorio.save(sessao);
    }

    public SessaoPomodoro finalizarSessao(Long id, SessaoRequest request) {
        SessaoPomodoro sessao = repositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("Sessão não encontrada"));

        sessao.setDataFim(request.getDataFim() != null ? request.getDataFim() : LocalDateTime.now());
        sessao.setCompletada(request.getCompletada() != null ? request.getCompletada() : true);
        sessao.setObservacao(request.getObservacao());

        if (sessao.getCompletada()) {
            atualizarEstatisticas(sessao);
        }

        return repositorio.save(sessao);
    }

    private void atualizarEstatisticas(SessaoPomodoro sessao) {
        LocalDate data = sessao.getDataInicio().toLocalDate();

        EstatisticaTempo estatistica = estatisticaRepositorio
                .findByUsuarioIdAndCadernoIdAndData(sessao.getUsuarioId(), sessao.getCadernoId(), data)
                .orElse(new EstatisticaTempo());

        estatistica.setUsuarioId(sessao.getUsuarioId());
        estatistica.setCadernoId(sessao.getCadernoId());
        estatistica.setData(data);
        estatistica.setTotalMinutos(estatistica.getTotalMinutos() + sessao.getDuracaoMinutos());
        estatistica.setTotalSessoes(estatistica.getTotalSessoes() + 1);
        estatistica.setSessoesCompletadas(estatistica.getSessoesCompletadas() + 1);

        estatisticaRepositorio.save(estatistica);
    }

    public List<SessaoPomodoro> listarSessoesPorPeriodo(Long usuarioId, LocalDateTime inicio, LocalDateTime fim) {
        return repositorio.findByUsuarioIdAndDataInicioBetweenOrderByDataInicioDesc(usuarioId, inicio, fim);
    }

    public List<SessaoPomodoro> listarSessoesPorCaderno(Long cadernoId) {
        return repositorio.findByCadernoIdOrderByDataInicioDesc(cadernoId);
    }

    public Integer obterTotalMinutosPorUsuario(Long usuarioId) {
        Integer total = repositorio.somarMinutosPorUsuario(usuarioId);
        return total != null ? total : 0;
    }

    public Integer obterTotalMinutosPorCaderno(Long cadernoId) {
        Integer total = repositorio.somarMinutosPorCaderno(cadernoId);
        return total != null ? total : 0;
    }

    public List<EstatisticaTempo> obterEstatisticasPorPeriodo(Long usuarioId, LocalDate inicio, LocalDate fim) {
        return estatisticaRepositorio.findByUsuarioIdAndDataBetween(usuarioId, inicio, fim);
    }
}
