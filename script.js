const quoteText = document.querySelector("#quote");
const authorName = document.querySelector(".author")
const newQuoteBtn = document.querySelector("#newQuote");


 function getNewQuote() {
    newQuoteBtn.innerHTML = "Loading..."

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
    })

 }

newQuoteBtn.addEventListener("click", getNewQuote);