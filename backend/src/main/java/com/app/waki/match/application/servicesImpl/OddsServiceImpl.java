package com.app.waki.match.application.servicesImpl;

import com.app.waki.match.application.OddsService;
import com.app.waki.match.domain.odds.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.net.URI;
import java.net.http.*;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OddsServiceImpl implements OddsService {

    private static final Logger logger = LoggerFactory.getLogger(OddsService.class);

    @Value("${API_TOKEN}")
    private String apiToken;

    private final OddsRepository oddsRepository;

    @Override
    public void fetchAndSaveOdds() throws IOException, InterruptedException {
        // Lista de IDs de ligas
        List<Long> leagueIds = List.of(39L, 140L, 2L, 78L, 13L, 128L);

        // Itera sobre cada ID de liga
        for (Long leagueId : leagueIds) {
            // Construye la solicitud para la liga actual
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create("https://v3.football.api-sports.io/odds?season=2024&bet=1&page=2&bookmaker=27&league=" + leagueId))
                    .header("x-rapidapi-key", apiToken)
                    .method("GET", HttpRequest.BodyPublishers.noBody())
                    .build();

            // Envía la solicitud y recibe la respuesta
            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
            logger.info("API Response for League {}: {}", leagueId, response.body());

            // Procesa el JSON
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(response.body());

            // Nodo que contiene las odds
            JsonNode oddsNode = rootNode.path("response");
            List<Odds> oddsList = new ArrayList<>();

            // Itera sobre cada elemento del array 'response'
            oddsNode.forEach(oddNode -> {
                Long fixtureId = oddNode.path("fixture").path("id").asLong();

                // Verificar si ya existe un registro con este fixtureId
                Odds existingOdds = oddsRepository.findByFixture_FixtureId(fixtureId);
                Odds odds;

                if (existingOdds != null) {
                    logger.info("Odds for fixtureId {} already exist. Updating...", fixtureId);
                    odds = existingOdds;  // Si ya existe, actualizamos los datos
                } else {
                    logger.info("Creating new odds for fixtureId {}.", fixtureId);
                    odds = new Odds();  // Si no existe, creamos uno nuevo
                }

                // Setea el fixture
                FixtureOdds fixture = new FixtureOdds();
                fixture.setFixtureId(fixtureId);
                fixture.setTimezone(oddNode.path("fixture").path("timezone").asText());
                fixture.setDate(oddNode.path("fixture").path("date").asText());
                fixture.setTimestamp(oddNode.path("fixture").path("timestamp").asLong());
                odds.setFixture(fixture);

                // Setea la fecha de actualización
                String update = oddNode.path("update").asText();
                odds.setLastUpdated(OffsetDateTime.parse(update));

                // Itera sobre los bookmakers
                JsonNode bookmakersNode = oddNode.path("bookmakers").get(0); // Solo tomamos el primer bookmaker

                Bookmaker bookmaker = new Bookmaker();
                bookmaker.setBookmakerId(bookmakersNode.path("id").asLong());
                bookmaker.setBookmakerName(bookmakersNode.path("name").asText());

                // Itera sobre los bets
                JsonNode betNode = bookmakersNode.path("bets").get(0);  // Tomamos el primer bet

                Bet bet = new Bet();
                bet.setBetName(betNode.path("name").asText());

                // Setea los valores de odds
                OddValue values = new OddValue();
                betNode.path("values").forEach(value -> {
                    switch (value.path("value").asText()) {
                        case "Home":
                            values.setHomeOdd(value.path("odd").asText());
                            break;
                        case "Draw":
                            values.setDrawOdd(value.path("odd").asText());
                            break;
                        case "Away":
                            values.setAwayOdd(value.path("odd").asText());
                            break;
                    }
                });

                // Setea los valores de la apuesta en Bookmaker
                bet.setValues(values);
                bookmaker.setBet(bet);
                odds.setBookmaker(bookmaker);

                oddsList.add(odds);
            });

            // Guarda todas las odds de la liga actual en la base de datos
            oddsRepository.saveAll(oddsList);
            logger.info("Odds for league {} saved successfully.", leagueId);
        }
    }

    @Override
    @Transactional
    public List<Odds> getAllOdds() {
        return oddsRepository.findAll();
    }

    @Override
    @Transactional
    public Odds getOdd(Long id) {
        return oddsRepository.findByFixture_FixtureId(id);
    }

    // Método para obtener los odds por varios fixtureIds
    @Override
    @Transactional
    public Map<Long, List<Odds>> getOddsByFixtureIds(List<Long> fixtureIds) {
        List<Odds> odds = oddsRepository.findByFixture_FixtureIdIn(fixtureIds);
        return odds.stream()
                .collect(Collectors.groupingBy(oddsEntry -> oddsEntry.getFixture().getFixtureId()));
    }
}