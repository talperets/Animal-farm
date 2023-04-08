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

  return (
    <main>
      <h1>Company Farm</h1>
      <input
        type="text"
        placeholder="Search"
        value={localStorage.getItem('lastquery')}
        onChange={(e) => search(e.target.value)}
      />
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
