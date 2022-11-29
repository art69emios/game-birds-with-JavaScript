
let canvas = document.querySelector('#canvas')
let context = canvas.getContext('2d')

let bg = new Image()
let bird = new Image()
let fg = new Image()
let pipeBottom = new Image()
let pipeUp = new Image()

let popap = document.querySelector('#popap')
let scoreInfo = document.querySelector('#score')
let recordInfo = document.querySelector('#record')
let restartBtn = document.querySelector('#restart-btn')

restartBtn.addEventListener('click', function(){
   location.reload()
})

bg.src = 'img/bg.png'
bird.src = 'img/bird.png'
fg.src = 'img/fg.png'
pipeUp.src = 'img/pipeUp.png'
pipeBottom.src = 'img/pipeBottom.png'

let audioFly = new Audio()
let audioScore = new Audio()
let audioLose = new Audio()

audioFly.src = 'audio/fly.mp3'
audioScore.src = 'audio/score.mp3'
audioLose.src = 'audio/lose.mp3'

let gap = 100

let xPos = 10
let yPos = 150
let grav = 1.5
let score = 0
let record = 0

if(localStorage.getItem('record') > 0){
   record = localStorage.getItem('record')
}else{
   record = 0
}



let pipe = []


pipe[0] = {
   x: canvas.width,
   y: 0
}

document.addEventListener('keydown', move)

function move(){
   yPos -= 30
   audioFly.play()

}


function draw(){
   context.drawImage(bg, 0, 0)

   for (let i = 0; i < pipe.length; i++) {
      
      context.drawImage(pipeUp, pipe[i].x, pipe[i].y)
      context.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap)
      

      pipe[i].x--

      if(pipe[i].x == 100){
         pipe.push({
            x: canvas.width,
            y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
         })
      }

      if(yPos + bird.height >= canvas.height - fg.height || yPos  <= bg.height - canvas.height  || xPos + bird.width >= pipe[i].x && xPos + bird.height <= pipe[i].x + pipeUp.width && (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)){


         popap.style.display = 'block'
         scoreInfo.textContent = `SCORE: ${score}`
         recordInfo.textContent = `RECORD: ${record}`

         audioLose.play()
         cancelAnimationFrame(anim)


         
      }

      if(pipe[i].x == 5){
         audioScore.play()
         score++
         if(score > localStorage.getItem('record')){
            record = score
            localStorage.setItem('record', record)
         }

      }
  
   }
   



   context.drawImage(bird, xPos, yPos)

   context.drawImage(fg, 0 , canvas.height - fg.height)
   
   yPos += grav


   context.fillStyle = '#000'
   context.font = '24px Verdana'
   context.fillText(`Score: ${score}`,10, canvas.height - fg.height / 2)

   context.fillStyle = '#000'
   context.font = '24px Verdana'
   context.fillText(`Record: ${record}`,150, canvas.height - fg.height / 2)

   
   let anim = requestAnimationFrame(draw )
}

pipeBottom.onload = draw()
