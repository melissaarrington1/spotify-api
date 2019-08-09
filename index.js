import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const accessToken =
  "BQDWV9sUe_6y-1MfGQVCHmS-0buw7UFCvExz_Qy-moE8TMJy-n4h0jM3xdpXSlnjL4mB-5splW-pVNPm-iYrYE6hTYJZLG1ZXMO4ynks5EaSxPy4tfqLEudJ4iN3bjxBbYw5dlZg5dm1dQ";

function App() {
  const [query, setQuery] = useState("");
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetchArtists();
  }, []);

  function fetchArtists() {
    let url = "https://api.spotify.com/v1/search?q=jhene&type=artist";

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data.artists.items);
        setArtists(data.artists.items);
      });
  }

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <form>
        <input
          type="text"
          value="query"
          onChange={e => setQuery(e.target.value)}
          marginBottom="20"
        />
        <button class="btn btn-blue">Search Now!</button>
      </form>

      {artists.map((artist, index) => {
        const img = artist.images[0];
        // const imgUrl = img.url
        return (
          <div key={index}>
            {img && <img alt={artist.name} src={img.url} width="300" />}
            <h3>{artist.name}</h3>
          </div>
        );
      })}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
