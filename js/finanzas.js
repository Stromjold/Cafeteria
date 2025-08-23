
        // Datos de ejemplo
        const datosFinancieros = {
            ganancias: [2500, 3200, 2800, 3500, 4200, 3800, 4500, 3900, 4100, 4300, 3700, 4200],
            costos: [1800, 2100, 1900, 2200, 2800, 2400, 2900, 2500, 2600, 2700, 2300, 2600],
            meses: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            recursos: {
                'Materias Primas': 35,
                'Mano de Obra': 25,
                'Transporte': 15,
                'Marketing': 12,
                'Servicios': 8,
                'Otros': 5
            },
            productos: {
                'Chocolates': 42,
                'Caramelos': 28,
                'Gomitas': 15,
                'Piruletas': 10,
                'Otros': 5
            },
            riesgos: [8.5, 7.2, 6.8, 7.5, 8.1, 7.3, 6.9, 7.8, 7.1, 6.5, 7.2, 7.0],
            tesoreria: [85420, 78250, 82100, 79800, 85420, 88700, 91200, 87500, 85420, 89300, 86700, 85420]
        };

        // Configuración común para gráficos
        const chartConfig = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        };

        // Inicializar gráficos
        function initCharts() {
            // Gráfico de Ganancias del Año
            const gananciasCtx = document.getElementById('gananciasChart').getContext('2d');
            new Chart(gananciasCtx, {
                type: 'line',
                data: {
                    labels: datosFinancieros.meses,
                    datasets: [{
                        label: 'Ganancias ($)',
                        data: datosFinancieros.ganancias,
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    ...chartConfig,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });

            // Gráfico de Gestión de Recursos
            const recursosCtx = document.getElementById('recursosChart').getContext('2d');
            new Chart(recursosCtx, {
                type: 'doughnut',
                data: {
                    labels: Object.keys(datosFinancieros.recursos),
                    datasets: [{
                        data: Object.values(datosFinancieros.recursos),
                        backgroundColor: [
                            '#4f46e5',
                            '#10b981',
                            '#f59e0b',
                            '#ef4444',
                            '#8b5cf6',
                            '#06b6d4'
                        ]
                    }]
                },
                options: {
                    ...chartConfig,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });

            // Gráfico de Control de Costos
            const costosCtx = document.getElementById('costosChart').getContext('2d');
            new Chart(costosCtx, {
                type: 'bar',
                data: {
                    labels: datosFinancieros.meses,
                    datasets: [{
                        label: 'Ganancias',
                        data: datosFinancieros.ganancias,
                        backgroundColor: '#10b981'
                    }, {
                        label: 'Costos',
                        data: datosFinancieros.costos,
                        backgroundColor: '#ef4444'
                    }]
                },
                options: {
                    ...chartConfig,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });

            // Gráfico de Evaluación de Riesgos
            const riesgosCtx = document.getElementById('riesgosChart').getContext('2d');
            new Chart(riesgosCtx, {
                type: 'radar',
                data: {
                    labels: ['Liquidez', 'Solvencia', 'Rentabilidad', 'Eficiencia', 'Mercado', 'Operacional'],
                    datasets: [{
                        label: 'Nivel de Riesgo',
                        data: [7.2, 6.8, 8.5, 7.9, 6.5, 7.1],
                        borderColor: '#f59e0b',
                        backgroundColor: 'rgba(245, 158, 11, 0.2)',
                        pointBackgroundColor: '#f59e0b'
                    }]
                },
                options: {
                    ...chartConfig,
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 10,
                            ticks: {
                                stepSize: 2
                            }
                        }
                    }
                }
            });

            // Gráfico de Tesorería
            const tesoreriaCtx = document.getElementById('tesoreriaChart').getContext('2d');
            new Chart(tesoreriaCtx, {
                type: 'area',
                data: {
                    labels: datosFinancieros.meses,
                    datasets: [{
                        label: 'Efectivo en Caja ($)',
                        data: datosFinancieros.tesoreria,
                        borderColor: '#4f46e5',
                        backgroundColor: 'rgba(79, 70, 229, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    ...chartConfig,
                    scales: {
                        y: {
                            beginAtZero: false,
                            ticks: {
                                callback: function(value) {
                                    return '$' + (value/1000).toFixed(1) + 'K';
                                }
                            }
                        }
                    }
                }
            });

            // Gráfico de Productos Más Rentables
            const productosCtx = document.getElementById('productosChart').getContext('2d');
            new Chart(productosCtx, {
                type: 'polarArea',
                data: {
                    labels: Object.keys(datosFinancieros.productos),
                    datasets: [{
                        data: Object.values(datosFinancieros.productos),
                        backgroundColor: [
                            '#4f46e5',
                            '#10b981',
                            '#f59e0b',
                            '#ef4444',
                            '#8b5cf6'
                        ]
                    }]
                },
                options: {
                    ...chartConfig,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }

        // Función para mostrar alertas
        function mostrarAlertas() {
            const alertasContainer = document.getElementById('alertasContainer');
            const alertas = [
                {
                    tipo: 'success',
                    mensaje: 'Las ganancias del mes superaron la meta establecida en un 12.5%'
                },
                {
                    tipo: 'warning',
                    mensaje: 'Los costos de materias primas han aumentado un 3.2% este mes'
                },
                {
                    tipo: 'danger',
                    mensaje: 'Nivel de inventario de chocolates por debajo del mínimo requerido'
                }
            ];

            alertasContainer.innerHTML = '';
            alertas.forEach(alerta => {
                const alertDiv = document.createElement('div');
                alertDiv.className = `alert alert-${alerta.tipo}`;
                alertDiv.textContent = alerta.mensaje;
                alertasContainer.appendChild(alertDiv);
            });
        }

        // Función para actualizar datos
        function actualizarDatos() {
            const year = document.getElementById('yearSelect').value;
            const currency = document.getElementById('currencySelect').value;
            const meta = document.getElementById('metaVentas').value;
            
            // Simular actualización de datos
            alert(`Datos actualizados para el año ${year} con moneda ${currency} y meta de $${meta}`);
            
            // Aquí podrías hacer una llamada a la API para obtener datos reales
            // y actualizar los gráficos
        }

        // Función para navegar entre páginas
        function setupNavigation() {
            document.querySelectorAll('input[name="radio"]').forEach(radio => {
                radio.addEventListener('change', function() {
                    if (this.checked) {
                        window.location.href = this.value;
                    }
                });
            });
        }

        // Inicializar la aplicación
        document.addEventListener('DOMContentLoaded', function() {
            initCharts();
            mostrarAlertas();
            setupNavigation();
        });

// Debes tener algo así para cada gráfico
const ctxTesoreria = document.getElementById('tesoreriaChart').getContext('2d');
const tesoreriaChart = new Chart(ctxTesoreria, {
    type: 'bar', // o el tipo que prefieras
    data: {
        labels: ['Enero', 'Febrero', 'Marzo'],
        datasets: [{
            label: 'Tesorería',
            data: [20000, 30000, 35000],
            backgroundColor: '#4ade80'
        }]
    }
});

const ctxProductos = document.getElementById('productosChart').getContext('2d');
const productosChart = new Chart(ctxProductos, {
    type: 'pie',
    data: {
        labels: ['Chocolates', 'Caramelos', 'Otros'],
        datasets: [{
            data: [42, 28, 30],
            backgroundColor: ['#fbbf24', '#f87171', '#60a5fa']
        }]
    }
});


