function App() {
    
    const [quotes, setQuotes] = React.useState([]);
    const [randomQuote, setRandomQuote] = React.useState("");
    const [color, setColor] = React.useState("#fff");

    React.useEffect(() => {
        async function fetchData() {
            const response = await fetch("https://type.fit/api/quotes")
            const data = await response.json();

            setQuotes(data);
            let randIndex = Math.floor(Math.random() * data.length);
            setRandomQuote(data[randIndex])
        }
        fetchData();
    }, {})

    const getNewQuote = () => {

        const colors = [
            "#9FA288",
            "#88A0A2",
            "#C3F0F4",
            "#C7EF3D",
            "#3D68F1",
            "#C53DF1",
            "#7AF13D",
            "#75533B",
            "#703B75",
        ];
        let randIndex = Math.floor(Math.random() * quotes.length);
        let randColorIndex = Math.floor(Math.random() * colors.length);
            setRandomQuote(quotes[randIndex])
            setColor(colors[randColorIndex])
    }

    return (
    <div style={{backgroundColor: color, minHeight: "100vh"}}>
    <div className="container pt-5">
        <div className="jumbotron">
            <div className="card" id="quote-box">
                <div className="card-header">Inspirational Quotes</div>
                <div className="card-body">
                    {randomQuote ? (
                        <>
                        <h5 className="card-title" id="author">{randomQuote.author.substring(0, randomQuote.author.indexOf(",")) || "No author"}</h5>
                        <p className="card-text" id="text">&quot;{randomQuote.text}&quot;</p>
                        </>
                    ) : (
                        <h2>Loading</h2>
                    )}

                    <div className="row">
                        <button onClick={getNewQuote} id="new-quote" className="btn btn-default btn-primary ml-3" type="submit">New Quote</button>
                        <a href={
                            "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
                            encodeURIComponent(
                                '"' + randomQuote.text + '" ' +
                                randomQuote.author
                            )
                        }
                        id="tweet-quote" className="btn btn-warning" target="_blank">
                            <i class="fa fa-twitter"></i>Tweet
                        </a>
                            
                        <a href={
                            "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=Abraham%20Lincoln&content=It%E2%80%99s%20not%20the%20years%20in%20your%20life%20that%20count.%20It%E2%80%99s%20the%20life%20in%20your%20years." +
                        encodeURIComponent(randomQuote.author) +
                        "&content=" +
                        encodeURIComponent(randomQuote.text) +
                        "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"
                        }
                        className="btn btn-danger" target="_blank">
                            <i class="fa fa-tumblr"></i>Tumblr
                        </a>

                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    );
}

ReactDOM.render(<App/>, document.getElementById("app"));