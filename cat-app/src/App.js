import React, {useState, useEffect} from "react"

const apiKey = "d2d7fdd7-8469-46a6-be9c-d1c04ac4e2e4"
const url = "https://api.thecatapi.com/v1/images/search"


function App() {
  const [catUrl, setCatUrl] = useState("https://cdn2.thecatapi.com/images/a9a.jpg")

  useEffect(() => {
    getcats()
  }, [])

  
 const getcats = () => {
   console.log("Hello world")
   fetch(url, {
     headers: {
       "x-api-key": apiKey
     }
   })
   .then((res) => res.json())
      .then((cats) => {
        console.log("Cats: ", cats);
        const catUrl = cats[0].url
        setCatUrl(catUrl)
      })
      .catch(err => console.log(err));
    
 } 
 console.log( "catsurl: ", catUrl)


 
 //JSX

  return (
    <div>
      <h1>Welcome to my cat App</h1>
      <img className= "img"src= {catUrl} alt= "catimage"/>
      <button onClick= {getcats}>Get new random cat</button>
    </div>
  );
}

export default App