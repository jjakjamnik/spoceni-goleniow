fetch("data/players.json")
.then(response => response.json())
.then(players => {


    let playersArray = Object.values(players);


    let table = document.querySelector("#players-table tbody");


    let currentSort = "appearances";
    let sortDirection = -1;



    // ==========================
    // PODSTAWOWE LICZNIKI
    // ==========================

    let totalPlayers = playersArray.length;


    let allMatches = new Set();


    playersArray.forEach(player => {

        if (player.matches) {

            player.matches.forEach(match => {
                allMatches.add(match);
            });

        }

    });


    let totalMatches = allMatches.size;




    // ==========================
    // NAJWIĘCEJ WYSTĘPÓW
    // ==========================


    let maxAppearances = Math.max(
        ...playersArray.map(player => player.appearances)
    );


    let topAppearances = playersArray

        .filter(player => player.appearances === maxAppearances)

        .map(player =>
            player.name + " (" + player.appearances + ")"
        )

        .join("<br>");






    // ==========================
    // NAJLEPSZY STRZELEC
    // ==========================


    let maxGoals = Math.max(
        ...playersArray.map(player => player.goals)
    );


    let topScorers = playersArray

        .filter(player => player.goals === maxGoals)

        .map(player =>
            player.name + " (" + player.goals + ")"
        )

        .join("<br>");






    // ==========================
    // WPISANIE PODSUMOWANIA
    // ==========================


    document.getElementById("total-matches").innerHTML = totalMatches;

    document.getElementById("total-players").innerHTML = totalPlayers;

    document.getElementById("top-player").innerHTML = topAppearances;

    document.getElementById("top-scorer").innerHTML = topScorers;






    // ==========================
    // RENDER TABELI
    // ==========================


    function renderTable(players){


        table.innerHTML = "";


        let lp = 1;



        players.forEach(player => {


            let row = document.createElement("tr");



            row.innerHTML = `

                <td>${lp}</td>

                <td>${player.name}</td>

                <td>${player.nationality || "-"}</td>

                <td>${player.appearances}</td>

                <td>${player.goals}</td>

                <td>${player.yellowCards || 0}</td>

                <td>${player.redCards || 0}</td>

                <td>
                    ${player.homegrown ? "TAK" : "-"}
                </td>

                <td>
                    ${player.hallOfFame ? "🏆 TAK" : "-"}
                </td>

            `;



            table.appendChild(row);


            lp++;


        });


    }






    // ==========================
    // STARTOWE SORTOWANIE
    // ==========================


    let sortedPlayers = [...playersArray].sort(
        (a,b) => b.appearances - a.appearances
    );


    renderTable(sortedPlayers);







    // ==========================
    // SORTOWANIE PO KOLUMNACH
    // ==========================


    document.querySelectorAll("#players-table th").forEach(header => {


        header.style.cursor = "pointer";


        header.addEventListener("click", function(){


            let type = this.dataset.sort;



            if(!type){
                return;
            }



            if(currentSort === type){

                sortDirection *= -1;

            }
            else {

                currentSort = type;

                sortDirection = 1;

            }






            let sorted = [...playersArray].sort((a,b)=>{


                let valueA = a[type] ?? 0;

                let valueB = b[type] ?? 0;




                if(type === "name" || type === "nationality"){


                    return valueA.localeCompare(valueB) * sortDirection;


                }




                if(type === "homegrown" || type === "hallOfFame"){


                    return (
                        Number(valueA) -
                        Number(valueB)
                    ) * sortDirection;


                }



                return (
                    valueA -
                    valueB
                ) * sortDirection;



            });



            renderTable(sorted);



        });



    });



})


.catch(error => {


    console.error(
        "Błąd wczytywania players.json:",
        error
    );


});