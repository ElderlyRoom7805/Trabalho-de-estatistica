import styles from "./index.module.scss";
import { useState } from "react";
import { Header } from "../header";
import { Navigate, useNavigate } from "react-router-dom";

export const Page1 = () => {
    const navigate = useNavigate();
    return(
        <>
            <Header/>
            <main className={ styles.main }>
                    <div className={styles.pergunta}>  
                        <button className={styles.button} onClick={() => {navigate("/mata")}}>Clicar para ver jogadores</button>
                    </div> 
            </main>
        </>
    )
}