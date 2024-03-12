const getTerms = async () => {
    const url = "https://sonph4n.github.io/csce242/projects/part5/terms.json"; // Change to the actual path of your terms.json file ... file path still not working

    try {
        const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    };

   
window.onload = () => showTerms();
