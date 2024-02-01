
window.onload =() =>{
    const image = document.getElementById('swapimage');

    image.onclick = function(){
        image.src = 'https://place-hold.it/200x200/blue/red'
    }

    const slider = document.getElementById('myRange');
    const imager = document.getElementById('rotating');

    slider.oninput = function(){
        let angle = this.value;
        imager.style.transform = 'rotate(' + angle + 'deg)';
    }

    const box = document.getElementById('box');
    
    box.onclick = function() {
        const starImage = document.createElement('img');
        starImage.src = 'https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-star-icon-png-image_4013529.jpg'; // Replace with your actual star image URL
        starImage.style.width = '50px'; 
        starImage.style.height = '50px'; 
        box.appendChild(starImage);
    }
}