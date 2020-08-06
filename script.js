const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter-btn');
const newQuoteBtn = document.getElementById('new-quote-btn');
const loader = document.getElementById('loader');

const API = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
const proxyUrl = "https://cors-anywhere.herokuapp.com/";

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote From API

async function getQuote() {
    loading();
    try {
        const response = await fetch(proxyUrl + API);
        const data = await response.json();

        // If Author is blank add unknown
        if(data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        // Reduce font size for long quote
        if(data.quoteText.length > 120) {
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.quoteText;
        // Stop Loader
        complete()
    } catch(error) {
        getQuote();
        console.log(error)
    }
}
// Twit Quote
function twitQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterAPI = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterAPI, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', twitQuote);

// On Load
getQuote();