import { useContext, useState, useEffect } from "react";
import { JogadorContext } from "../../context/constext.jsx";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";

export const MataLog = () => {
    const navigate = useNavigate();
    const { jogadores, setJogadores } = useContext(JogadorContext);
    
    const [confrontos, setConfrontos] = useState([]);
    const [vencedoresIds, setVencedoresIds] = useState([]);
    const [historicoDestaRodada, setHistoricoDestaRodada] = useState([]);

    useEffect(() => {
        const idBase = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        const sorteados = idBase.sort(() => Math.random() - 0.5);

        const resultadosSimulacao = [];
        const listaVencedores = [];
        console.log(resultadosSimulacao);
        console.log(listaVencedores);
        const k = 32;

        let novosJogadores = [...jogadores];

        for (let i = 0; i < sorteados.length; i += 2) {
            const index1 = sorteados[i];
            const index2 = sorteados[i + 1];
            const jog1 = jogadores[index1];
            const jog2 = jogadores[index2];

            const expoE = (jog2.rating - jog1.rating) / 400;
            const Ea = 1 / (1 + Math.pow(10, expoE));
            const U = Math.random();
            const venceuJ1 = U < Ea;

            const novoRa = jog1.rating + k * ((venceuJ1 ? 1 : 0) - Ea);
            const novoRb = jog2.rating + k * ((venceuJ1 ? 0 : 1) - (1 - Ea));

            novosJogadores = novosJogadores.map(j => {
                if (j.id === jog1.id) return { ...j, rating: Number(novoRa.toFixed(1)) };
                if (j.id === jog2.id) return { ...j, rating: Number(novoRb.toFixed(1)) };
                return j;
            });

            const infoDuelo = {
                j1: jog1,
                j2: jog2,
                ea: Ea.toFixed(4),
                u: U.toFixed(4),
                venceuJ1,
                novoRa: novoRa.toFixed(1),
                novoRb: novoRb.toFixed(1)
            };

            const vencedorAtualizado = venceuJ1 
                ? { ...jog1, rating: Number(novoRa.toFixed(1)) } 
                : { ...jog2, rating: Number(novoRb.toFixed(1)) };

            listaVencedores.push(vencedorAtualizado);
            resultadosSimulacao.push(infoDuelo);
            setHistoricoDestaRodada(resultadosSimulacao);
        }

        setConfrontos(resultadosSimulacao);
        setVencedoresIds(listaVencedores);
        setJogadores(novosJogadores);

        setJogadores(prev => {
            return prev.map(jogadorOriginal => {
                const encontrouDuelo = resultadosSimulacao.find(d => d.j1.id === jogadorOriginal.id || d.j2.id === jogadorOriginal.id);
                if (encontrouDuelo) {
                    return encontrouDuelo.j1.id === jogadorOriginal.id 
                        ? { ...jogadorOriginal, rating: Number(encontrouDuelo.novoRa) }
                        : { ...jogadorOriginal, rating: Number(encontrouDuelo.novoRb) };
                }
                return jogadorOriginal;
            });
        });

    }, []); 

    return (
        <div className={styles.int}>
            <div className={styles.header}>
                <h1>8° de final</h1>
            </div>
            <div className={styles.main}>
                {confrontos.map((duelo, index) => (
                    <div className={styles.card} key={index}>
                        <div className={styles.cardHead}>
                            <h1>Rodada {index + 1}</h1>
                            <h1>{duelo.j1.nome} X {duelo.j2.nome}</h1>
                            <div className={styles.ranking}>
                                <p>Ranking: {duelo.j1.rating}</p>
                                <p>Ranking: {duelo.j2.rating}</p>
                            </div>
                        </div>

                        <h1>Jogador {duelo.venceuJ1 ? duelo.j1.nome : duelo.j2.nome} venceu</h1>

                        <div className={styles.cardinfo}>
                            <h4>Ea: {duelo.ea}</h4>
                            <h4>U: {duelo.u}</h4>
                        </div>
                        <div className={styles.novoR}>
                            <div className={styles.novoheader}>
                                <h3>Novo Ranking:</h3>
                            </div>
                            <div className={styles.raking}>
                                <h4>{duelo.j1.nome}: {duelo.novoRa}</h4>
                                <h4>{duelo.j2.nome}: {duelo.novoRb}</h4>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.buttonDiv}>
                <button 
                    className={styles.button} 
                    onClick={() => navigate("/quartas", { state: { classificados: vencedoresIds, historico: historicoDestaRodada } })}
                >
                    Ir para a próxima fase
                </button>
                <button className={styles.button} onClick={() => navigate("/mata")}>Voltar</button>
            </div>
        </div>
    );
};