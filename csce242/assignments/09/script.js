window.onload =() =>{

changeP();
document.getElementById("start").onclick = bounceball;


const linkExercise1 = document.getElementById('linkExercise1');
const linkExercise2 = document.getElementById('linkExercise2');
const exercise1 = document.querySelector('.exercise1');
const exercise2 = document.querySelector('.exercise2');

linkExercise1.onclick = function() {
    exercise1.style.display = 'block'; 
    exercise2.style.display = 'none'; 
};

linkExercise2.onclick = function() {
    exercise1.style.display = 'none'; 
    exercise2.style.display = 'block';
};

exercise1.style.display = 'block';
exercise2.style.display = 'none'; l

}


let updatePosition = null; 

const bounceball = () => {
    const startButton = document.getElementById("start");
    
    if (startButton.innerHTML.toLowerCase() === "start") {
        startButton.innerHTML = "Stop";
        let position = 0; 
        let direction = 4; 
        let maxHeight = 400; 
        const ball = document.getElementById("soccerball");
        clearInterval(updatePosition);
        updatePosition = setInterval(() => {
            position += 5 * direction;
            if (position >= maxHeight || position <= 0) {
                direction *= -1;
            }


            ball.style.top = position + "px";
        }, 15); 
    } else {
        startButton.innerHTML = "Start";
        clearInterval(updatePosition); 
    }
}

const changeP = (e) =>{
    for (let i = 1; i <= 8; i++) {
        document.getElementById(`yoga${i}`).onclick = (e) => {
            e.preventDefault(); 
            if (i === 1) {
                document.getElementById("display1").textContent = "Triangle Pose";
            } else if (i === 2) {
                document.getElementById("display2").textContent = "Downward Dog";
            } else if (i === 3) {
                document.getElementById("display3").textContent = "Ballerina";
            } else if (i === 4) {
                document.getElementById("display4").textContent = "Sitting Side Stretch";
            } else if (i === 5) {
                document.getElementById("display5").textContent = "Twister Position";
            } else if (i === 6) {
                document.getElementById("display6").textContent = "Bent Thigh Stretch";
            } else if (i === 7) {
                document.getElementById("display7").textContent = "Full Leg Stretching";
            } else if (i === 8) {
                document.getElementById("display8").textContent = "Wall Pushing";
            }
        };
    }
}


