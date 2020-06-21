const cvs = document.getElementById("Snake-Game");
const ctx = cvs.getContext("2d");

const block = 30;

let snake = [];
snake[0] = {
    x : 15*block,
    y : 15*block
}
    
let food = {
    x : Math.floor(Math.random()*18)*block,
    y : Math.floor(Math.random()*18)*block
}

var score = 0;

let d;

document.addEventListener('keydown', direction);

function direction(event){
    let key = event.keyCode;
    if (key == 37 && d != 'RIGHT'){
        d = 'LEFT';
    }else if (key == 38 && d != 'DOWN'){
        d = 'UP';
    }else if (key == 39 && d != 'LEFT'){
        d = 'RIGHT';
    }else if (key == 40 && d != 'UP'){
        d = 'DOWN';
    }

};

function collision(head,array){
    for(var i=0;i<array.length;i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
};

function draw(){
    for (var i=0; i < snake.length; i++){
        ctx.fillStyle = (i == 0) ? 'blue' : 'white';
        ctx.fillRect(snake[i].x,snake[i].y,block,block);

        ctx.strokeStyle = 'red';
        ctx.strokeRect(snake[i].x,snake[i].y,block,block);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x,food.y,block,block);


    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if( d == 'UP') snakeY -= block;
    if( d == 'DOWN') snakeY += block;
    if( d == 'RIGHT') snakeX += block;
    if( d == 'LEFT') snakeX -= block;

    if(snakeX == food.x && snakeY == food.y){
        score++;
        food = {
            x : Math.floor(Math.random()*18)*block,
            y : Math.floor(Math.random()*18)*block
        }
    }else{
        snake.shift();
    }

    let newHead = {
        x : snakeX,
        y : snakeY
    };

    if(snakeX < block || snakeX > 18 * block || snakeY < block || snakeY > 18*block || collision(newHead,snake)){
        clearInterval(game);
        
    };

    snake.unshift(newHead);

}

let game = setInterval(draw,50);