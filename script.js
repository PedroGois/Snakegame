let canvas = document.getElementById("snake");
let context = canvas.getContext("2d")
let box = 32;
let jogo = 0;
let snake = [];
snake[0] = {x: 8 * box, y: 8 * box}

let direction = "up";
let food = {
    x:Math.floor(Math.random() * 16) * box,
    y:Math.floor(Math.random() * 16) * box
}

function criarBG(){
    context.fillStyle = "rgb(50, 0,0)";
    context.fillRect (0, 0, 16*box, 16*box)
}

function criarSnake(){
    for (i=0; i < snake.length; i++){
        context.fillStyle="red";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }    
}
function drawfood(){
    context.fillStyle="green";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown',update);

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}
function jogar(){
    jogo = setInterval(IniciarJogo,150);
}

function IniciarJogo(){
    document.getElementById("Iniciar").innerHTML = "<style> #Iniciar{display:none;} #snake{display:inline;} </style>";
    if (snake[0].x > 15 * box && direction=="right")snake[0].x = 0;
    if (snake[0].x < 0 && direction=="left")snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction=="down")snake[0].y = 0;
    if (snake[0].y < 0 && direction=="up")snake[0].y = 16 * box;

    for (i = 1; i < snake.length; i++){
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            jogo = 0;
            document.getElementById("perdeu").innerHTML="Você Perdeu! <style>#perdeu {display:inline;}</style>";
            document.getElementById("reiniciar").innerHTML="Reiniciar! <style>#reiniciar{display:inline;}</style>";
            document.getElementById("snake").innerHTML="<style> #snake{display:none;} </style>"
        }
    }

    criarBG();
    criarSnake();
    drawfood();    
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX +=box;
    if (direction == "left") snakeX -=box;
    if (direction == "up") snakeY -=box;
    if (direction == "down") snakeY +=box;
    
    if (snakeX != food.x || snakeY != food.y){
        snake.pop();
        
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }
    let newHead = {
        x:snakeX , y: snakeY
    }

    snake.unshift(newHead);

    
}

