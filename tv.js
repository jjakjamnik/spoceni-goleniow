// =====================================================
// SPOCENI GOLENIÓW TV BAR
// v2.0
// =====================================================

// ============================
// WIADOMOŚCI
// ============================

const tvMessages = [
    "► Witaj na oficjalnej stronie klubu Spoceni Goleniów",
    "⚽ Założenie klubu: Sezon 23",
    "⚽ Historia klubu tworzona od 2008 roku",
    "⚽ Ostatni mecz Spoceni Goleniów - KS Hetman Zamość 2-1",
    "⚽ Fawzi Ammar bohaterem! Zawodnik z Tunezji odwraca wynik strzelając gole w 89' i 90'"
];

// ============================
// ELEMENTY
// ============================

const messageElement = document.getElementById("tv-message");
const clockElement = document.getElementById("tv-clock");

// Łączy wszystkie komunikaty w jeden długi pasek
messageElement.textContent =
    tvMessages.join("     ★     ") + "     ★     ";

// ============================
// ZEGAR
// ============================

function updateClock() {

    const now = new Date();

    const dni = [
        "Niedziela",
        "Poniedziałek",
        "Wtorek",
        "Środa",
        "Czwartek",
        "Piątek",
        "Sobota"
    ];

    const miesiace = [
        "stycznia",
        "lutego",
        "marca",
        "kwietnia",
        "maja",
        "czerwca",
        "lipca",
        "sierpnia",
        "września",
        "października",
        "listopada",
        "grudnia"
    ];

    const dzien = dni[now.getDay()];
    const data = now.getDate();
    const miesiac = miesiace[now.getMonth()];
    const rok = now.getFullYear();

    const godzina = String(now.getHours()).padStart(2, "0");
    const minuta = String(now.getMinutes()).padStart(2, "0");
    const sekunda = String(now.getSeconds()).padStart(2, "0");

    clockElement.textContent =
        `${dzien}, ${data} ${miesiac} ${rok} | ${godzina}:${minuta}:${sekunda}`;
}

// ============================
// START
// ============================

updateClock();
setInterval(updateClock, 1000);