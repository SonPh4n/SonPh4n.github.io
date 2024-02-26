const bannerTexts = [
    "The variety in these images is outstanding",
    "The quality and detail is exquisite",
    "The color is very vibrant and has good contrast",
    "These images are very serene",
    "The color palette in these images is perfectly chosen"
];

let currentIndex = 0;

const slide = () => {
    const bannerElement = document.getElementById("banner");
    bannerElement.innerText = bannerTexts[currentIndex];
    currentIndex = (currentIndex + 1) % bannerTexts.length;
}

let imagesWithAttributions = [
    {
        src: "images/garden.jpg",
        attributionHTML: `<a href="https://www.freepik.com/free-photo/amazing-shot-beautiful-butchart-gardens-brentwood-bay_20496783.htm#query=landscape&position=27&from_view=keyword&track=sph&uuid=16f8afcf-90c6-4cae-8249-a03fef90c6f4">Image by wirestock</a> on Freepik`
    },
    {
        src: "images/golden.jpg",
        attributionHTML: `<a href="https://www.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_11342065.htm#query=landscape&position=7&from_view=keyword&track=sph&uuid=16f8afcf-90c6-4cae-8249-a03fef90c6f4">Image by wirestock</a> on Freepik`
    },
    {
        src: "images/mountain-lake.jpg",
        attributionHTML: `<a href="https://www.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_40965130.htm#query=landscape&position=0&from_view=keyword&track=sph&uuid=8e520e53-3fb6-4e41-9da7-682c824a94f7">Image by vecstock</a> on Freepik`
    },
    {
        src: "images/small-house.jpg",
        attributionHTML: `<a href="https://www.freepik.com/free-photo/small-houses-green-field-with-dark-sky_7553929.htm#query=landscape&position=39&from_view=keyword&track=sph&uuid=16f8afcf-90c6-4cae-8249-a03fef90c6f4">Image by wirestock</a> on Freepik`
    },
    {
        src: "images/snow.jpg",
        attributionHTML: `<a href="https://www.freepik.com/free-photo/beautiful-scenery-lot-leafless-trees-snow-covered-land-during-sunset_10990489.htm#query=landscape&position=38&from_view=keyword&track=sph&uuid=16f8afcf-90c6-4cae-8249-a03fef90c6f4">Image by wirestock</a> on Freepik`
    }
];


const displayAllImagesAndAttributions = () => {
    const imageArrayElement = document.getElementById("imageArray");

    imageArrayElement.innerHTML = '';

    imagesWithAttributions.forEach(image => {

        const imgElement = document.createElement("img");
        imgElement.src = image.src;
        
        imgElement.alt = "Image";
        imageArrayElement.appendChild(imgElement);

        const attributionElement = document.createElement("p");

        attributionElement.innerHTML = image.attributionHTML;
        imageArrayElement.appendChild(attributionElement);


    });
};


window.onload = () => {
    setInterval(slide, 2000);
    displayAllImagesAndAttributions();
}
