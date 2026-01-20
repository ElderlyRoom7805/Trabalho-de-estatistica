import { useContext, useState, useEffect } from "react";
import { JogadorContext } from "../../context/constext.jsx";
import styles from "./index.module.scss";
import { useNavigate, useLocation } from "react-router-dom";

export const Final = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setJogadores } = useContext(JogadorContext);

    // Pegamos os 2 vencedores que vieram da Semifinal
    const finalistas = location.state?.classificados || [];
    const [resultadoFinal, setResultadoFinal] = useState(null);
    

    useEffect(() => {
        // Validação: precisa de 2 jogadores para a final
        if (finalistas.length < 2) return;

        const jog1 = finalistas[0];
        const jog2 = finalistas[1];
        const k = 32;

        // 1. CÁLCULOS ESTATÍSTICOS (ELO)
        // Ea = 1 / (1 + 10^((Rb - Ra) / 400))
        const expoE = (jog2.rating - jog1.rating) / 400;
        const Ea = 1 / (1 + Math.pow(10, expoE));
        const U = Math.random();
        
        // Regra: se U < Ea, Jogador 1 vence
        const venceuJ1 = U < Ea;

        // 2. CÁLCULO DOS NOVOS RATINGS (Pós-Final)
        const nRA = jog1.rating + k * ((venceuJ1 ? 1 : 0) - Ea);
        const nRB = jog2.rating + k * ((venceuJ1 ? 0 : 1) - (1 - Ea));

        const infoFinal = {
            j1: jog1,
            j2: jog2,
            ea: Ea.toFixed(4),
            u: U.toFixed(4),
            venceuJ1,
            novoRa: nRA.toFixed(1),
            novoRb: nRB.toFixed(1),
            campeao: venceuJ1 ? jog1 : jog2
        };

        setResultadoFinal(infoFinal);

        // 3. ATUALIZAÇÃO DO RANKING GLOBAL (Último ajuste de massa/pontos)
        setJogadores(prev => prev.map(jogador => {
            if (jogador.id === jog1.id) return { ...jogador, rating: Number(nRA.toFixed(1)) };
            if (jogador.id === jog2.id) return { ...jogador, rating: Number(nRB.toFixed(1)) };
            return jogador;
        }));

    }, []);

    return (
        <div className={styles.int}>
            <div className={styles.header}>
                <h1 style={{color: '#FFD700'}}>🏆 GRANDE FINAL 🏆</h1>
            </div>

            <div className={styles.main}>
                {resultadoFinal ? (
                    <div className={styles.card}>
                        <div className={styles.cardHead}>
                            <h1>{resultadoFinal.j1.nome} vs {resultadoFinal.j2.nome}</h1>
                            <div className={styles.ranking}>
                                <p>Rating: {resultadoFinal.j1.rating}</p>
                                <p>Rating: {resultadoFinal.j2.rating}</p>
                            </div>
                        </div>

                        <div style={{ textAlign: 'center', margin: '20px 0' }}>
                            <h2 style={{ fontSize: '1.2rem', color: '#aaa' }}>O CAMPEÃO É:</h2>
                            <h1 style={{ fontSize: '3rem', color: '#FFD700', textTransform: 'uppercase' }}>
                                👑 {resultadoFinal.campeao.nome} 👑
                            </h1>
                        </div>

                        <div className={styles.cardinfo}>
                            <h4>Probabilidade (Ea): {resultadoFinal.ea}</h4>
                            <h4>Número Aleatório (U): {resultadoFinal.u}</h4>
                        </div>

                        <div className={styles.novoR}>
                            <div className={styles.novoheader}>
                                <h3>Novo Ranking:</h3>
                            </div>
                            <div className={styles.raking}>
                                <h4>{resultadoFinal.j1.nome}: {resultadoFinal.novoRa}</h4>
                                <h4>{resultadoFinal.j2.nome}: {resultadoFinal.novoRb}</h4>
                            </div>
                        </div>
                    </div>
                ) : (
                    <h1>Simulando a grande decisão...</h1>
                )}
            </div>

            <div className={styles.buttonDiv}>
                {/* Aqui você pode navegar para o seu Hall da Fama enviando o campeão */}
                <button 
                    className={styles.button} 
                    onClick={() => navigate("/hall", { state: { campeao: resultadoFinal?.campeao, historico: [...location.state.historico, resultadoFinal] } })}
                >
                    Ir para o Hall da Fama
                </button>
                <button className={styles.button} onClick={() => navigate("/")}>
                    Voltar ao Ranking Geral
                </button>
            </div>
        </div>
    );
};