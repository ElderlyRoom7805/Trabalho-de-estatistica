import { Navigate, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { useContext } from "react";
import { JogadorContext } from "../../context/constext.jsx";

export const Mata = () => {
    const navigate = useNavigate();
    const { jogadores, setJogadores } = useContext(JogadorContext);
    
    return(
        <>
            <div className={styles.jogPage}>
                <div className={styles.jogHeader}>
                    <h1>Jogadores:</h1>
                </div>
                <div className={styles.jogMain}>
                    <ul>
                        {jogadores.map((each) => {
                            return(
                                    <li key={each.id} className={styles.jogCard}>
                                        <div className={styles.cardHead}>
                                            <h1>Name: {each.nome}</h1>
                                        </div>
                                        <div className={styles.cardInfo}>
                                            <h4>Rating: {each.rating}</h4>
                                            <h4>id: {each.id}</h4>
                                        </div>
                                    </li>
                            )
                        })}
                    </ul>
                    <div className={styles.buttonDiv}>
                        <button className={styles.button} onClick={() => {navigate("/mataLog")}}> Começar a batalha</button>
                    <button className={styles.button} onClick={() => {navigate("/")}}> Voltar</button>
                    </div>
                </div>
            </div>
        </>
    )
}