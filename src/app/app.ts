export class App {
  private apiQuotes: any[] = [];

  quoteText = document.querySelector('.quote-text');
  quoteAuthor = document.querySelector('.quote-author-name');
  quoteTwitter = document.querySelector('.quote-twiter-button');
  quoteButton = document.querySelector('.new-quote-button');
  quoteContainer = document.querySelector('.quote-container');
  loaderContainer = document.querySelector('.loader-container');

  public async getQuotes() {
    this.showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
      const response = await fetch(apiUrl);
      this.apiQuotes = await response.json();
      this.newQuote();
    } catch (error) {
      console.log(error);
    }
  }

  private showLoadingSpinner() {
    this.quoteContainer.classList.add('hidden');
    this.loaderContainer.classList.remove('hidden');
  }

  private hideLoadingSpinner() {
    this.quoteContainer.classList.remove('hidden');
    this.loaderContainer.classList.add('hidden');
  }

  private newQuote() {
    this.showLoadingSpinner();
    const quote =
      this.apiQuotes[Math.floor(Math.random() * this.apiQuotes.length)];
    !quote.author
      ? (this.quoteAuthor.textContent = 'unknown')
      : (this.quoteAuthor.textContent = quote.author);
    this.quoteText.textContent = quote.text;
    this.hideLoadingSpinner();
  }

  private tweetQuote() {
    const twitterURL = `https://twitter.com/intent/tweet?text=${this.quoteText.textContent} - ${this.quoteAuthor.textContent}`;
    window.open(twitterURL, '_blank');
  }

  newTweet() {
    console.log(this.quoteText.textContent);
    this.quoteTwitter.addEventListener('click', this.tweetQuote.bind(this));
  }

  newQuoteButton() {
    this.quoteButton.addEventListener('click', this.newQuote.bind(this));
  }
}
