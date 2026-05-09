function drawChart(resultsS, resultsE, resultsI, resultsR){
    /* It draws a chart on the page.
     * resultsS: an array containing the daily values of S, in which resultsS[0] is the first day
     * resultsE: an array containing the daily values of E, in which resultsS[0] is the first day
     * resultsI: an array containing the daily values of I, in which resultsS[0] is the first day
     * resultsR: an array containing the daily values of R, in which resultsS[0] is the first day
     */

    if(!(resultsS.length === resultsE.length && resultsE.length === resultsI.length && resultsI.length == resultsR.length)){
        return;
    }

    days = [];

    for(let i = 0; i < resultsS.length; i++){
        days.push(i);
    }

    document.getElementById("chart-container").innerHTML = `<canvas id="chart"></canvas>`;

    const ctx = document.getElementById("chart").getContext("2d");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: days,
            datasets: [{
                label: "Suscetíveis",
                data: resultsS,
                borderColor: "#4bc0c0",
                backgroundColor: "#4bc0c0",
                borderWidth: 2
            },

            {
                label: "Expostos",
                data: resultsE,
                borderColor: "#ff6384",
                backgroundColor: "#ff6384",
                borderWidth: 2
            },

            {
                label: "Infectados",
                data: resultsI,
                borderColor: "#36a2eb",
                backgroundColor: "#36a2eb",
                borderWidth: 2
            },

            {
                label: "Recuperados",
                data: resultsR,
                borderColor: "#ffcd56",
                backgroundColor: "#ffcd56",
                borderWidth: 2
            }]
        },

        options: {
            responsive: true,
            plugins: {
                title: {
                    text: "Resultado",
                    display: true
                }
            },

            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        text: "Indivíduos",
                        display: true
                    }
                },

                x: {
                    title: {
                        text: "Tempo (dias)",
              display: true
                    }
                }
            }
        }
    });
}
