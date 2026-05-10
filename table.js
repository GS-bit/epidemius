function drawTable(resultsS, resultsE, resultsI, resultsR){
    /* It draws a table on the page to show the results.
     * resultsS: an array containing the daily values of S, in which resultsS[0] is the first day
     * resultsE: an array containing the daily values of E, in which resultsE[0] is the first day
     * resultsI: an array containing the daily values of I, in which resultsI[0] is the first day
     * resultsR: an array containing the daily values of R, in which resultsR[0] is the first day
     */

    if(!(resultsS.length === resultsE.length && resultsE.length === resultsI.length && resultsI.length == resultsR.length)){
        return;
    }

    document.getElementById("results-table").querySelector("tbody").innerHTML = ""; // Since the user can perform a calculation after another, it's important to clean the table first

    for(let i = resultsS.length - 1; i >= 0; i--){
        document.getElementById("results-table").querySelector("tbody").insertAdjacentHTML("afterbegin", `<tr>
        <td>${i}</td>
        <td>${Math.round(resultsS[i])}</td>
        <td>${Math.round(resultsE[i])}</td>
        <td>${Math.round(resultsI[i])}</td>
        <td>${Math.round(resultsR[i])}</td>
        </tr>`); // We use round here, but not on the results arrays, because, on the calculating realm, we need the precise results. However, to the user, we need to show the numbers on an appropriate format.
    }

    document.getElementById("results-table").style.display = "";
}
