import { useEffect, useState } from "react"
import "./QuoteBox.css"
import { IoLogoTwitter } from "react-icons/io5"

export const QuoteBox = () => {
  const [quote, setQuote] = useState("")
  const [author, setAuthor] = useState(" ")
  const [color, setColor] = useState(" ")

  useEffect(() => {
    getQuote()
  }, [])

  const getQuote = () => {
    let url =
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let dataQuotes = data.quotes
        let randomNum = Math.floor(Math.random() * dataQuotes.length)
        let randomQuote = dataQuotes[randomNum]

        setQuote(randomQuote.quote)
        setAuthor(randomQuote.author)
      })
  }

  const rangoColor = () => {
    setColor(
      "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")
          .toUpperCase()
    )
    document.getElementById("new-quote").style.backgroundColor = color
  }

  const cambiarColor = () => {
    document.getElementById("quote-box").style.color = color
    document.body.style.backgroundColor = color
    document.getElementById("tweet-quote").style.backgroundColor = color
    document.getElementById("tumlr-quote").style.backgroundColor = color
  }
  const handleClick = () => {
    getQuote()
    rangoColor()
    cambiarColor()
  }

  return (
    <div id="back">
      <div id="quote-box">
        <div id="text">
          <p className="color">{quote}</p>
        </div>
        <div id="author">
          <p className="color">{author}</p>
        </div>

        <div id="buttons">
          <div className="social-media">
            <a
              id="tweet-quote"
              href={`https://twitter.com/intent/tweet?hashtags=quotes&text=${encodeURIComponent(
                quote + author
              )}`}
              target="_top"
              title="Tweet this quote!"
            >
              <IoLogoTwitter />
            </a>
          </div>
          <button id="new-quote" onClick={handleClick}>
            New quote
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuoteBox
