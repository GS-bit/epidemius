function dS_dt(x, y){
    return;
}

function dE_dt(x, y){
    return;
}

function dI_dt(x, y){
    return;
}

function dR_dt(x, y){
    return;
}

function rungekutta(x0, f0, xf, df, results){
    /* It performs fourth order Runge-Kutta method.
     * x0: initial value of x (usually 0)
     * f0: initial value of the function (f(x0))
     * xf: final value of x
     * df: the derivative of the function
     * results: an array in which the results will be stored. The index i represents the value during the i-th iteraction.
     */

    const H = 0.001;

    results[0] = f0;

    let x = x0;
    let y = f0;
    let k1, k2, k3, k4;

    for(let i = 1; x < xf; i++){
        k1 = df(x, y);
        k2 = df(x + H/2, y + H * k1/2);
        k3 = df(x + H/2, y + H * k2/2);
        k4 = df(x + H, y + H * k3);

        y = results[i-1] + H * (k1 + 2*k2 + 2*k3 + k4) / 6;
        x += H;

        results[i] = y;

        if(x > xf && x - xf < 0.000001){
            break;
        }
    }
}

document.getElementById("evaluate-button").addEventListener("click", ()  => {
    /* Telling the user we have to wait the process: */

    document.getElementById("evaluate-button").innerHTML = "Processando dados...";
    document.getElementById("evaluate-button").classList.replace("btn-primary", "btn-secondary");

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

    /* These are the arrays used to store the results: */

    let results_s = [];
    let results_e = [];
    let results_i = [];
    let results_r = [];

    /* Calculating: */

    rungekutta(x0, f0, xf, dS_dt, results_s);
    rungekutta(x0, f0, xf, dE_dt, results_e);
    rungekutta(x0, f0, xf, dI_dt, results_i);
    rungekutta(x0, f0, xf, dR_dt, results_r);

    /* Showing the results on the screen: */

    for(let i = 0; i < ts; i++){
        document.getElementById("results-table").querySelector("tbody").insertAdjacentHTML("afterbegin", `<tr>
        <td>${i}</td>
        <td>${results_s[i]}</td>
        <td>${results_e[i]}</td>
        <td>${results_i[i]}</td>
        <td>${results_r[i]}</td>
        </tr>`);
    }

    document.getElementById("results-table").style.display = "";

    /* Setting default settings: */

    document.getElementById("evaluate-button").innerHTML = "Processar dados";
    document.getElementById("evaluate-button").classList.replace("btn-secondary", "btn-primary");
});

