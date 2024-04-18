const getTerms = async () => {

    try {
        let response = await fetch("http://localhost:3001/api/terms");
            return await response.json();
        } catch (error) {
            console.log("error retrieving json");
            return "";
        }
    };

    const populateEditForm = (term) => {
        const form = document.getElementById("add-edit-form");
        form._id.value = term._id;
        form.name.value = term.name;
        form.definition.value = term.definition;
    
        populateRelatedTerms(term.relatedTerms); 
    
        const imgPreview = document.getElementById("img-prev");
        imgPreview.src = "/images/" + term.image_name;
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
            document.getElementById("craft-list").innerHTML = ''; //change this because it should be sent to the table
            showTerms(); 
        } else {
            console.log("Error deleting term.");
        }
    };

    const addEditForm = async (e) => {
        e.preventDefault();
        const form = document.getElementById("add-edit-form");
        const formData = new FormData(form);
        
        formData.append("relatedTerms", getRelatedTerms());
        console.log(...formData);
    
        if(form._id.value.trim() == "") {
            console.log("in post");
            response = await fetch("/api/terms", {
                method: "POST",
                body: formData,
            });
        } else {
            response = await fetch(`/api/terms/${form._id.value}`, {
                method: "PUT",
                body: formData,
            });
        }
    
        //error
        if(response.status != 200){
            console.log("Error contacting server");
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

    const showTerms = async () => {
        let termsData = await getTerms(); 
        let termsArray = termsData;  
    
        let termsTable = document.createElement("table");
        let headerRow = termsTable.insertRow();
        let headers = ["ID", "Name", "Definition", "Image", "Related Terms", "Difficulty Level"];
        headers.forEach(headerText => {
            let headerCell = document.createElement("th");
            headerCell.textContent = headerText;
            headerRow.appendChild(headerCell);
        });
    
        if (Array.isArray(termsArray)) {
            termsArray.forEach(term => {
                let row = termsTable.insertRow();
                Object.values(term).forEach((value, index) => {
                    let cell = row.insertCell();
                    if (Array.isArray(value)) { 
                        cell.textContent = value.join(", ");
                    } else if (typeof value === 'string' && headers[index] === "Image") {  // Assuming 'Image' is the field to handle images
                        let img = document.createElement("img");
                        img.src = value;
                        img.alt = "Cooking Term Image";
                        cell.appendChild(img);
                    } else { 
                        cell.textContent = value.toString();
                    }
                });
            });
        } else {
            console.error('Received data is not an array:', termsData);
        }
        
        let mainDiv = document.querySelector('.main'); 
        if (mainDiv) {
            mainDiv.appendChild(termsTable); 
        }
    };
    

function openModalWithTerm(term) {


    var modalContent = modal.querySelector(".modal-content");
    modalContent.innerHTML = '<span class="close">&times;</span>'; //simplified stack clear


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
