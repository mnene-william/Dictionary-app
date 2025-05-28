const quoteText = document.querySelector("#quote");
const authorName = document.querySelector(".author")
const newQuoteBtn = document.querySelector("#newQuote");
const soundBtn = document.querySelector(".sound");
const copyBtn = document.querySelector(".copy");


 function getNewQuote() {
    newQuoteBtn.innerHTML = "Loading..."
    newQuoteBtn.classList.add("loading");

    fetch("https://api.api-ninjas.com/v1/quotes", {
        headers: {
            'X-Api-Key': 'XFDsxc3xj/8HJ+kr0Q3stg==2KHjHyFo7U7I65Km'
        }
    })
    .then(response => response.json())
    .then(result =>{console.log(result)
         quoteText.innerHTML = result[0].quote;
         authorName.innerHTML = result[0].author;
         newQuoteBtn.innerHTML = "New Quote"
         newQuoteBtn.classList.remove("loading");
    })

 }

newQuoteBtn.addEventListener("click", getNewQuote);

soundBtn.addEventListener("click", ()=> {
    let words = new SpeechSynthesisUtterance(`${quoteText.innerHTML} by ${authorName.innerHTML}`);
    speechSynthesis.speak(words);
})

copyBtn.addEventListener("click", () =>{
    navigator.clipboard.writeText(quoteText.innerHTML);
}
)
//End of Quote API

//Start of Dictionary API/

const result = document.querySelector(".results");
const message = document.querySelector("#displayMessage")
const searchBtn = document.querySelector("#search-btn");
const sound = document.querySelector("#pronunciation");
const searchInput = document.querySelector("#searchinput");
const apiUrlDictionary = "https://api.dictionaryapi.dev/api/v2/entries/en/";


searchBtn.addEventListener("click", () => {
    const word = document.getElementById("searchinput").value;
    fetch(`${apiUrlDictionary}${word}`)
        .then(response => response.json())
        .then(data => {
            console.log(data[0]);
            
            const entry = data[0];
            const phonetic = entry?.phonetic || "";
            const partOfSpeech = entry?.meanings?.[0]?.partOfSpeech || "";
            const definition = entry?.meanings?.[0]?.definitions?.[0]?.definition || "No definition found.";
            const synonyms = entry?.meanings?.[0]?.synonyms || [];
            const audioUrl = entry?.phonetics?.find(p => p.audio)?.audio || "";
            result.style.display = "block";

            result.innerHTML = `<ul class="results" style="display: block;">
                <li class="word">
                    <div class="details">
                        <p>${word}</p>
                        <span>${partOfSpeech}  ${phonetic}</span>
                        <i class="fa fa-volume-up" id="pronunciation" aria-hidden="true" style="cursor:pointer"></i>
                    </div>
                </li>
                <li class="meaning">
                    <div class="details">
                        <p>Meaning</p>
                        <span>${definition}</span>
                    </div>
                </li>
                <li class="synonyms">
                    <div class="details">
                        <p>Synonyms</p>
                        <div class="list">
                            ${synonyms.length > 0 ? synonyms.map(s => `<span>${s}, </span>`).join('') : "<span>No synonyms found.</span>"}
                        </div>
                    </div>
                </li>
                <li>
                    <button class="btn" id="clear-btn">Clear</button>
                </li>
            </ul>`;

            const pronunciationBtn = document.getElementById("pronunciation");
            if (pronunciationBtn && audioUrl) {
                pronunciationBtn.addEventListener("click", () => {
                    const audio = new Audio(audioUrl);
                    audio.play();
                });
            } else if (pronunciationBtn) {
                pronunciationBtn.addEventListener("click", () => {
                    let utter = new SpeechSynthesisUtterance(word);
                    speechSynthesis.speak(utter);
                });
            }
        })
        .catch(error => {
            console.error("Error fetching dictionary data:", error);
            result.innerHTML = "<p>Error fetching dictionary data.</p>";
        });
})


result.addEventListener("click", (event) => {
    if (event.target && event.target.id === "clear-btn") {
        result.innerHTML = "";
        result.style.display = "none";
        message.innerHTML = "";
        searchInput.value = "";
    }
});

const savedWordsKey = "savedWords";


function saveWord(word) {
    let savedWords = JSON.parse(localStorage.getItem(savedWordsKey)) || [];
    if (!savedWords.includes(word)) {
        savedWords.push(word);
        localStorage.setItem(savedWordsKey, JSON.stringify(savedWords));
    }
}


function displaySavedWords() {
    const savedWords = JSON.parse(localStorage.getItem(savedWordsKey)) || [];
    let savedList = document.getElementById("saved-words-list");
    if (!savedList) {
        savedList = document.createElement("ul");
        savedList.id = "saved-words-list";
        savedList.style.marginTop = "20px";
        document.body.appendChild(savedList);
    }
    savedList.innerHTML = "<strong>Saved Words:</strong> " + (savedWords.length ? savedWords.map(w => `<li>${w}</li>`).join('') : "<li>No saved words.</li>");
}


result.addEventListener("click", (event) => {
    if (event.target && event.target.id === "save-word-btn") {
        const word = document.getElementById("searchinput").value;
        window.location.href = "login.html";
     
    }
});


searchBtn.addEventListener("click", () => {
    setTimeout(() => {
        const clearBtn = document.getElementById("clear-btn");
        if (clearBtn && !document.getElementById("save-word-btn")) {
            const saveBtn = document.createElement("button");
            saveBtn.className = "btn";
            saveBtn.id = "save-word-btn";
            saveBtn.textContent = "Save Word";
            clearBtn.parentNode.insertBefore(saveBtn, clearBtn);
        }
    }, 100);
});
displaySavedWords();

