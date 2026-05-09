document.querySelectorAll(".input-positive-int").forEach((input) => {
    let inputValue = input.value;

    input.addEventListener("input", (event) => {
        if(event.data != null){
            if(!(event.data >= "0" && event.data <= "9")){ // User typed a character that is not a digit
                event.target.value = inputValue; // Character won't be displayed and stored
            }

            else{
                inputValue = event.target.value;
            }
        } else{
            inputValue = event.target.value;
        }
    })
});

document.querySelectorAll(".input-positive-float").forEach((input) => {
    let inputValue = input.value;

    input.addEventListener("input", (event) => {
        if(event.data != null){
            if(!(event.data >= "0" && event.data <= "9")){ // User typed a character that is not a digit
                if(event.data == ","){
                    event.target.value = event.target.value.replace(",", ".");
                }

                let nOfDots = event.target.value.split(".").length - 1;

                if((event.data == "." || event.data == ",") && nOfDots <= 1){
                    inputValue = event.target.value;
                }

                else{
                    event.target.value = inputValue; // Character won't be displayed and stored
                }
            }

            else{
                inputValue = event.target.value;
            }
        } else{
            inputValue = event.target.value;
        }
    })
});

document.querySelectorAll(".input-apply-bounds").forEach((input) => {
    input.addEventListener("change", (event) => {
        console.log("point 0");

        let inputValue = parseFloat(event.target.value);

        if(isNaN(inputValue)){
            return;
        }

        console.log("point 1");

        let maxBound = parseFloat(event.target.max);
        let minBound = parseFloat(event.target.min);

        console.log("point 2");

        if(!isNaN(maxBound) && inputValue > maxBound){
            event.target.value = maxBound;
            console.log("point 3a");
        }

        if(!isNaN(minBound) && inputValue < minBound){
            event.target.value = minBound;
            console.log("point 3b");
        }

        console.log("point 4");
    })
});
