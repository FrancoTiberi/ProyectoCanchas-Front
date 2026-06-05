import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/buscador.module.css';

export default function Buscador({ formClass, inputClass, btnClass }) {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [allData, setAllData] = useState([]);
    const wrapperRef = useRef(null);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resProd, resCom] = await Promise.all([
                    fetch(`${API_URL}/api/productos`),
                    fetch(`${API_URL}/api/comidas`)
                ]);
                const dataProd = await resProd.json();
                const dataCom = await resCom.json();

                const combined = [
                    { nombre: 'Reserva de Cancha Fútbol 5', tipo: 'pagina', ruta: '/reservas' },
                    { nombre: 'Contacto', tipo: 'pagina', ruta: '/contacto' },
                    { nombre: 'Sobre Nosotros', tipo: 'pagina', ruta: '/sobrenosotros' },
                    ...(Array.isArray(dataProd) ? dataProd : []).map(p => ({ ...p, tipo: 'tienda', ruta: '/tienda' })),
                    ...(Array.isArray(dataCom) ? dataCom : []).map(c => ({ ...c, tipo: 'comida', ruta: '/menu' }))
                ];
                setAllData(combined);
            } catch (error) {
                console.error("Error fetching search data", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.trim().length > 0) {
            const valLower = value.toLowerCase();
            const filtered = allData.filter(item => {
                const catName = typeof item.categoria === 'object' && item.categoria !== null
                    ? item.categoria.nombre || ''
                    : item.categoria || '';

                return item.nombre.toLowerCase().includes(valLower) ||
                    catName.toLowerCase().includes(valLower);
            }).slice(0, 5);
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSelectSuggestion = (item) => {
        setSearchTerm('');
        setShowSuggestions(false);
        navigate(item.ruta);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const term = searchTerm.toLowerCase().trim();
        if (!term) return;

        if (suggestions.length > 0) {
            handleSelectSuggestion(suggestions[0]);
            return;
        }

        if (['reserva', 'cancha', 'turno', 'f5'].some(w => term.includes(w))) return navigate('/reservas');
        if (['tienda', 'producto', 'botin', 'pelota', 'camiseta'].some(w => term.includes(w))) return navigate('/tienda');
        if (['menu', 'comida', 'hamburguesa', 'pizza', 'papas', 'bebida'].some(w => term.includes(w))) return navigate('/menu');
        if (['contacto'].some(w => term.includes(w))) return navigate('/contacto');
        if (['nosotros'].some(w => term.includes(w))) return navigate('/sobrenosotros');

        navigate('/tienda');
    };

    return (
        <form ref={wrapperRef} className={`d-flex ${styles.formContainer} ${formClass || ''}`} role="search" onSubmit={handleSubmit}>
            <input
                className={`form-control me-2 ${inputClass || ''}`}
                type="search"
                placeholder="Buscar"
                aria-label="Buscar"
                value={searchTerm}
                onChange={handleInputChange}
                onFocus={() => { if (searchTerm.trim().length > 0) setShowSuggestions(true); }}
            />
            <button className={`btn btn-outline-success ${btnClass || ''}`} type="submit">Buscar</button>

            {showSuggestions && suggestions.length > 0 && (
                <ul className={styles.suggestionsDropdown}>
                    {suggestions.map((item, idx) => (
                        <li key={idx} onClick={() => handleSelectSuggestion(item)} className={styles.suggestionItem}>
                            <i className={`${styles.suggestionIcon} ${item.tipo === 'pagina' ? 'bi bi-file-earmark-text' : (item.tipo === 'comida' ? 'bi bi-egg-fried' : 'bi bi-bag')}`}></i>
                            <span className={styles.suggestionText}>{item.nombre}</span>
                            <span className={styles.suggestionType}>{item.tipo === 'pagina' ? 'Página' : (item.tipo === 'comida' ? 'Menú' : 'Tienda')}</span>
                        </li>
                    ))}
                </ul>
            )}
        </form>
    );
}
