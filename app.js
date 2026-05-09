const evaluate_button = document.getElementById("evaluate-button");

evaluate_button.addEventListener("click", ()  => {
    /* These are the variables used to perform the evaluations in the calculator: */

    let n = parseInt(document.getElementById("n").value); // Population size
    let io = parseInt(document.getElementById("io").value); // Inital number of infected
    let r0 = parseFloat(document.getElementById("r0").value); // Basic reproduction number (from 0 to 10)
    let theta = parseFloat(document.getElementById("theta").value); // Percentage reduction in transmission (from 0 to 1)

    let rt = (1 - theta) * r0; // Adjusted basic reproduction number

    let delta = parseFloat(document.getElementById("delta").value); // Mortality rate (from 0 to 100%)
    let tau = parseFloat(document.getElementById("tau").value); // Hospitalization rate (from 0 to 100%)

    let tinf = parseInt(document.getElementById("tinf").value); // Time (in days) the patient is infected
    let tinc = parseInt(document.getElementById("tinc").value); // Incubation period (in days)
    let tm = parseInt(document.getElementById("tm").value); // Time (in days) from the end of the incubation period to death
    let tint = parseInt(document.getElementById("tint").value); // Hospitalization time (in days)
    let trec = parseInt(document.getElementById("trec").value); // Recovery time (in days) for mild cases
    let thosp = parseInt(document.getElementById("thosp").value); // Time (in days) elapsed until hospitalization

    let ts = parseInt(document.getElementById("ts").value); // Simulation time (days)

    if(isNaN(n+io+r0+theta+rt+delta+tau+tinf+tinc+tm+tint+trec+thosp)){
        const modalBootstrap = new bootstrap.Modal(document.getElementById("incorrect-data-modal"));
        modalBootstrap.show()


        return;
    }

    /* Telling the user the data is being processed: */

    document.getElementById("evaluate-alert").style.display = "";
    document.getElementById("evaluate-alert").classList.add("alert-warning");
    document.getElementById("evaluate-alert").classList.remove("alert-info");
    document.getElementById("evaluate-alert").innerHTML = "Processando dados...";


    setTimeout(() => {
        /* Derivatives: */

        const derivatives = (s, e, i) => {
            const dS_dt = -rt/tinf * i * s / n;
            const dE_dt = rt/tinf * i * s / n - e/tinc;
            const dI_dt = e/tinc - i/tinf;
            const dR_dt = i/tinf;

            return [dS_dt, dE_dt, dI_dt, dR_dt];
        }

        /* Current state of S, E, I and R: */

        let current_state = [n - io, 0, io, 0];

        /* These are the arrays used to store the results: */

        let resultsS = [current_state[0]];
        let resultsE = [current_state[1]];
        let resultsI = [current_state[2]];
        let resultsR = [current_state[3]];

        /* Calculating: */

        const N_ITER = 100;

        for(let t = 0; t < ts; t++){
            current_state = rungeKuttaSEIR(t, current_state, t+1, derivatives, N_ITER);

            resultsS.push(current_state[0]);
            resultsE.push(current_state[1]);
            resultsI.push(current_state[2]);
            resultsR.push(current_state[3]);
        }

        /* Showing the results on the screen: */

        drawTable(resultsS, resultsE, resultsI, resultsR);
        drawChart(resultsS, resultsE, resultsI, resultsR);

        /* Telling the user the results are on the screen: */

        document.getElementById("evaluate-alert").classList.add("alert-info");
        document.getElementById("evaluate-alert").classList.remove("alert-warning");
        document.getElementById("evaluate-alert").innerHTML = "Gráfico e tabela gerados com sucesso!";
    }, 50);
});
