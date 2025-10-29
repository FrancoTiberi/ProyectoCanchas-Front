import bancos from '../assets/img/bancos.webp';
import cancha2 from '../assets/img/cancha2.webp';
import cancha1 from '../assets/img/cancha1.webp';
import burguerOferta from '../assets/img/bg.png'
import pizzaOferta from '../assets/img/pizzaoferta2x1.png'
import sandwichOferta from '../assets/img/sandwichdescuento.jpg'
import hamburguesa from '../assets/img/Hamburgesa.jpg'
import sandwich from '../assets/img/sandwich.jpg'
import pizza from '../assets/img/Pizza.jpg'
import styles from '../styles/inicio.module.css'
import { Button, Card } from 'react-bootstrap';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import HeaderInicio from '../components/HeaderInicio';
import { Footer } from '../components/footer';

    export function Inicio() {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <main>
            <HeaderInicio/>
            <section className={styles.subti}>
                <h2>El mejor lugar para F5</h2>
            </section>
            <section>
                <div className={styles.f5}>
                    <Card className={styles.card}>
                        <Card.Img src={bancos} variant='top'></Card.Img>
                        <Card.Body className={styles.cardBody}>
                            <Card.Text>Jugá, comé y disfrutá con amigos en un espacio para el fútbol</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className={styles.card}>
                        <Card.Img src={cancha2} variant='top'></Card.Img>
                        <Card.Body className={styles.cardBody}>
                            <Card.Text>Tu partido empieza acá: reservá tu cancha y viví el fútbol como nunca</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className={styles.card}>
                        <Card.Img src={cancha1} variant='top'></Card.Img>
                        <Card.Body className={styles.cardBody}>
                            <Card.Text>¿Tenés equipo? Armá tu partido hoy mismo y asegurá tu horario</Card.Text>
                        </Card.Body>
                    </Card>
                </div>
                <article className={styles.botonContenedor}>
                    <Button href="./Pages/reservaf5.html" type='button' variant='primary' size='lg'>Reservá Ya!</Button>
                </article>
            </section>
            <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                    <Image src={sandwichOferta} width="1270px" height="550px"/>
                </Carousel.Item>
                <Carousel.Item>
                    <Image src={burguerOferta} width="1270px" height="550px"/>
                </Carousel.Item>
                <Carousel.Item>
                    <Image src={pizzaOferta} width="1270px" height="550px"/>
                </Carousel.Item>
            </Carousel>
            <section className={styles.food}>
                <article className={styles.menu}>
                    <h2>En el Menú</h2>
                    <a href="./Pages/MenuPage.html" className="btn btn-primary" type="button">Ver Menú</a>
                </article>
                <Card className={styles.card}>
                     <Card.Img src={hamburguesa} variant='top' className={styles.cardImg}></Card.Img>
                    <Card.Body className={styles.cardBody}>
                        <Card.Title className={styles.h2s2}>Hamburguesas</Card.Title>
                        <Card.Text className={styles.ps2}>El sabor clásico que nunca falla. Pan dorado, carne a la parrilla y todo el
                            sabor en cada mordida.</Card.Text>
                    </Card.Body>
                </Card>
                <Card className={styles.card}>
                     <Card.Img src={sandwich} variant='top' className={styles.cardImg}></Card.Img>
                    <Card.Body className={styles.cardBody}>
                        <Card.Title className={styles.h2s2}>Sándwiches</Card.Title>
                        <Card.Text className={styles.ps2}>Frescos, variados y listos para cualquier momento del día. Elegí tu
                            combinación favorita.</Card.Text>
                    </Card.Body>
                </Card>
                <Card className={styles.card}>
                     <Card.Img src={pizza} variant='top' className={styles.cardImg}></Card.Img>
                    <Card.Body className={styles.cardBody}>
                        <Card.Title className={styles.h2s2}>Pizza</Card.Title>
                        <Card.Text className={styles.ps2}>Masa fina, ingredientes seleccionados y el toque perfecto de horno. Ideal
                            para compartir.</Card.Text>
                    </Card.Body>
                </Card>
            </section>
            <Footer/>
        </main>
    )
}
