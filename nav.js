document.addEventListener('DOMContentLoaded', () => {
    // =========================================================================
    // 1. BASE DE DATOS DE PRODUCTOS INCRUSTADA
    // (Al estar aquí, evita el error de bloqueo CORS y funciona con doble clic)
    // =========================================================================
    const productos = [
        {
            nombre: "Gel Limpiador Foaming Cleanser 236ml Cerave",
            marca: "CeraVe",
            precio: "S/. 69.90",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas vendido/cerave_gel_limpiador_2366ml_verde.jpg"
        },
        {
            nombre: "Pack Hydro Boost Refill x2 Neutrogena",
            marca: "Neutrogena",
            precio: "S/. 72.90",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas vendido/pack_2refill_neutrogena.jpg"
        },
        {
            nombre: "Gel Limpiador Effaclar Pieles Mixtas a Grasas 400ml La Roche Posay",
            marca: "La Roche Posay",
            precio: "S/. 106.90",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas vendido/Gel Limpiador Effaclar Pieles Mixtas a Grasas 400ml.jpg"
        },
        {
            nombre: "Agua Micelar Sensibio H20 Piel Sensible 500 ml Bioderma",
            marca: "Bioderma",
            precio: "S/. 104.90",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas vendido/agua_micelar_bioderma.jpg"
        },
        {
            nombre: "Hidratante facial Hydro Boost 50gr Neutrogena",
            marca: "Neutrogena",
            precio: "S/. 42.90",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas vendido/hidratante_neutrogena.jpg"
        },
        {
            nombre: "Protector Solar Mini Cotton Soft Sun Stick Tocobo",
            marca: "Tocobo",
            precio: "S/. 59.90",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas nuevo/Tocobo_pequeño.jpg"
        },
        {
            nombre: "Oil Control Limpiador Facial Control Imperfecciones Cetaphil",
            marca: "Cetaphil",
            precio: "S/. 83.90",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas nuevo/cetaphil_limpiador_facial.jpg"
        },
        {
            nombre: "Bioderma Atoderm Huile de Douche 100ml",
            marca: "Bioderma",
            precio: "S/. 49.90",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas nuevo/Bioderma_Atoderm_Huile_de_Douche_100ml.jpg"
        },
        {
            nombre: "Hyaluron Filler Firming Serum Fps30 Eucerin",
            marca: "Eucerin",
            precio: "S/. 195.00",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas nuevo/Hyalluron_Eucrin_Filler.jpg"
        },
        {
            nombre: "Hidraderm Hyal 5 Serum 30ml Sesderma",
            marca: "Sesderma",
            precio: "S/. 59.90",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas nuevo/Hidraderm_Hyal5Serum_30ml_Sesderma.jpg"
        },
        {
            nombre: "Water Sleeping Mask with Squalane 70 ml Laneige",
            marca: "Laneige",
            precio: "S/. 129.90",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas nuevo/laniege.jpg"
        },
        {
            nombre: "Crema Facial Anti-Arrugas Retinol Boost Neutrogena",
            marca: "Neutrogena",
            precio: "S/. 98.90",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas nuevo/neutrogena_retinol.jpg"
        },
        {
            nombre: "Tree Hut Exfoliante Watermelon 510g",
            marca: "Tree Hut",
            precio: "S/. 79.90",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas nuevo/TREEHUT_Exfoliante_Watermelon_510g.jpg"
        },
        {
            nombre: "Fotoprotector Isdin Invisible Stick Spf50 10g",
            marca: "ISDIN",
            precio: "S/. 77.90",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas vendido/Fotoprotector_Isdin.jpg"
        },
        {
            nombre: "Bálsamo Reparador Cicaplast Balm B5 La Roche Posay 40 ml",
            marca: "La Roche Posay",
            precio: "S/. 65.90",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas vendido/Bálsamo_Reparador_CicaplastBalmB5_LaRochePosay_40 ml.jpg"
        },
        {
            nombre: "Protector Solar Diario SPF 50+ Just Con Acido Hialuronico Revox",
            marca: "Revox",
            precio: "S/. 39.90",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas vendido/ProtectorSolarDiario_SPF 50+Con Acido Hialuronico_Revox.jpg"
        },
        {
            nombre: "Exfoliante Tree Hut Vainilla 510g",
            marca: "Tree Hut",
            precio: "S/. 79.90",
            link: "limpieza.html",
            imagen: "img/foto producto_lo mas vendido/Exfoliante_Tree_Hut_Vainilla_510g.jpg"
        }
    ];

    // =========================================================================
    // 2. LÓGICA DEL BUSCADOR INTERACTIVO (CON FILTRO DE SEGURIDAD)
    // =========================================================================
    const inputBusqueda = document.getElementById('input-busqueda');
    const contenedorResultados = document.getElementById('contenedor-resultados');

    if (inputBusqueda && contenedorResultados) {
        inputBusqueda.addEventListener('input', (e) => {
            const termino = e.target.value.toLowerCase().trim();

            if (termino === '') {
                contenedorResultados.innerHTML = '';
                contenedorResultados.style.display = 'none';
                return;
            }

            // Filtrar productos por nombre o marca
            const filtrados = productos.filter(prod => 
                prod.nombre.toLowerCase().includes(termino) || 
                prod.marca.toLowerCase().includes(termino)
            );

            mostrarResultados(filtrados);
        });

        function mostrarResultados(listaFiltrada) {
            contenedorResultados.innerHTML = '';

            if (listaFiltrada.length === 0) {
                contenedorResultados.innerHTML = `<div class="sin-resultados">No se encontraron productos para tu búsqueda</div>`;
                contenedorResultados.style.display = 'block';
                return;
            }

            // Crear y agregar las filas de productos que coincidan
            listaFiltrada.forEach(prod => {
                const fila = document.createElement('a');
                fila.href = prod.link;
                fila.classList.add('item-resultado');
                fila.innerHTML = `
                    <img src="${prod.imagen}" alt="${prod.nombre}" onerror="this.src='img/logo/AuraGlow_SVGLogo.svg'">
                    <div class="info-resultado">
                        <span class="marca-resultado">${prod.marca}</span>
                        <p class="nombre-resultado">${prod.nombre}</p>
                        <span class="precio-resultado">${prod.precio}</span>
                    </div>
                `;
                contenedorResultados.appendChild(fila);
            });

            contenedorResultados.style.display = 'block';
        }

        // Ocultar buscador si se hace clic fuera del bloque buscador
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.bloque-buscador')) {
                contenedorResultados.style.display = 'none';
            }
        });
    }

    // =========================================================================
    // 3. LÓGICA DEL CARRUSEL PRINCIPAL DE BANNERS (CON AJUSTE DE DISEÑO ESTÉTICO)
    // =========================================================================
    const carruselTira = document.getElementById('carruselTira');
    const btnIzq = document.getElementById('btnIzq');
    const btnDer = document.getElementById('btnDer');
    const puntos = document.querySelectorAll('.indicador-punto');
    
    if (carruselTira && btnIzq && btnDer) {
        const slides = carruselTira.querySelectorAll('.banner-slide');
        const totalSlides = slides.length;
        let indiceActual = 0;
        let carruselIntervalId = null;

        // Forzar inicialización de estilos del carrusel para evitar descuadres visuales
        carruselTira.style.display = 'flex';
        carruselTira.style.flexDirection = 'row';
        carruselTira.style.width = `${totalSlides * 100}%`;
        carruselTira.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        carruselTira.style.margin = '0';
        carruselTira.style.padding = '0';

        slides.forEach(slide => {
            slide.style.width = `${100 / totalSlides}%`;
            slide.style.flex = `0 0 ${100 / totalSlides}%`;
            slide.style.boxSizing = 'border-box';
            // Se remueve slide.style.display = 'block' para que conserve el Flexbox original de style.css
        });

        const moverSlide = (indice) => {
            if (indice < 0) indice = totalSlides - 1;
            if (indice >= totalSlides) indice = 0;
            indiceActual = indice;
            
            // Translación exacta respecto al número de slides
            carruselTira.style.transform = `translateX(-${indiceActual * (100 / totalSlides)}%)`;
            
            // Actualizar puntos de paginación
            puntos.forEach((p, idx) => {
                if (idx === indiceActual) p.classList.add('activo');
                else p.classList.remove('activo');
            });
        };

        // Forzar la alineación en 0 al iniciar la página
        moverSlide(0);

        // Controlar la reproducción automática segura
        const iniciarAutoplayBanner = () => {
            if (carruselIntervalId) {
                clearInterval(carruselIntervalId);
            }
            carruselIntervalId = setInterval(() => {
                moverSlide(indiceActual + 1);
            }, 6000);
        };

        // Interacciones manuales resetean el temporizador
        btnIzq.addEventListener('click', () => {
            moverSlide(indiceActual - 1);
            iniciarAutoplayBanner();
        });

        btnDer.addEventListener('click', () => {
            moverSlide(indiceActual + 1);
            iniciarAutoplayBanner();
        });

        puntos.forEach(punto => {
            punto.addEventListener('click', (e) => {
                const slideIndex = parseInt(e.target.getAttribute('data-slide'));
                moverSlide(slideIndex);
                iniciarAutoplayBanner();
            });
        });

        iniciarAutoplayBanner();
    }

    // =========================================================================
    // 3.5 ANIMACIÓN ROSA DEL BOTÓN "AÑADIR" (CONSERVANDO CENTRADO ORIGINAL)
    // =========================================================================
    const botonesAnadir = document.querySelectorAll('.btn-anadir, .btn-anadir-catalogo, .btn-pack-anadir');

    botonesAnadir.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (btn.classList.contains('estado-anadido')) return;

            btn.classList.add('estado-anadido');

            // Transición a la paleta rosa/fucsia Aura Glow original (#ff4d6d)
            btn.style.backgroundColor = '#ff4d6d'; 
            btn.style.borderColor = '#ff4d6d';
            btn.style.color = '#ffffff';
            btn.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            
            // Reemplazar contenido con el diseño idéntico al de image_46d985.png
            btn.innerHTML = `
                <svg viewBox="0 0 24 24" width="16" height="16" style="fill: currentColor; margin-right: 6px; display: inline-block; vertical-align: middle; animation: popCheck 0.3s ease;">
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
                <span style="animation: popCheck 0.3s ease; font-weight: 600; vertical-align: middle;">¡Añadido! ✓</span>
            `;

            // Efecto táctil sutil usando la propiedad 'scale' (para no sobreescribir el 'transform: translateX(-50%)' del CSS)
            btn.style.scale = '1.06';
            setTimeout(() => {
                btn.style.scale = '1';
            }, 150);
        });
    });

    // Añadir estilos para la animación popCheck dinámicamente si no existiese
    const styleElem = document.createElement('style');
    styleElem.innerHTML = `
        @keyframes popCheck {
            0% { transform: scale(0.7); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(styleElem);

    // =========================================================================
    // 3.6 LÓGICA DE WISHLIST / CORAZÓN MANTENIDO (COLOR FUCSIA COMPLETO)
    // =========================================================================
    const botonesWishlist = document.querySelectorAll('.btn-wishlist, .btn-wishlist-catalogo');
    botonesWishlist.forEach(btn => {
        const svg = btn.querySelector('svg');
        if (svg) {
            svg.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                const estaActivo = btn.classList.toggle('activo');

                if (estaActivo) {
                    // Pintar de color fucsia Aura Glow de forma permanente
                    svg.style.fill = '#ff4d6d';
                    svg.style.stroke = '#ff4d6d';
                    btn.style.transform = 'scale(1.25)';
                    setTimeout(() => { btn.style.transform = 'scale(1)'; }, 150);
                } else {
                    // Retornar al estado original vacío
                    svg.style.fill = 'none';
                    svg.style.stroke = 'currentColor';
                    btn.style.transform = 'scale(0.85)';
                    setTimeout(() => { btn.style.transform = 'scale(1)'; }, 150);
                }
            });
        }
    });

    // =========================================================================
    // 4. LÓGICA DEL MODAL DE MI CUENTA (LOGIN & REGISTRO - PROTEGIDO)
    // =========================================================================
    const modalCuenta = document.getElementById('modalCuenta');
    const btnCuenta = document.getElementById('btn-cuenta');
    const btnCerrarModal = document.getElementById('btn-cerrar-modal');
    const irARegistro = document.getElementById('ir-a-registro');
    const irALogin = document.getElementById('ir-a-login');
    const vistaLogin = document.getElementById('vista-login');
    const vistaRegistro = document.getElementById('vista-registro');

    if (modalCuenta && btnCuenta && btnCerrarModal) {
        btnCuenta.addEventListener('click', () => {
            modalCuenta.classList.add('activo');
            if (vistaLogin) vistaLogin.classList.remove('d-none');
            if (vistaRegistro) vistaRegistro.classList.add('d-none');
        });

        btnCerrarModal.addEventListener('click', () => {
            modalCuenta.classList.remove('activo');
        });

        modalCuenta.addEventListener('click', (e) => {
            if (e.target === modalCuenta) {
                modalCuenta.classList.remove('activo');
            }
        });

        if (irARegistro && irALogin && vistaLogin && vistaRegistro) {
            irARegistro.addEventListener('click', (e) => {
                e.preventDefault();
                vistaLogin.classList.add('d-none');
                vistaRegistro.classList.remove('d-none');
            });

            irALogin.addEventListener('click', (e) => {
                e.preventDefault();
                vistaRegistro.classList.add('d-none');
                vistaLogin.classList.remove('d-none');
            });
        }
    }

    // =========================================================================
    // 5. LÓGICA DE CARRUSELES INTERNOS DE PRODUCTOS ("LO NUEVO" & "LO VENDIDO")
    // =========================================================================
    function inicializarCarruselInterno(claseTrack, claseBtnIzq, claseBtnDer) {
        const track = document.querySelector(claseTrack);
        const btnAnterior = document.querySelector(claseBtnIzq);
        const btnSiguiente = document.querySelector(claseBtnDer);

        if (track && btnAnterior && btnSiguiente) {
            let posicionHorizontal = 0;
            const paso = 300; 

            btnSiguiente.addEventListener('click', () => {
                const maxDesplazamiento = track.scrollWidth - track.parentElement.clientWidth;
                posicionHorizontal += paso;
                if (posicionHorizontal > maxDesplazamiento) {
                    posicionHorizontal = maxDesplazamiento;
                }
                track.style.transform = `translateX(-${posicionHorizontal}px)`;
            });

            btnAnterior.addEventListener('click', () => {
                posicionHorizontal -= paso;
                if (posicionHorizontal < 0) {
                    posicionHorizontal = 0;
                }
                track.style.transform = `translateX(-${posicionHorizontal}px)`;
            });
        }
    }

    inicializarCarruselInterno('.track-nuevo', '.flecha-izq-nuevo', '.flecha-der-nuevo');
    inicializarCarruselInterno('.track-vendido', '.flecha-izq-vendido', '.flecha-der-vendido');

    // =========================================================================
    // 6. LÓGICA DEL CARRUSEL DE RESEÑAS / TESTIMONIOS (PROTEGIDO)
    // =========================================================================
    const resenasTrack = document.getElementById('resenas-track');
    const btnResenaIzq = document.getElementById('btn-resena-izq');
    const btnResenaDer = document.getElementById('btn-resena-der');

    if (resenasTrack && btnResenaIzq && btnResenaDer) {
        let indiceResena = 0;
        const totalGrupos = document.querySelectorAll('.grupo-resenas').length;

        const moverResena = (nuevoIndice) => {
            if (nuevoIndice < 0) nuevoIndice = totalGrupos - 1;
            if (nuevoIndice >= totalGrupos) nuevoIndice = 0;
            indiceResena = nuevoIndice;
            resenasTrack.style.transform = `translateX(-${indiceResena * 100}%)`;
        };

        btnResenaIzq.addEventListener('click', () => moverResena(indiceResena - 1));
        btnResenaDer.addEventListener('click', () => moverResena(indiceResena + 1));
    }
});