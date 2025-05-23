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
