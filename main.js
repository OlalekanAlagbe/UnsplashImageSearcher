const accessKey = "BwCImE7EZqnbtbV9kJKcy0MR_tJpT3t3sb3kB07dcB4";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButton = document.getElementById("show-more-button");
let page = 1;


let searchImages = async (inputData)=>{
     const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`
    let result;
     try {
        const response = await fetch(url);
        const data = await response.json();
        results = data.results
        console.log(results)
        let imageWrapper = results.map((result)=>{
            let   {urls,alt_description,links} = result
            return `<div class="search-result">
            <img src=${urls.regular} alt="Image">
            <a href=${links.self} target="_blank" rel="noopener no-referrer">${alt_description}</a>
            </div>`
        }).join("")

        page++
        searchResultsEl.innerHTML +=imageWrapper;
        
        if(page > 1){
            showMoreButton.style.display = "block";
        }
        console.log(imageWrapper)
        if(!imageWrapper.length){

            searchResultsEl.innerHTML = `<h1 class="error">Some errors occur, please try again</h1> `;
            showMoreButton.style.display = "none";
        }
    } catch (error) {
        
        searchResultsEl.innerHTML = `<h1 class="error">Some errors occur, please try again</h1> `;
        showMoreButton.style.display = "none";

     }

}



formEl.addEventListener("submit",(e)=>{
    searchResultsEl.innerHTML = ''
    e.preventDefault()
    page = 1;
    searchImages(inputEl.value)
    
})

showMoreButton.addEventListener("click", ()=>{
    searchImages(inputEl.value);
})