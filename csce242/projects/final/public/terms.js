const getTerms = async () => {
    const url = "https://sonph4n.github.io/csce242/projects/part5/terms.json"; 

    try {
        const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    };

const showTerms = async () => {
    let termsData = await getTerms();
    
    let termsArray = termsData.cookingTerms; 

    let termsTable = document.createElement("table");
    let headerRow = termsTable.insertRow();
    let headers = ["ID", "Name", "Definition", "Image", "Related Terms", "Difficulty Level"];
    headers.forEach(headerText => {
        let headerCell = document.createElement("th");
        headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    });

    termsArray.forEach(term => {
        let row = termsTable.insertRow();
        Object.values(term).forEach(value => {
            let cell = row.insertCell();
            if (Array.isArray(value)) { 
                cell.textContent = value.join(", ");
            } else if (typeof value === 'string' && value.includes("images/")) { 
                let img = document.createElement("img");
                img.src = value;
                img.alt = "Cooking Term Image";
                cell.appendChild(img);
            } else { 
                cell.textContent = value.toString();
            }
        });
    });
    
    let mainDiv = document.querySelector('.main'); 
    if (mainDiv) {
        mainDiv.appendChild(termsTable); 
    } 

    
};   
//added from a existing earlier js file to prevent overwriting conflicts
const initializeDropdowns = () => {
    const dropdown = document.getElementsByClassName("dropdown-btn");
    for (let i = 0; i < dropdown.length; i++) {
        dropdown[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var dropdownContent = this.nextElementSibling;
            if (dropdownContent.style.display === "block") {
                dropdownContent.style.display = "none";
            } else {
                dropdownContent.style.display = "block";
            }
        });
    }
};

window.onload = () => {
    showTerms();
    initializeDropdowns();
};
   
