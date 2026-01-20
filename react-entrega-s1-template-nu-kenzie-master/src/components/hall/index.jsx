import { useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

export const HallDaFama = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const campeao = location.state?.campeao;
    const historicoCompleto = location.state?.historico || [];

    // Filtra apenas onde o campeão lutou
    const jornadaDoCampeao = historicoCompleto.filter(partida => 
        partida.j1.id === campeao?.id || partida.j2.id === campeao?.id
    );

    return (
        <div className={styles.int}>
            <header className={styles.header}>
                <h1>HALL DA FAMA</h1>
            </header>

            <main className={styles.main}>
                {campeao ? (
                    <>
                        {/* CARD DO CAMPEÃO COM CLASSE ESPECIAL */}
                        <div className={`${styles.card} ${styles.championCard}`}>
                            <div className={styles.cardHead}>
                                <h1 style={{color: '#FFD700'}}>👑 GRANDE VENCEDOR 👑</h1>
                                <h1 style={{fontSize: '2rem'}}>{campeao.nome}</h1>
                            </div>
                            <div className={styles.ranking}>
                                <p style={{color: '#FFD700'}}>Rating Final: {campeao.rating}</p>
                            </div>
                        </div>

                        <h2 style={{color: 'white', margin: '20px'}}>Jornada até o Título</h2>

                        {/* CARDS DA JORNADA (ESTILO PADRÃO) */}
                        {jornadaDoCampeao.map((partida, index) => {
                            const oponente = partida.j1.id === campeao.id ? partida.j2 : partida.j1;
                            const eaDoCampeao = partida.j1.id === campeao.id ? partida.ea : (1 - partida.ea).toFixed(4);

                            return (
                                <div className={styles.card} key={index}>
                                    <div className={styles.cardHead}>
                                        <h1>Fase {index + 1}</h1>
                                        <h1>{campeao.nome} vs {oponente.nome}</h1>
                                    </div>
                                    
                                    <h1 style={{color: '#4caf50'}}>VITÓRIA</h1>

                                    <div className={styles.cardinfo}>
                                        <h4>Ea: {eaDoCampeao}</h4>
                                        <h4>U: {partida.u}</h4>
                                    </div>

                                    <div className={styles.novoR}>
                                        <h4>Oponente: {oponente.nome} ({oponente.rating})</h4>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                ) : (
                    <div className={styles.card}>
                        <h1>Nenhum dado encontrado</h1>
                    </div>
                )}
            </main>

            <div className={styles.buttonDiv}>
                <button className={styles.button} onClick={() => navigate("/")}>
                    Reiniciar
                </button>
            </div>
        </div>
    );
};