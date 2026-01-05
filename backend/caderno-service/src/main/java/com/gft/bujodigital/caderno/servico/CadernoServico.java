package com.gft.bujodigital.caderno.servico;

import com.gft.bujodigital.caderno.dto.CadernoRequest;
import com.gft.bujodigital.caderno.entidade.Caderno;
import com.gft.bujodigital.caderno.repositorio.CadernoRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CadernoServico {

    private final CadernoRepositorio repositorio;

    public Caderno criar(CadernoRequest request) {
        Caderno caderno = new Caderno();
        caderno.setUsuarioId(request.getUsuarioId());
        caderno.setTitulo(request.getTitulo());
        caderno.setTipoProjeto(request.getTipoProjeto());
        caderno.setFinalidade(request.getFinalidade());
        caderno.setDataInicio(request.getDataInicio());
        caderno.setDataFim(request.getDataFim());
        caderno.setNotaDificuldade(request.getNotaDificuldade());
        caderno.setCorTema(request.getCorTema());
        caderno.setIconeLinguagem(request.getIconeLinguagem());
        caderno.setDescricao(request.getDescricao());
        return repositorio.save(caderno);
    }

    public List<Caderno> listarPorUsuario(Long usuarioId) {
        return repositorio.findByUsuarioIdOrderByDataCriacaoDesc(usuarioId);
    }

    public Caderno obterPorId(Long id) {
        return repositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("Caderno não encontrado"));
    }

    public Caderno atualizar(Long id, CadernoRequest request) {
        Caderno caderno = obterPorId(id);

        if (request.getTitulo() != null) {
            caderno.setTitulo(request.getTitulo());
        }
        if (request.getTipoProjeto() != null) {
            caderno.setTipoProjeto(request.getTipoProjeto());
        }
        if (request.getFinalidade() != null) {
            caderno.setFinalidade(request.getFinalidade());
        }
        if (request.getDataInicio() != null) {
            caderno.setDataInicio(request.getDataInicio());
        }
        if (request.getDataFim() != null) {
            caderno.setDataFim(request.getDataFim());
        }
        if (request.getNotaDificuldade() != null) {
            caderno.setNotaDificuldade(request.getNotaDificuldade());
        }
        if (request.getCorTema() != null) {
            caderno.setCorTema(request.getCorTema());
        }
        if (request.getIconeLinguagem() != null) {
            caderno.setIconeLinguagem(request.getIconeLinguagem());
        }
        if (request.getDescricao() != null) {
            caderno.setDescricao(request.getDescricao());
        }

        return repositorio.save(caderno);
    }

    public void deletar(Long id) {
        repositorio.deleteById(id);
    }

    public void atualizarProgresso(Long id, Integer progresso) {
        Caderno caderno = obterPorId(id);
        caderno.setProgressoPercentual(progresso);
        repositorio.save(caderno);
    }
}
