package com.gft.bujodigital.caderno.servico;

import com.gft.bujodigital.caderno.dto.FolhaRequest;
import com.gft.bujodigital.caderno.entidade.Caderno;
import com.gft.bujodigital.caderno.entidade.Folha;
import com.gft.bujodigital.caderno.repositorio.FolhaRepositorio;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FolhaServico {

    private final FolhaRepositorio repositorio;
    private final CadernoServico cadernoServico;

    public Folha criar(FolhaRequest request) {
        Caderno caderno = cadernoServico.obterPorId(request.getCadernoId());

        Folha folha = new Folha();
        folha.setCaderno(caderno);
        folha.setTitulo(request.getTitulo());
        folha.setNumeroFolha(request.getNumeroFolha());
        folha.setDataEstudo(request.getDataEstudo());
        folha.setConteudo(request.getConteudo());
        folha.setTipoSecao(request.getTipoSecao());

        return repositorio.save(folha);
    }

    public List<Folha> listarPorCaderno(Long cadernoId) {
        return repositorio.findByCadernoIdOrderByNumeroFolhaAsc(cadernoId);
    }

    public Folha obterPorId(Long id) {
        return repositorio.findById(id)
                .orElseThrow(() -> new RuntimeException("Folha não encontrada"));
    }

    public Folha atualizar(Long id, FolhaRequest request) {
        Folha folha = obterPorId(id);

        if (request.getTitulo() != null) {
            folha.setTitulo(request.getTitulo());
        }
        if (request.getNumeroFolha() != null) {
            folha.setNumeroFolha(request.getNumeroFolha());
        }
        if (request.getDataEstudo() != null) {
            folha.setDataEstudo(request.getDataEstudo());
        }
        if (request.getConteudo() != null) {
            folha.setConteudo(request.getConteudo());
        }
        if (request.getTipoSecao() != null) {
            folha.setTipoSecao(request.getTipoSecao());
        }

        return repositorio.save(folha);
    }

    public void deletar(Long id) {
        repositorio.deleteById(id);
    }
}
