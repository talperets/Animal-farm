import { useState } from "react";
import { useEffect } from "react";
import Animal from "./components/Animal";
import "./App.css";
import axios from "axios";

function useAnimalSearch() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const lastquery =localStorage.getItem('lastquery')
    search(lastquery)
  },[]);

  const search = async (q) => {
    const res = await axios.get(`http://localhost:3003/?q=${q}`);

    setAnimals(res.data);
    localStorage.setItem('lastquery', q)
  };
  return {search, animals}
}

function App() {
const {search, animals} =useAnimalSearch()
const [prompt, setPrompt] = useState()
  return (
    <main>
      <h1>Animal Farm</h1>
      <h3>Last search: {localStorage.getItem('lastquery')}</h3>
      <input
        type="text"
        placeholder='Search'
        
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={()=>search(prompt)}>Search</button>
      <ul>
        
        {animals.map((animal) => (
          <Animal key={animal.id} {...animal} />
        ))}
        {animals.length === 0 && "No animals found"}
      </ul>
    </main>
  );
}

export default App;
