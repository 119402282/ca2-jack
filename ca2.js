// Creating variables
let canvas;
let context;

let background = [
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [55,32,33,32,33,32,33,32,33,32,33,32,33,32,33,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [47,36,37,38,39,37,39,38,39,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [47,36,37,38,39,37,39,38,39,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [47,7,5,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [47,5,4,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [47,5,5,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [47,7,7,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [47,7,7,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,34,111,17,17,17,51,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,55,46,17,17,17,51,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,47,36,5,5,4,51,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,47,36,5,5,5,5,51,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,47,7,5,4,5,7,51,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,47,6,5,5,7,5,51,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1]
   
];


let fpsInterval = 1000 / 30;
let now;
let then = Date.now();

// let IMAGES = {
//     player:"char.png", 
//     background:"dungeon.png"
// };
let backImage = new Image();
let playerImage = new Image();
let player = {
    x : 0,
    y : 0,
    width : 32,
    height : 32,
    frameX : 0,
    frameY : 0,
    size: 5,
    xChange : 0,
    yChange : 0
}


let tilesPerRow = 4;
let tileSize = 32;


let moveLeft = false;
let moveUp = false;
let moveRight = false;
let moveDown = false;

//

document.addEventListener("DOMContentLoaded", init, false);

function init() {
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");
    playerImage.src = "char.png";
    backImage.src = "dungeon.png";
    // canvas.style.width = window.innerWidth + "px";
    // canvas.style.height = window.innerHeight + "px"; 
    player.x = 150
    player.y = 430
    
    window.addEventListener("keydown", activate, false);
    window.addEventListener("keyup", deactivate, false);
    // resizeCanvas();
    draw();
}

function draw() {
    window.requestAnimationFrame(draw);
    let now = Date.now();
    let elapsed = now - then;
    if (elapsed <= fpsInterval) {
        return;
    }
    then  = now - (elapsed % fpsInterval);

    // Drawing background
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#070d30"; // light sky blue
    context.fillRect(0,0,canvas.width,canvas.height)
    for (let r = 0; r < 25; r += 1) {
        for (let c = 0; c < 32; c += 1) {
            let tile = background[r][c]; 
            if (tile >= 0) {
                let tileRow = Math.floor(tile / tilesPerRow); 
                let tileCol = Math.floor(tile % tilesPerRow);
                context.drawImage(backImage,
                    tileCol * tileSize, tileRow * tileSize, tileSize, tileSize,
                    c * tileSize, r* tileSize, tileSize, tileSize);
            }
        }
    }

    // Drawing player
    context.fillStyle = "red"
    context.drawImage(playerImage,
                player.frameX * player.width, player.frameY * player.height, player.width, player.height,
                player.x, player.y, player.width, player.height);
    // Player animation
    if (moveLeft || moveRight || moveUp || moveDown) {
        player.frameX = (player.frameX + 1) % 3;
    }
    
    // Key presses
    if (moveLeft) {
        player.x = player.x - player.size;
        player.frameY =1;
    }
    if (moveRight) {
        player.x = player.x + player.size;
        player.frameY = 2;
    }
    if (moveUp) {
        player.y = player.y - player.size;
        player.frameY=3
    }
    if (moveDown) {
        player.y = player.y + player.size;
        player.frameY=0
    }
}

function randint(min, max) {
    return Math.round(Math.random() * (max- min)) + min;
}

// Key presses
function activate(event) {
    let key = event.key;
    if (key === "ArrowLeft"){
        moveLeft = true;
    } else if (key === "ArrowUp") {
        moveUp = true;
    } else if (key === "ArrowRight") {
        moveRight = true;
    } else if (key === "ArrowDown") {
        moveDown = true;
    }
}
function deactivate(event) {
    let key = event.key;
    if (key === "ArrowLeft") {
        moveLeft = false;
    } else if (key === "ArrowUp") {
        moveUp = false;
    } else if (key === "ArrowRight") {
        moveRight = false; 
    } else if (key === "ArrowDown") {
        moveDown= false;
    }
}

// function player_collides(a) {
//     if (player.x + player.size < a.x ||
//         a.x + a.size < player.x ||
//         player.y > a.y + a.size ||
//         a.y > player.y + player.size) {
//             return false;
//         } else {
//             return true;
//         }
// }

// function stop(message) { 
//     window.removeEventListener("keydown", activate, false);
//     window.removeEventListener("keyup", deactivate, false);
//     window.cancelAnimationFrame(request_id);
//     let outcome_element = document.querySelector("#outcome");
//     outcome_element.innerHTML = message ;

//     let data = new FormData();
//     data.append("score", score);

//     xhttp = new XMLHttpRequest();
//     xhttp.addEventListener("readystatechange", handle_response, false);
//     xhttp.open("POST", "/store_score", true)
//     xhttp.send(data);
// }


// function handle_response() {
//     // Check that the response has fully arrived
//     if ( xhttp.readyState === 4 ) {
//         // Check the request was successful
//         if ( xhttp.status === 200 ) {
//             if ( xhttp.responseText === "success") {
//                 // score was successfully stores in database 
//             } else {
//                 // score was not successfully stores in database 
//             }
//         }
//     }
// }

// function update_liked_count() {
//     xhttp = new XMLHttpRequest();
//     xhttp.addEventListener("readystatechange", handle_response2, false);
//     xhttp.open("GET", "/get_num_likes", true);
//     xhttp.send(null);
// }

// function handle_response2() {
//     // Check that the response has fully arrived
//     if ( xhttp.readyState === 4 ) {
//         // Check the request was successful
//         if ( xhttp.status === 200 ) {
//             let response = JSON.parse(xhttp.responseText);
//             liked_count_element.innerHTML = response.count
//         }
//     }
// }

// function resizeCanvas() {
//     canvas.style.width = window.innerWidth + "px";
//     setTimeout(function() {
//       canvas.style.height = window.innerHeight + "px";
//     }, 0);
//   };
