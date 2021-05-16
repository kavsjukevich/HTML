function startGame() {
    time = 0;
    timer = setInterval(function() {
        time++;
      }, 1000);

    var names = [
        'Subaru',
        'BMW',
        'Peugeot',
        'Honda',
        'Seat',
        'Fiat',
        'Renault',
        'Mazda',
        'Toyota',
        'Volvo',
        'Prosche',
        'Mercedes',
        'Mitsubishi',
        'Ford',
        'Mini',
        'AlfaRomeo',
        'Skoda',
        'Audi'
    ]

    document.getElementById("playground").innerHTML = null;
    document.getElementById("result").innerHTML = " "

    var pressed = [];
    var guessed = 0;

    var n = document.getElementById("input").value;

    window.getRunningScript = () => {
        return () => {      
            return new Error().stack.match(/([^ \n])*([a-z]*:\/\/\/?)*?[a-z0-9\/\\]*\.js/ig)[0]
        }
    }
    console.log('%c Currently running script:', 'color: blue', String(getRunningScript()()).replace("/js/spele.js", "/images/cars/1.png"))

    if(n > 0 && n % 2 == 0 && n < 7) { // init

        var size = n*n;
        var temp = n*113;
        var final = [];
        final.length = size;

        document.getElementById("playground").style.cssText = `height: ${temp}px; width: ${temp}px; margin-left: 0vh;`;

        for(i = 0; i < size; i++) { // izveidot šūnas
            var block = document.createElement("div");
            block.id = i;
            block.className = "box";
            block.innerHTML = '';
            block.onclick = divPressed;
            block.style.cssText = "border-radius: 1vh; background-color: lightgray; height: 100px; width: 100px;";
            document.getElementById("playground").appendChild(block);
        }

        for(i = 0; i < size/2; i++) { // aizpildīt ar attēliem
            var randPic = Math.floor(Math.random() * (18-i));

            var randNext = 0;
            while(final[randNext] != undefined || final[randNext] != null) {
                randNext = Math.floor(Math.random() * (size));
            }
            final[randNext] = String(getRunningScript()()).replace("/js/spele.js", "/images/cars/") + names[randPic] + ".png";

            while(final[randNext] != undefined || final[randNext] != null) {
                randNext = Math.floor(Math.random() * (size));
            } //new pic

            final[randNext] = names[randPic]; // fill with pic

            var index = names.indexOf(names[randPic]);
            if (index > -1) {
                names.splice(index, 1);
            }
        }  
        console.log(final);  
    }

    function divPressed() {
        if(pressed.length <= 1 && document.getElementById(this.id).style.backgroundColor == "lightgray") { // 1 / 2 click

            var id = document.getElementById(this.id).id;
            pressed.push(id);
            var object = document.getElementById(id);
            if(String(final[id]).includes("HTML")) {
                object.style.cssText = `border-radius: 1vh; height: 100px; width: 100px; background-image:url('${final[id]}');`;
            }
            else {
                object.textContent = final[id];
                object.style.cssText = `border-radius: 1vh; height: 100px; width: 100px; background-color: white; color: black; font-size: large; text-align: center;`;
            }

            if(String(final[pressed[0]]).includes(String(final[pressed[1]])) || String(final[pressed[1]]).includes(String(final[pressed[0]]))) {
                pressed = [];
                guessed++;
            }
            else if(pressed.length == 2) {
                setTimeout(function(){ 
                    object = document.getElementById(pressed[0]);
                    object.style.cssText = `border-radius: 1vh; background-color: lightgray; height: 100px; width: 100px;`;
                    object.innerHTML = "";
                    object = document.getElementById(pressed[1]);
                    object.style.cssText = `border-radius: 1vh; background-color: lightgray; height: 100px; width: 100px;`;
                    object.innerHTML = "";
                    pressed = [];
                }, 1000);
            }

        }
        if(guessed == size/2) {
           document.getElementById("result").innerHTML = "Jūsu laiks - " + time + " sekundes.";
           time = 0;
           clearInterval(timer);
        }
    }

}

    