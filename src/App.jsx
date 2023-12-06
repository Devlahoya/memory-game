import { useState, useEffect } from "react";
import { Tablero } from "./components/Tablero/Tablero";
import "./App.css" 
const emojiList = [..."💀👻🧛🌮🎱🍬🍕🦖😍🤣😂😎"];
//123454678
function App() {
  const [memobloquesbarajados, setmemobloquesbarajados] = useState([]);
  const [animating, setAnimating] = useState(false);
  const [selectedMemoBlock, setselectedMemoBlock] = useState(null);

  useEffect(() => {
    const barajadoEmojiLista = barajarArray([...emojiList, ...emojiList]);
    setmemobloquesbarajados(
      barajadoEmojiLista.map((emoji, i) => ({
        index: i,
        emoji,
        flipped: false,
      }))
    );
  }, []);

  const refreshPage =() => {
    window.location.reload(false);
  }
  
  const barajarArray = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
      console.log(a);
    }
    return a;
  };
  const handleMemoClick = (memoBlock) => {
    const MemoBlockinvertido = { ...memoBlock, flipped: true };
    let memobloquesbarajadosCopy = [...memobloquesbarajados];
    memobloquesbarajadosCopy.splice(memoBlock.index, 1, MemoBlockinvertido);

    setmemobloquesbarajados(memobloquesbarajadosCopy);
    if(selectedMemoBlock===null){
      setselectedMemoBlock(memoBlock)

    }else if (selectedMemoBlock.emoji ===memoBlock.emoji){
      setselectedMemoBlock(null);
    }else{
      setAnimating(true)
      setTimeout(()=>{
        memobloquesbarajadosCopy.splice(memoBlock.index,1,memoBlock)
        memobloquesbarajadosCopy.splice(selectedMemoBlock.index,1,selectedMemoBlock)
        setmemobloquesbarajados(memobloquesbarajadosCopy)
        setselectedMemoBlock(null);
        setAnimating(false);

      },1000)
    }


  };

  return (
  <>
  <h1 className="title"> MEMORY GAME</h1>
  <Tablero memoBlocks={memobloquesbarajados} handleMemoClick={handleMemoClick} animating={animating}/>;
  <div className="container">
    <button className="button" onClick={refreshPage}> RESET </button>
  </div>
  </>
  )
}

export default App;
