import { createContext, useState } from 'react';

export const JogadorContext = createContext();


export function JogadorProvider({ children }) {
  const [jogadores, setJogadores] = useState([
    { id: 1, nome: "Antoine Lavoisier", rating: 1600 },
    { id: 2, nome: "John Dalton", rating: 1550 },
    { id: 3, nome: "Dmitri Mendeleev", rating: 1700 },
    { id: 4, nome: "Marie Curie", rating: 1850 },
    { id: 5, nome: "Linus Pauling", rating: 1750 },
    { id: 6, nome: "Gilbert Lewis", rating: 1500 },
    { id: 7, nome: "Niels Bohr", rating: 1680 },
    { id: 8, nome: "Werner Heisenberg", rating: 1690 },
    { id: 9, nome: "Erwin Schrödinger", rating: 1720 },
    { id: 10, nome: "Ernest Rutherford", rating: 1640 },
    { id: 11, nome: "Robert Oppenheimer", rating: 1710 },
    { id: 12, nome: "Max Planck", rating: 1730 },
    { id: 13, nome: "Svante Arrhenius", rating: 1580 },
    { id: 14, nome: "Alfred Nobel", rating: 1620 },
    { id: 15, nome: "Amedeo Avogadro", rating: 1520 },
    { id: 16, nome: "Jacobus van 't Hoff", rating: 1590 }
  ]);

  return (

    <JogadorContext.Provider value={{ jogadores, setJogadores }}>
      {children} 
    </JogadorContext.Provider>
  );
}