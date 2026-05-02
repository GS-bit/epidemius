document.getElementById("evaluate-button").addEventListener("click", ()  => {
    /* These are the variables used to perform the evaluations in the calculator: */

    let n = parseInt(document.getElementById("n").value); // Population size
    let io = parseInt(document.getElementById("io").value); // Inital number of infected
    let r0 = parseFloat(document.getElementById("r0").value); // Basic reproduction number (from 0 to 10)
    let theta = parseFloat(document.getElementById("theta").value); // Percentage reduction in transmission (from 0 to 1)

    let rt = (1 - theta) * r0; // Adjusted basic reproduction number

    let delta = parseFloat(document.getElementById("delta").value); // Mortality rate (from 0 to 100%)
    let tau = parseFloat(document.getElementById("tau").value); // Hospitalization rate (from 0 to 100%)

    let tinf = parseFloat(document.getElementById("tinf").value); // Time (in days) the patient is infected
    let tinc = parseFloat(document.getElementById("tinc").value); // Incubation period (in days)
    let tm = parseFloat(document.getElementById("tm").value); // Time (in days) from the end of the incubation period to death
    let tint = parseFloat(document.getElementById("tint").value); // Hospitalization time (in days)
    let trec = parseFloat(document.getElementById("trec").value); // Recovery time (in days) for mild cases
    let thosp = parseFloat(document.getElementById("thosp").value); // Time (in days) elapsed until hospitalization

    let ts = parseInt(document.getElementById("ts").value); // Simulation time (days)

    /* These are the derivatives: */

    let dS_dt;
    let dE_dt;
    let dI_dt;
    let dR_dt;
});

