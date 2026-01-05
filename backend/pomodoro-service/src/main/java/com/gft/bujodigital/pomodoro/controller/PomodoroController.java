package com.gft.bujodigital.pomodoro.controller;

import com.gft.bujodigital.pomodoro.dto.SessaoRequest;
import com.gft.bujodigital.pomodoro.entidade.EstatisticaTempo;
import com.gft.bujodigital.pomodoro.entidade.SessaoPomodoro;
import com.gft.bujodigital.pomodoro.servico.PomodoroServico;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/pomodoro")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PomodoroController {

    private final PomodoroServico servico;

    @PostMapping("/iniciar")
    public ResponseEntity<SessaoPomodoro> iniciarSessao(@RequestBody SessaoRequest request) {
        return ResponseEntity.ok(servico.iniciarSessao(request));
    }

    @PutMapping("/{id}/finalizar")
    public ResponseEntity<SessaoPomodoro> finalizarSessao(@PathVariable Long id, @RequestBody SessaoRequest request) {
        return ResponseEntity.ok(servico.finalizarSessao(id, request));
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<SessaoPomodoro>> listarPorPeriodo(
            @PathVariable Long usuarioId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime inicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fim) {
        return ResponseEntity.ok(servico.listarSessoesPorPeriodo(usuarioId, inicio, fim));
    }

    @GetMapping("/caderno/{cadernoId}")
    public ResponseEntity<List<SessaoPomodoro>> listarPorCaderno(@PathVariable Long cadernoId) {
        return ResponseEntity.ok(servico.listarSessoesPorCaderno(cadernoId));
    }

    @GetMapping("/usuario/{usuarioId}/total-minutos")
    public ResponseEntity<Integer> obterTotalMinutos(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(servico.obterTotalMinutosPorUsuario(usuarioId));
    }

    @GetMapping("/caderno/{cadernoId}/total-minutos")
    public ResponseEntity<Integer> obterTotalMinutosCaderno(@PathVariable Long cadernoId) {
        return ResponseEntity.ok(servico.obterTotalMinutosPorCaderno(cadernoId));
    }

    @GetMapping("/usuario/{usuarioId}/estatisticas")
    public ResponseEntity<List<EstatisticaTempo>> obterEstatisticas(
            @PathVariable Long usuarioId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fim) {
        return ResponseEntity.ok(servico.obterEstatisticasPorPeriodo(usuarioId, inicio, fim));
    }
}
