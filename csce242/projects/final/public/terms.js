const getTerms = async () => {
    try {
        // const response = await fetch("http://localhost:3001/api/terms");
        const response = await fetch("https://sonph4n-github-io.onrender.com/api/terms");
        const data = await response.json();
        console.log("Fetched terms data:", data);  
        return data;
    } catch (error) {
        console.error("error retrieving json", error);
        return [];
    }
};



    const populateEditForm = (term) => {
        const form = document.getElementById("add-edit-form");
        form._id.value = term._id;
        form.name.value = term.name;
        form.definition.value = term.definition;
    
        populateRelatedTerms(term.relatedTerms); 
    
        const imgPreview = document.getElementById("img-prev");
        imgPreview.src = "/images/" + term.image;
    };

    const populateRelatedTerms = (relatedTerms) => {
        const section = document.getElementById("morerelated");
        relatedTerms.forEach((relatedTerm) => {
            const input = document.createElement("input");
            input.type = "text";
            input.value = relatedTerm;
            section.append(input);
            section.append(document.createElement("br")); 
        });
    };

    const deleteTerm = async (term) => {
        let response = await fetch(`/api/terms/${term._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            }
        });
    
        if (response.status === 200) {
            console.log("Term deleted successfully.");
            document.getElementById("term-list").innerHTML = '';
            showTerms(); 
        } else {
            console.log("Error deleting term.");
        }
    };

    const addEditForm = async (e) => {
        e.preventDefault();
        const form = document.getElementById("add-edit-form");
        const formData = new FormData(form);
        
        const relatedTerms = getRelatedTerms();
        relatedTerms.forEach(term => {
            formData.append('relatedTerms', term);
        });
    
        console.log("FormData Contents:", ...formData.entries());
    
        let response;
        if(form._id.value.trim() == "") {
            response = await fetch("/api/terms", {
                method: "POST",
                body: formData,
            });
        } else {
            console.log("Attempting to put data");
            response = await fetch(`/api/terms/${form._id.value}`, {
                method: "PUT",
                body: formData,
            });
        }
    
        if(response.status != 200){
            console.error("Error contacting server", await response.text());
            return;
        }
    
        await response.json();
        resetForm();
        document.getElementById("add-edit-modal").style.display = "none";
        showTerms(); 
    };
    
    
    const getRelatedTerms = () => {
        const inputs = document.querySelectorAll("#morerelated input");
        const relatedTerms = [];
    
        inputs.forEach((input)=>{
            relatedTerms.push(input.value);
        });
    
        return relatedTerms;
    };

    const resetForm = () => {
        const form = document.getElementById("add-edit-form");
        form.reset();
        document.getElementById("morerelated").innerHTML = "";
        document.getElementById("img-prev").src="";
        form._id.value = "";
    };

    function setFormMode(isEditMode) {
        const imageInput = document.getElementById('image');
        if (isEditMode) {
            imageInput.removeAttribute('required');
        } else {
            imageInput.setAttribute('required', '');
        }
    }

    const headerMap = {
        'Name': 'name',
        'Definition': 'definition',
        'Image': 'image',
        'Related Terms': 'relatedTerms',
        'Difficulty Level': 'difficultyLevel'
    };
    
    const showTerms = async () => {
        let termsData = await getTerms();
    
        let mainDiv = document.querySelector('.main');
        mainDiv.innerHTML = '';
    
        let table = document.createElement("table");
        let headerRow = table.insertRow();
        let headers = ["Name", "Definition", "Image", "Related Terms", "Difficulty Level"];
        headers.forEach(headerText => {
            let headerCell = document.createElement("th");
            headerCell.textContent = headerText;
            headerRow.append(headerCell);
        });
    
        termsData.forEach(term => {
            let row = table.insertRow();
            row.addEventListener('click', () => openModalWithTerm(term));  
            headers.forEach(header => {
                let cell = row.insertCell();
                let key = headerMap[header];
                let value = term[key];
                if (key === "image" && value) {
                    let img = document.createElement("img");
                    img.src = "/images/" + term.image; 
                    img.alt = "Term Image";
                    cell.append(img);

                } else if (Array.isArray(value)) {
                    cell.textContent = value.join(", ");
                } else {
                    cell.textContent = value || "";
                }
            });
        });
    
        mainDiv.append(table);
    };

function openModalWithTerm(term) {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";

    var modalContent = modal.querySelector(".modal-content");
    modalContent.innerHTML = '<span class="close">&times;</span>'; //simplified stack clear

    var flexContainer = document.createElement("div");
    flexContainer.className = "modal-flex-container";

    var imgDiv = document.createElement("div");
    imgDiv.className = "modal-img-container";
    var img = document.createElement("img");
    img.src = "/images/" + term.image;
    img.alt = "Term Image";
    imgDiv.append(img);
    flexContainer.append(imgDiv);

    var textContentDiv = document.createElement("div");
    textContentDiv.className = "modal-text-container";

    var name = document.createElement("h2");
    name.textContent = term.name;
    textContentDiv.append(name);

    var definition = document.createElement("p");
    definition.textContent = term.definition;
    textContentDiv.append(definition);

    var difficulty = document.createElement("p");
    difficulty.textContent = "Difficulty Level: " + term.difficultyLevel;
    textContentDiv.append(difficulty);

    if (term.relatedTerms && term.relatedTerms.length) {
        var relatedTermsHeader = document.createElement("h3");
        relatedTermsHeader.textContent = "Related Terms";
        textContentDiv.append(relatedTermsHeader);

        var ul = document.createElement("ul");
        term.relatedTerms.forEach(relatedTerm => {
            var li = document.createElement("li");
            li.textContent = relatedTerm;
            ul.append(li);
        });
        textContentDiv.append(ul);
    }

    flexContainer.append(textContentDiv);
    modalContent.append(flexContainer);

     var editButton = document.createElement("button");
     editButton.textContent = "Edit";
     editButton.onclick = function() {
         console.log("Edit button clicked");
         populateEditForm(term); 
         document.getElementById("myModal").style.display = "none"; 
         document.getElementById("add-edit-modal").style.display = "block"; 
     };
     modalContent.append(editButton); 
 
     var deleteButton = document.createElement("button");
     deleteButton.textContent = "Delete";
     deleteButton.onclick = function() {
        console.log("delete button clicked");
        deleteTerm(term);
        document.getElementById("myModal").style.display = "none"; 
     };
     modalContent.append(deleteButton); 
    modal.querySelector('.close').onclick = function() {
        modal.style.display = "none";
    };

}

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById("add-link").addEventListener("click", function(event) {
        event.preventDefault();
        resetForm(); 
        document.getElementById("add-edit-modal").style.display = "block";
    });

    document.querySelector("#add-edit-modal .close").onclick = function() {
        document.getElementById("add-edit-modal").style.display = "none";
    };

    document.getElementById("addRelatedButton").addEventListener("click", function() {
        const newRelatedTermInput = document.createElement("input");
        newRelatedTermInput.type = "text";
        newRelatedTermInput.required = true;
    
        const breakLine = document.createElement("br");
    
        morerelated.append(newRelatedTermInput);
        morerelated.append(breakLine);
    });

    document.getElementById("cancelbutton").addEventListener("click", function() {
        resetForm();
        document.getElementById("add-edit-modal").style.display = "none";
    });
    
    
    window.onclick = function(event) {
        if (event.target == document.getElementById("myModal")) {
            document.getElementById("myModal").style.display = "none";
        } else if (event.target == document.getElementById("add-edit-modal")) {
            document.getElementById("add-edit-modal").style.display = "none";
        }
    };
});


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
    document.getElementById("add-edit-form").onsubmit = addEditForm;
    initializeDropdowns();
};
   

document.getElementById("image").onchange = (e) => {
    const prev = document.getElementById("img-prev");

    if(!e.target.files.length){
        prev.src = "";
        return;
    }

    prev.src = URL.createObjectURL(e.target.files.item(0));
}
