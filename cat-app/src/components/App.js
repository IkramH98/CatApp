import React, {useState, useEffect} from "react"
import "../App.css"

const apiKey = "d2d7fdd7-8469-46a6-be9c-d1c04ac4e2e4"

const URL = "https://api.thecatapi.com/v1/images/search";

async function request(pageNum = 0) {
  return await (
    await fetch(
      URL +
        `?size=small&limit=10&page=${pageNum}&mime_types=gif,jpg,png&order=desc`
    )
  ).json();
}

export default function App() {
  const [catUrl, setCatUrl] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    async function submitRequest() {
      const results = await request();
      setCatUrl(results);
    }

    submitRequest();
  }, []);

  async function nextPage() {
    const newpageNum = pageNum + 1;
    const results = await request(pageNum + 1);
    if (results.length > 0) {
      console.log("next", newpageNum);
      setCatUrl(results);
      setPageNum(pageNum + 1);
    }
  }

  async function previousPage() {
    const newpageNum = pageNum - 1;
    if (pageNum - 1 >= 0) {
      console.log("previous", newpageNum);
      const results = await request(pageNum - 1);
      if (results.length > 0) {
        setCatUrl(results);
        setPageNum(pageNum - 1);
      }
    }
  }

  function toggleFavs(catUrl) {
    if (favs.includes(catUrl.id)) {
      const indexOf = favs.indexOf(catUrl.id);
      favs.splice(indexOf, 1);
    } else {
      favs.push(catUrl.id);
      setFavs(favs)
    }
  }

  return (
    <div className="app">
    <h1>The Great Catsby !</h1>
      <ul className="img">
        {catUrl.map((catUrl) => {
          const isFavorited = favs.includes(catUrl.id);
          return (
            <li>
              <div>{isFavorited ? "Favorite" : "Not Favorite"}</div>
              <img
                id={catUrl.id}
                style={{ height: 200, width: 200, aspectRatio: 1 }}
                alt={catUrl.id}
                src={catUrl.url}
              />
              <button className="button" type="button" onClick={() => toggleFavs(isFavorited)}>
                {isFavorited ? "Unfavorite" : "Favorite"}
              </button>
            </li>
          );
        })}
      </ul>
        <button className="button1" type="button" onClick={() => previousPage()}>
          Back
        </button>
        <button className="button1" type="button" onClick={() => nextPage()}>
          Next cat PURR-lease!
        </button>
        </div>
  );
}
