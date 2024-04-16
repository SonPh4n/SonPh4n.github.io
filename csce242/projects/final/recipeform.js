document.addEventListener('DOMContentLoaded', function() {
    const submitRecipeForm = (e) => {
        e.preventDefault(); // Prevent form from refreshing the page

        const form = e.target;
        const recipeName = form.elements["recipe-name"].value;
        const recipeList = form.elements["recipe-list"].value;
        const recipeSteps = form.elements["recipe-steps"].value;
        const bookType = getRadioValue("bookType");
        const termsChecked = form.elements["terms"].checked;

        const resultsSection = document.getElementById("results");
        resultsSection.textContent = 'Your recipe information has been added to the system, please wait for the system to update.';
        resultsSection.classList.remove("hidden");

        setTimeout(() => {
            resultsSection.classList.add("hidden");
        }, 2000);

        const resultsDataSection = document.getElementById("resultsdata");
        const formDataParagraph = document.createElement("p");
        formDataParagraph.textContent = `Name: ${recipeName}, Recipe List: ${recipeList}, Recipe Steps: ${recipeSteps}, Book Type: ${bookType}`;
        resultsDataSection.appendChild(formDataParagraph);
    };

    const getRadioValue = (radioName) => {
        const radios = document.getElementsByName(radioName);
        for (let radio of radios) {
            if (radio.checked) {
                return radio.value;
            }
        }
        return "";
    };

    document.getElementById("form-recipe").onsubmit = submitRecipeForm;
});
