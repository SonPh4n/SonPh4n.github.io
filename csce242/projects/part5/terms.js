const getTerms = async () => {
    const url = "https://sonph4n.github.io/csce242/projects/part5/terms.json"; 

    try {
        const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    };

   
window.onload = () => showTerms();
