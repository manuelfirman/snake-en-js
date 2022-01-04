//asignation to css class
document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    //variables
    const width = 10
    let appleIndex = 0
    let currentSnake = [2,1,0]
    let currentIndex = 0 // el primer div del grid.

    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0

    //START AND RESTART
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }

    // resultado del movimiento de la serpiente
        function moveOutcomes() {
            // choque de serpiente contra los bordes o contra si misma
            if (
                (currentSnake[0] + width >= (width*width) && direction === width) || // si choca abajo
                (currentSnake[0] % width === width -1 && direction === 1) || // si choca la pared derecha
                (currentSnake[0] % width === 0 && direction === -1) || //si choca la pared izquierda
                (currentSnake[0] - width < 0 && direction === -width) || // si choca arriba
                squares[currentSnake[0] + direction].classList.contains('snake') // si se choca a si misma
            ) {
                return clearInterval(interval) // limpiar intervalo
            }

            const tail = currentSnake.pop() //remove last item of the array and shows it
            squares[tail].classList.remove('snake') // remove class of snake from the TAIL
            currentSnake.unshift(currentSnake[0] + direction) // gives direction to the head of the array

            if(squares[currentSnake[0]].classList.contains('apple')) {
                squares[currentSnake[0]].classList.remove('apple')
                squares[tail].classList.add('snake')
                currentSnake.push(tail)
                randomApple()
                score++
                scoreDisplay.textContent = score
                clearInterval(interval)
                intervalTime = intervalTime * speed
                interval = setInterval(moveOutcomes, intervalTime)
            }
            squares[currentSnake[0]].classList.add('snake')
        }
        
        // Generar una manzana cuando come
        function randomApple() {
            do{
                appleIndex = Math.floor(Math.random() * squares.length)
            } while(squares[appleIndex].classList.contains('snake')) // asegurando que aparezca la manzana
            squares[appleIndex].classList.add('apple')


        }




    //functions to keycodes
    function control(e) {
        squares[currentIndex].classList.remove('snake')

        if(e.keyCode === 39) {
            direction = 1 // presionando flecha derecha
        } else if (e.keyCode === 38) {
            direction = -width // presionando flecha de arriba
        } else if (e.keyCode === 37) {
            direction = -1 // presionando flecha izquierda
        } else if (e.keyCode === 40) {
            direction = +width // presionando flecha de abajo
        }
    }


document.addEventListener('keyup', control)
startBtn.addEventListener('click', startGame)
})