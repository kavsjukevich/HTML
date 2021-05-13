function startGame() {
    time = 0;
    timer = setInterval(function() {
        time++;
      }, 1000);

    var library = [ // bildes.
        'https://i.imgur.com/RtybSAO.jpg',
        'https://i.imgur.com/Q8dp4MV.png',
        'https://i.imgur.com/R5sNgWR.jpg',
        'https://i.imgur.com/AcX8GY6.png',
        'https://i.imgur.com/4x5q4ZI.jpg',
        'https://i.imgur.com/vgyHo0B.png',
        'https://i.imgur.com/KCpSTtL.jpg',
        'https://i.imgur.com/QRreOKX.jpg',
        'https://i.imgur.com/ueMgXvG.jpg',
        'https://i.imgur.com/E4gWCyo.jpg',
        'https://i.imgur.com/gbk9EXa.jpg',
        'https://i.imgur.com/JCUjCvS.png',
        'https://i.imgur.com/6SiDpVh.jpg',
        'https://i.imgur.com/kQg15sO.jpg',
        'https://i.imgur.com/Xn5wazo.jpg',
        'https://i.imgur.com/OCwEoCa.png',
        'https://i.imgur.com/zgd1s4e.jpg',
        'https://i.imgur.com/e8zW0VY.png'
    ]

    document.getElementById("playground").innerHTML = null;
    document.getElementById("result").innerHTML = " "

    var pressed = [];
    var guessed = 0;

    var n = document.getElementById("input").value;

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
            final[randNext] = library[randPic];

            while(final[randNext] != undefined || final[randNext] != null) {
                randNext = Math.floor(Math.random() * (size));
            }

            final[randNext] = library[randPic];
            var index = library.indexOf(library[randPic]);
            if (index > -1) {
                library.splice(index, 1);
            }
        }    
    }

    function divPressed() {
        if(pressed.length <= 1 && document.getElementById(this.id).style.backgroundColor == "lightgray") { // 1 / 2 click

            var id = document.getElementById(this.id).id;
            pressed.push(id);
            var object = document.getElementById(id);
            object.style.cssText = `border-radius: 1vh; height: 100px; width: 100px; background-image:url('${final[id]}');`;

            if(final[pressed[0]] == final[pressed[1]]) {
                pressed = [];
                guessed++;
            }
            else if(pressed.length == 2) {
                setTimeout(function(){ 
                    object = document.getElementById(pressed[0]);
                    object.style.cssText = `border-radius: 1vh; background-color: lightgray; height: 100px; width: 100px;`;
                    object = document.getElementById(pressed[1]);
                    object.style.cssText = `border-radius: 1vh; background-color: lightgray; height: 100px; width: 100px;`;
                    pressed = [];
                }, 1000);
            }

        }
        if(guessed == size/2) {
           document.getElementById("result").innerHTML = "Jūsu laiks - " + time + " sekundes.";
           time = 0;
        }
    }

}
