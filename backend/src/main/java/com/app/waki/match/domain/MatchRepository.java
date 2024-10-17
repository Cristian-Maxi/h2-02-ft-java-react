package com.app.waki.match.domain;

import com.app.waki.match.application.MatchAreaCompetitionDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface MatchRepository extends JpaRepository<Match, Long> {
    Optional<Match> findById(Long id);

    @Query("SELECT m.id FROM Match m")
    List<Long> findAllIds();

    @Query("SELECT m FROM Match m WHERE m.competition.code = :code AND m.utcDate BETWEEN :startDate AND :endDate")
    List<Match> findMatchesByCompetitionAndDateRange(@Param("code") String code, @Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

    @Query("SELECT new com.app.waki.match.application.MatchAreaCompetitionDTO(m.area.name, m.area.code, m.area.flag, m.competition.name, m.competition.code, m.competition.emblem) FROM Match m")
    List<MatchAreaCompetitionDTO> findAllMatchesWithAreaAndCompetition();

    boolean existsByHomeTeamId(Long id);

    boolean existsByAwayTeamId(Long id);
}
