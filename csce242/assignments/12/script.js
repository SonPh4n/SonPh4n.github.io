const getHouses = async () => {
    const url = "https://portiaportia.github.io/json/house-plans.json";

    try {
        const response = await fetch(url);
        return await response.json();
    } catch(error){
        console.log(error);
    }
};


const showHouses = async () => {
    let houses = await getHouses();
    
    let housesSection = document.getElementById("houses-Section");

    houses.forEach(house =>{
        housesSection.append(getHouseItem(house));
    });
};

const getHouseItem = (house) => {
    let section = document.createElement("section");

    let h3 = document.createElement("h3");
    h3.innerText = house.name;
    section.append(h3);

    let flexContainer = document.createElement("div");
    flexContainer.className = 'flex-container'; 

    let img = document.createElement("img");
    img.src = `https://portiaportia.github.io/json/images/house-plans/${house.main_image}`;
    flexContainer.append(img); 

    let detailsContainer = document.createElement("div");
    detailsContainer.className = 'details-container';

    let ul = document.createElement("ul");
    ul.append(getLi(`Size:  ${house.size} square feet`));
    ul.append(getLi(`Bedrooms: ${house.bedrooms}`));
    ul.append(getLi(`Bathrooms: ${house.bathrooms}`));
    detailsContainer.append(ul); 

    let features = getFeatures(house.features);
    if (features !== null) {
        detailsContainer.append(features); 
    }

    flexContainer.append(detailsContainer); 
    section.append(flexContainer); 

    const floorPlansDiv = getFloorPlans(house.floor_plans);
    section.append(floorPlansDiv);

    return section;
};



const getLi = data =>{
    const li = document.createElement("li");
    li.textContent = data;
    return li;
}

const getFloorPlans = (floorPlans) => {
    const div = document.createElement("div"); 
    div.className = "floor-plans"; 

    floorPlans.forEach((floorPlan) => {
        const section = document.createElement("section");
        section.className = "floor-plan"; 

        const h4 = document.createElement("h4");
        h4.textContent = floorPlan.name;
        section.append(h4);

        const img = document.createElement("img");
        img.src = `https://portiaportia.github.io/json/images/house-plans/${floorPlan.image}`;
        section.append(img);

        div.append(section); 
    });

    return div;
};


const getFeatures = (features) => {
    if (features.length > 0) {
        const featuresText = " * " + features.join(" * ");
        const p = document.createElement("p");
        p.textContent = featuresText;
        return p; 
    } else {
        return null;
    }
};




window.onload = () => showHouses();




