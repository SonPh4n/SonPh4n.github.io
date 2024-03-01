class Tree{
    constructor(title, type, growthRate, height, lifespan, habitat, description, pic){
        this.title = title;
        this.type = type;
        this.growthRate = growthRate;
        this.height = height;
        this.lifespan = lifespan;
        this.habitat = habitat;
        this.description = description;
        this.pic = pic;
    }

    get item(){
        const treeSection = document.createElement("section");
        treeSection.classList.add("treethingy", "items");

        const heading = document.createElement("h3");
        heading.innerText = this.title;
        treeSection.appendChild(heading);

        const columns = document.createElement("section");
        columns.classList.add("columns");
        treeSection.appendChild(columns);

        const imageSection = document.createElement("section");
        columns.append(imageSection);
        const image = document.createElement("img");
        image.src = "images/" + this.pic;
        imageSection.appendChild(image);

        
        return treeSection;
    }

    paragraph(title, info) {
        const p = document.createElement("p");
        p.innerHTML = `<strong>${title}:</strong> ${info}`;
        return p;
    }


    get expandedSection() {
        const detailsSection = document.createElement("section");
        detailsSection.append(this.paragraph("Title", this.title));
        detailsSection.append(this.paragraph("Type", this.type));
        detailsSection.append(this.paragraph("Growth Rate", this.growthRate));
        detailsSection.append(this.paragraph("Height", this.height));
        detailsSection.append(this.paragraph("Lifespan", this.lifespan));
        detailsSection.append(this.paragraph("Habitat", this.habitat));
        detailsSection.append(this.paragraph("Description", this.description));
    
        return detailsSection;
    }
    
    
}



function attachEventToTreeItem(treeItem, tree, treeDetails) {
    treeItem.addEventListener("click", () => {
        const detailsSection = document.getElementById("dialog-details");
        const imageSection = document.getElementById("dialog-image");

        detailsSection.innerHTML = "";
        imageSection.innerHTML = "";

        detailsSection.appendChild(treeDetails);
        
        const image = document.createElement("img");
        image.src = "images/" + tree.pic; 
        imageSection.appendChild(image);

        document.getElementById("dialog").style.display = "block";
    });
}


document.getElementById("dialog-close").onclick = () => {
    document.getElementById("dialog").style.display = "none";
};


window.onload = () => {
    let trees = [];
    let treeList = document.getElementById("tree-list")

    trees.push(new Tree("Bald Cypress", "Deciduous conifer", "Fast Growth", "60-80 ft", "600 years", "Wet soils and flood plains", "Bald cypresses are long-lived and slow-growing; old trees are usually hollow. A young bald cypress is symmetrical and pyramidal. As it matures, it develops a coarse wide-spreading head. Its tapering trunk is usually 30 metres (about 100 feet) tall and 1 metre (3.3 feet) in diameter.", "BaldCypressPic.jpeg"));
    trees.push(new Tree("Eastern Redbud", "Deciduous", "Fast Growth", "20 ft", "60 years", "Forest understory", "Eastern redbud is a small deciduous tree. Trees typically grow 20 feet in height with a similar spread and have gracefully ascending branches and a rounded shape. Eastern redbud leaves are alternate, simple, broadly heart-shaped and 3 to 5 inches high and wide. Leaves emerge reddish, turning green as they expand", "Eastern-RedbudPic.jpeg"));
    trees.push(new Tree("Loblolly Pine", "Softwood", "Fast Growth", "60-90 ft", "240 years", "Mountainous region", "Loblolly pine belongs to the pine family (Pinaceae). It is a large tree, reaching heights of 46 meters (150 ft). The leaves occur in bundles of three and are about 15 cm (6 in) long. The cones have stout prickles on them.", "loblolly-pinePic.jpeg"));
    trees.push(new Tree("Southern Magnolia", "Evergreen", "Fast Growth", "60-80 ft", "100 years", "Coastal plain", "Southern magnolia (Magnolia grandiflora), also called evergreen magnolia, bull-bay, big-laurel, or large-flower magnolia, has large fragrant white flowers and evergreen leaves that make it one of the most splendid of forest trees and a very popular ornamental that has been planted around the world.", "magnoliaPic.png"));

    trees.forEach((tree) => {
        let treeItem = tree.item; 
        let treeDetails = tree.expandedSection; 
        attachEventToTreeItem(treeItem, tree, treeDetails); 
        treeList.append(treeItem);
    });
   
};