
window.onload =() =>{
    const image = document.getElementById('swapimage');
    const form = document.getElementById('commandf');
    const commandInput = document.getElementById('command');

    form.onsubmit = function(e){
        e.preventDefault();
        const command = commandInput.value.trim().toLowerCase();
        if (command === 'b') {
            image.src = 'images/read.jpg';
        } else if (command === 'c') {
            image.src = 'images/clown.jpg';
        } else if (command === 'p') {
            image.src = 'images/birthday.jpg';
        } else if (command === 'r') {
            image.src = 'images/rain.jpg';
        } else if (command === 's') {
            image.src = 'images/shovel.jpg';
        } else if (command === 'w') {
            image.src = 'images/work.jpg';
        } else {
            alert('Invalid command. Please enter a valid one.');
            return;
        }
    }


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
    exercise2.style.display = 'none'; 

    

    const linkExercise1ham = document.getElementById('linkExercise1ham');
    const linkExercise2ham = document.getElementById('linkExercise2ham');
    const exercise1ham = document.querySelector('.exercise1');
    const exercise2ham = document.querySelector('.exercise2');

    linkExercise1ham.onclick = function() {
        exercise1ham.style.display = 'block'; 
        exercise2ham.style.display = 'none';
    };

    linkExercise2ham.onclick = function() {
        exercise1ham.style.display = 'none'; 
        exercise2ham.style.display = 'block'; 
    };


    
    
    



    const slider = document.getElementById('myRange');
    const imager = document.getElementById('rotating');

    slider.oninput = function(){
        let imageNumber = this.value;
        imager.src = 'images/yoga' + imageNumber + '.jpg';
    }


}

function toggleMenu() {
    var myLinks = document.getElementById("myLinks");
    var downCaret = document.getElementById("downcaretid");
    var upCaret = document.getElementById("upcaretid");
    
    if (myLinks.style.display === "block") {
        myLinks.style.display = "none";
        downCaret.style.display = "block"; 
        upCaret.style.display = "none"; 
    } else {
        myLinks.style.display = "block";
        downCaret.style.display = "none"; 
        upCaret.style.display = "block"; 
    }
}