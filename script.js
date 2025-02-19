let searchBtn = document.getElementById("searchBtn");
let result = document.getElementById("result");
let sound = document.getElementById("sound");
let apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
let searchInput = document.getElementById("searchInput");

function fetchData(){
    let theWord = searchInput.value
    fetch(`${apiUrl}${theWord}`)
        .then((res) => res.json())
        .then((data) => {    
            result.innerHTML = `
                            <div class="word">
                            <h3>${data[0].word.charAt(0).toUpperCase()}${data[0].word.slice(1)}</h3>
                            <button onclick="playSound()"><i class="fa-solid fa-volume-high"></i></button>
                            </div>
                            <div class="details">
                                <p>${data[0].meanings[0].partOfSpeech}</p>
                                <p>/${data[0].phonetic || data[0].phonetics[2].text || ""}/</p>
                            </div>
                            <p class="word-meaning">
                                ${data[0].meanings[0].definitions[0].definition || ""}
                            </p>
                            <p class="word-example">
                                ${data[0].meanings[0].definitions[0].example || ""}
                            </p>
                            `;
            searchInput.value = ""
            sound.setAttribute("src", `${data[0].phonetics[0].audio || data[0].phonetics[1].audio || ""}`);
        })
        .catch(() => result.innerHTML = `<h3 class="error" >Could't find the word</h3>`)}

searchBtn.addEventListener("click", fetchData);
searchInput.addEventListener("keydown",(e)=>{
    if(e.key === "Enter"){
        fetchData()
    }
})

function playSound() {
    sound.play();
}
