function rungeKuttaSEIR(t0, initialState, tf, derivatives, nIter){
    /* It performs fourth order Runge-Kutta method on SEIR.
     * t0: initial time value
     * initialState: an array containing the initial values of S, E, I and R, in this exact order
     * tf: final time value
     * derivatives: an array containing the derivatives dS_dt, dE_dt, dI_dt and dR_dt, in this exact order
     * nIter: number of iteractions
     *
     * The function returns an array containg the values of S, E, I and R at the final time, in this exact order
     */

    const H = (tf - t0) / nIter;

    let t = t0;
    let y = [...initialState];
    let k1, k2, k3, k4;

    for(let i = 0; i < nIter; i++){
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
