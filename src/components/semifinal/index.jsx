import { useContext, useState, useEffect } from "react";
import { JogadorContext } from "../../context/constext.jsx";
import styles from "./index.module.scss";
import { useNavigate, useLocation } from "react-router-dom";

export const Semifinal = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setJogadores } = useContext(JogadorContext);

    const classificadosDasQuartas = location.state?.classificados || [];
    const [confrontos, setConfrontos] = useState([]);
    const [vencedoresSemi, setVencedoresSemi] = useState([]);
    const [historicoDestaRodada, setHistoricoDestaRodada] = useState([]);

    useEffect(() => {
        if (classificadosDasQuartas.length < 4) return;

        const listaParaSorteio = [...classificadosDasQuartas].sort(() => Math.random() - 0.5);
        const resultadosSimulacao = [];
        const listaVencedores = [];
        console.log(resultadosSimulacao);
        console.log(listaVencedores);
        const k = 32;

        for (let i = 0; i < listaParaSorteio.length; i += 2) {
            const jog1 = listaParaSorteio[i];
            const jog2 = listaParaSorteio[i + 1];

            const expoE = (jog2.rating - jog1.rating) / 400;
            const Ea = 1 / (1 + Math.pow(10, expoE));
            const U = Math.random();
            const venceuJ1 = U < Ea;

            const nRA = jog1.rating + k * ((venceuJ1 ? 1 : 0) - Ea);
            const nRB = jog2.rating + k * ((venceuJ1 ? 0 : 1) - (1 - Ea));

            const infoDuelo = {
                j1: jog1,
                j2: jog2,
                ea: Ea.toFixed(4),
                u: U.toFixed(4),
                venceuJ1,
                novoRa: nRA.toFixed(1),
                novoRb: nRB.toFixed(1)
            };

            resultadosSimulacao.push(infoDuelo);
            listaVencedores.push(venceuJ1 ? { ...jog1, rating: Number(nRA.toFixed(1)) } : { ...jog2, rating: Number(nRB.toFixed(1)) });
        }

        setConfrontos(resultadosSimulacao);
        setVencedoresSemi(listaVencedores);
        setHistoricoDestaRodada(resultadosSimulacao);

        setJogadores(prev => prev.map(jogadorOriginal => {
            const encontrouDuelo = resultadosSimulacao.find(d => d.j1.id === jogadorOriginal.id || d.j2.id === jogadorOriginal.id);
            if (encontrouDuelo) {
                return encontrouDuelo.j1.id === jogadorOriginal.id 
                    ? { ...jogadorOriginal, rating: Number(encontrouDuelo.novoRa) }
                    : { ...jogadorOriginal, rating: Number(encontrouDuelo.novoRb) };
            }
            return jogadorOriginal;
        }));
    }, []);

    return (
        <div className={styles.int}>
            <div className={styles.header}><h1>Semifinais (Top 4)</h1></div>
            <div className={styles.main}>
                {confrontos.map((duelo, index) => (
                    <div className={styles.card} key={index}>
                        <div className={styles.cardHead}>
                            <h1>Rodada {index + 1}</h1>
                            <h1>{duelo.j1.nome} X {duelo.j2.nome}</h1>
                            <div className={styles.ranking}>
                                <p>Rating: {duelo.j1.rating}</p>
                                <p>Rating: {duelo.j2.rating}</p>
                            </div>
                        </div>
                        <h1>Vencedor: {duelo.venceuJ1 ? duelo.j1.nome : duelo.j2.nome}</h1>
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
                <button className={styles.button} onClick={() => navigate("/final", { state: { classificados: vencedoresSemi, historico: [...location.state.historico, ...historicoDestaRodada] } })}>Ir para a Grande Final</button>
                <button className={styles.button} onClick={() => navigate(-1)}>Voltar</button>
            </div>
        </div>
    );
};