function rungekuttaSEIR(t0, initial_state, tf, derivatives, n_iter){
    /* It performs fourth order Runge-Kutta method on SEIR.
     * t0: initial time value
     * initial_state: an array containing the initial values of S, E, I and R, in this exact order
     * tf: final time value
     * derivatives: an array containing the derivatives dS_dt, dE_dt, dI_dt and dR_dt, in this exact order
     * n_iter: number of iteractions
     *
     * The function returns an array containg the values of S, E, I and R at the final time, in this exact order
     */

    const H = (tf - t0) / n_iter;

    let t = t0;
    let y = [...initial_state];
    let k1, k2, k3, k4;

    for(let i = 0; i < n_iter; i++){
        k1 = derivatives(y[0], y[1], y[2]);
        k2 = derivatives(y[0] + H * k1[0]/2, y[1] + H * k1[1]/2, y[2] + H * k1[2]/2);
        k3 = derivatives(y[0] + H * k2[0]/2, y[1] + H * k2[1]/2, y[2] + H * k2[2]/2);
        k4 = derivatives(y[0] + H * k3[0], y[1] + H * k3[1], y[2] + H * k3[2]);

        for(let j = 0; j < y.length; j++){
            y[j] += H * (k1[j] + 2*k2[j] + 2*k3[j] + k4[j]) / 6;
        }

        t += H;
    }

    return y;
}

const evaluate_button = document.getElementById("evaluate-button");

evaluate_button.addEventListener("click", ()  => {
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

    /* Derivatives: */

    const derivatives = (s, e, i) => {
        const dS_dt = -rt / tinf * i * s / n;
        const dE_dt = rt / tinf * i * s / n - e/tinc;
        const dI_dt = e/tinc - i/tinf;
        const dR_dt = i/tinf;

        return [dS_dt, dE_dt, dI_dt, dR_dt];
    }

    /* Current state of S, E, I and R: */

    let current_state = [n - io, 0, io, 0];

    /* These are the arrays used to store the results: */

    let results_s = [current_state[0]];
    let results_e = [current_state[1]];
    let results_i = [current_state[2]];
    let results_r = [current_state[3]];

    /* Calculating: */

    const N_ITER = 100;

    for(let t = 0; t < ts; t++){
        current_state = rungekuttaSEIR(t, current_state, t+1, derivatives, N_ITER);

        results_s.push(current_state[0]);
        results_e.push(current_state[1]);
        results_i.push(current_state[2]);
        results_r.push(current_state[3]);
    }

    results_s.reverse();
    results_e.reverse();
    results_i.reverse();
    results_r.reverse();

    /* Showing the results on the screen: */

    document.getElementById("results-table").querySelector("tbody").innerHTML = "";

    for(let i = ts; i >= 0; i--){
        console.log(i);
        document.getElementById("results-table").querySelector("tbody").insertAdjacentHTML("afterbegin", `<tr>
        <td>${i}</td>
        <td>${Math.round(results_s[i])}</td>
        <td>${Math.round(results_e[i])}</td>
        <td>${Math.round(results_i[i])}</td>
        <td>${Math.round(results_r[i])}</td>
        </tr>`); // We use round here, but not on the results arrays, because, on the calculating realm, we need the precise results. However, to the user, we need to show the numbers on an appropriate format.
    }

    document.getElementById("results-table").style.display = "";

    /* Setting default settings: */

    document.getElementById("evaluate-button").innerHTML = "Processar dados";
    document.getElementById("evaluate-button").classList.replace("btn-secondary", "btn-primary");

    const ctx = document.getElementById("chart").getContext("2d");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: "Gráfico",
            datasets: [{
                label: "Suscetíveis",
                data: results_s,
                borderColor: "#4bc0c0",
                backgroundColor: "#4bc0c0",
                borderWidth: 2,
                fill: false
            },

            {
                label: "Expostos",
                data: results_e,
                borderColor: "#ff6384",
                backgroundColor: "#ff6384",
                borderWidth: 2,
                fill: false
            },

            {
                label: "Infectados",
                data: results_i,
                borderColor: "#36a2eb",
                backgroundColor: "#36a2eb",
                borderWidth: 2,
                fill: false
            },

            {
                label: "Recuperados",
                data: results_r,
                borderColor: "#ffcd56",
                backgroundColor: "#ffcd56",
                borderWidth: 2,
                fill: false
            }]
        },

        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },

            plugins: {
                zoom: {
                    pan: {
                        enabled: true,
                        mode: 'xy',
                        threshold: 10
                    },
                    zoom: {
                        wheel: {
                            enabled: true
                        },

                        pinch: {
                            enabled: true
                        },

                        mode: 'xy',
                    }
                }
            }
        }
    });
});
