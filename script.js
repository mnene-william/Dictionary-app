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
const sound = document.querySelector("#pronunciaton");
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

            result.innerHTML = `<ul class="results">
                <li class="word">
                    <div class="details">
                        <p>${word}</p>
                        <span>${partOfSpeech}  ${phonetic}</span>
                        <i class="fa fa-volume-up" id="pronunciation" aria-hidden="true" style="cursor:pointer"></i>
                    </div>
                </li>
                <div class="description">
                    <li class="meaning">
                        <div class="details">
                             <p>Meaning</p>
                             <span>${definition}</span>
                        </div>
                    </li>
                </div>
                <li class="synonyms">
                    <div class="details">
                        <p>Synonyms</p>
                        <div class="list">
                            ${synonyms.length > 0 ? synonyms.map(s => `<span>${s}, </span>`).join('') : "<span>No synonyms found.</span>"}
                        </div>
                    </div>
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
