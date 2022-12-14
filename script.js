const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

function newQuote(){
// Pick a random quote from ApiQuote Array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //Check if author field is blank and replace with Unknown
  if(!quote.author){
      authorText.textContent = 'Unknown';
  }else{
      authorText.textContent = quote.author;
  }
  // Check quote length to determine styling
  if(quote.text.length > 110){
      quoteText.classList.add('long-quote');
  } else { 
      quoteText.classList.remove('long-quote');
  }
  // Set quote, Hide the loader
  quoteText.textContent = quote.text;
  complete();
}
// Get Quotes From API
async function getQuotes() {
 loading();
 const apiUrl = 'https://type.fit/api/quotes';   
 try{
 const response = await fetch(apiUrl);
 apiQuotes = await response.json();
 newQuote();
 }catch (error){
      // Catch Error Here   
 }
}
// Tweet Quote
function tweetQuote(){
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}
// Even listeners 
newQuoteButton.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();