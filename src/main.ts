const CANTIDAD_FILAS: number = 8;
const CANTIDAD_COLUMNAS: number = 10;
const ASIENTO_DISPONIBLE: number = 0;
const ASIENTO_OCUPADO: number = 1;
const SIMBOLO_DISPONIBLE: string = "L";
const SIMBOLO_OCUPADO: string = "X";

// Crea una matriz nueva con todos los asientos disponibles.
export function inicializarSala(cantidadFilas: number, cantidadColumnas: number): number[][] {
  const sala: number[][] = [];

  for (let indiceFila: number = 0; indiceFila < cantidadFilas; indiceFila++) {
    const fila: number[] = [];

    for (let indiceColumna: number = 0; indiceColumna < cantidadColumnas; indiceColumna++) {
      fila.push(ASIENTO_DISPONIBLE);
    }

    sala.push(fila);
  }

  return sala;
}

// Imprime la matriz con filas y columnas numeradas desde 1, sin modificarla.
export function mostrarSala(sala: number[][]): void {
  let encabezadoColumnas: string = "    ";

  for (let indiceColumna: number = 0; indiceColumna < sala[0].length; indiceColumna++) {
    encabezadoColumnas += ` ${String(indiceColumna + 1).padStart(2, " ")} `;
  }

  console.log(encabezadoColumnas);

  for (let indiceFila: number = 0; indiceFila < sala.length; indiceFila++) {
    let textoFila: string = `${String(indiceFila + 1).padStart(2, " ")} |`;

    for (let indiceColumna: number = 0; indiceColumna < sala[indiceFila].length; indiceColumna++) {
      const simbolo: string = sala[indiceFila][indiceColumna] === ASIENTO_DISPONIBLE
        ? SIMBOLO_DISPONIBLE
        : SIMBOLO_OCUPADO;
      textoFila += ` ${simbolo.padStart(2, " ")} `;
    }

    console.log(textoFila);
  }
}

// Reserva el asiento indicado y devuelve un mensaje según el resultado.
export function reservarAsiento(sala: number[][], fila: number, columna: number): string {
  if (!Number.isFinite(fila) || !Number.isInteger(fila) || !Number.isFinite(columna) || !Number.isInteger(columna)) {
    return "No se pudo reservar: la fila y la columna deben ser números enteros finitos.";
  } else if (fila < 1 || fila > sala.length) {
    return "No se pudo reservar: la fila está fuera del rango de la sala.";
  }

  const indiceFila: number = fila - 1;
  const indiceColumna: number = columna - 1;

  if (columna < 1 || columna > sala[indiceFila].length) {
    return "No se pudo reservar: la columna está fuera del rango de la sala.";
  } else if (sala[indiceFila][indiceColumna] !== ASIENTO_DISPONIBLE) {
    return "No se pudo reservar: el asiento ya está ocupado.";
  } else {
    sala[indiceFila][indiceColumna] = ASIENTO_OCUPADO;
    return `Reserva confirmada: fila ${fila}, asiento ${columna}.`;
  }
}

// Cuenta los asientos ocupados y disponibles sin modificar la sala.
export function contarAsientos(sala: number[][]): [number, number] {
  let cantidadOcupados: number = 0;
  let cantidadDisponibles: number = 0;

  for (let indiceFila: number = 0; indiceFila < sala.length; indiceFila++) {
    for (let indiceColumna: number = 0; indiceColumna < sala[indiceFila].length; indiceColumna++) {
      if (sala[indiceFila][indiceColumna] === ASIENTO_OCUPADO) {
        cantidadOcupados++;
      } else if (sala[indiceFila][indiceColumna] === ASIENTO_DISPONIBLE) {
        cantidadDisponibles++;
      }
    }
  }

  return [cantidadOcupados, cantidadDisponibles];
}

// Busca y devuelve el primer par libre horizontal dentro de una misma fila.
export function buscarAsientosContiguos(sala: number[][]): [[number, number], [number, number]] | null {
  for (let indiceFila: number = 0; indiceFila < sala.length; indiceFila++) {
    for (let indiceColumna: number = 0; indiceColumna < sala[indiceFila].length - 1; indiceColumna++) {
      if (
        sala[indiceFila][indiceColumna] === ASIENTO_DISPONIBLE &&
        sala[indiceFila][indiceColumna + 1] === ASIENTO_DISPONIBLE
      ) {
        return [
          [indiceFila + 1, indiceColumna + 1],
          [indiceFila + 1, indiceColumna + 2],
        ];
      }
    }
  }

  return null;
}

function ejecutarDemostracionesConsola(): void {
// Crea una sala de las dimensiones del ejercicio con todos sus asientos ocupados.
function crearSalaOcupada(): number[][] {
  const sala: number[][] = inicializarSala(CANTIDAD_FILAS, CANTIDAD_COLUMNAS);

  for (let indiceFila: number = 0; indiceFila < sala.length; indiceFila++) {
    for (let indiceColumna: number = 0; indiceColumna < sala[indiceFila].length; indiceColumna++) {
      sala[indiceFila][indiceColumna] = ASIENTO_OCUPADO;
    }
  }

  return sala;
}

// Imprime estadísticas calculadas y la primera pareja que devuelve la búsqueda.
function mostrarResumenSala(sala: number[][]): void {
  const [ocupados, disponibles]: [number, number] = contarAsientos(sala);
  const capacidad: number = sala.length * sala[0].length;
  console.log(`Capacidad total: ${capacidad}`);
  console.log(`Ocupados: ${ocupados}`);
  console.log(`Disponibles: ${disponibles}`);

  const parejaLibre: [[number, number], [number, number]] | null = buscarAsientosContiguos(sala);
  if (parejaLibre === null) {
    console.log("No se encontraron dos asientos contiguos disponibles.");
  } else {
    console.log(`Primera pareja libre: fila ${parejaLibre[0][0]}, asientos ${parejaLibre[0][1]} y ${parejaLibre[1][1]}.`);
  }
}

console.log("¡Bienvenido a Cinema Seat Manager!");
console.log(`Leyenda: ${SIMBOLO_DISPONIBLE} = disponible, ${SIMBOLO_OCUPADO} = ocupado`);

console.log("\n=== ESCENARIO 1 — SALA VACÍA ===");
const salaVacia: number[][] = inicializarSala(CANTIDAD_FILAS, CANTIDAD_COLUMNAS);
mostrarSala(salaVacia);
mostrarResumenSala(salaVacia);

console.log("\n=== ESCENARIO 2 — SALA PARCIALMENTE OCUPADA ===");
const salaParcial: number[][] = inicializarSala(CANTIDAD_FILAS, CANTIDAD_COLUMNAS);
console.log(reservarAsiento(salaParcial, 1, 1));
console.log(reservarAsiento(salaParcial, 1, 2));
console.log(reservarAsiento(salaParcial, 3, 5));
mostrarSala(salaParcial);
mostrarResumenSala(salaParcial);
console.log(reservarAsiento(salaParcial, 3, 5));
mostrarResumenSala(salaParcial);

console.log("\n=== ESCENARIO 3 — SALA CASI LLENA ===");
const salaCasiLlena: number[][] = crearSalaOcupada();
for (let indiceFila: number = 0; indiceFila < salaCasiLlena.length; indiceFila++) {
  for (let indiceColumna: number = 0; indiceColumna < salaCasiLlena[indiceFila].length; indiceColumna++) {
    const esAsientoLibre: boolean =
      (indiceFila === 0 && indiceColumna === 0) ||
      (indiceFila === 1 && indiceColumna === 2) ||
      (indiceFila === 3 && indiceColumna === 4) ||
      (indiceFila === 7 && indiceColumna === 9);
    if (esAsientoLibre) {
      salaCasiLlena[indiceFila][indiceColumna] = ASIENTO_DISPONIBLE;
    }
  }
}
mostrarSala(salaCasiLlena);
mostrarResumenSala(salaCasiLlena);

console.log("\n=== ESCENARIO 4 — SALA COMPLETAMENTE LLENA ===");
const salaLlena: number[][] = crearSalaOcupada();
mostrarSala(salaLlena);
mostrarResumenSala(salaLlena);
console.log(reservarAsiento(salaLlena, 1, 1));

console.log("\n=== VALIDACIONES DE CASOS LÍMITE ===");
const salaLimites: number[][] = inicializarSala(CANTIDAD_FILAS, CANTIDAD_COLUMNAS);
const mensajeFilaFuera: string = reservarAsiento(salaLimites, 9, 1);
const mensajeColumnaFuera: string = reservarAsiento(salaLimites, 1, 11);
const mensajeDecimal: string = reservarAsiento(salaLimites, 1.5, 1);
const mensajeReservaInicial: string = reservarAsiento(salaLimites, 3, 5);
const mensajeDuplicado: string = reservarAsiento(salaLimites, 3, 5);
console.log(`Fila fuera de rango: ${mensajeFilaFuera}`);
console.log(`Columna fuera de rango: ${mensajeColumnaFuera}`);
console.log(`Coordenada decimal: ${mensajeDecimal}`);
console.log(`Asiento duplicado: ${mensajeDuplicado}`);

const salaParFinal: number[][] = crearSalaOcupada();
salaParFinal[CANTIDAD_FILAS - 1][CANTIDAD_COLUMNAS - 2] = ASIENTO_DISPONIBLE;
salaParFinal[CANTIDAD_FILAS - 1][CANTIDAD_COLUMNAS - 1] = ASIENTO_DISPONIBLE;
const parejaFinal: [[number, number], [number, number]] | null = buscarAsientosContiguos(salaParFinal);
console.log(`Último par libre: ${parejaFinal === null ? "no encontrado" : `fila ${parejaFinal[0][0]}, asientos ${parejaFinal[0][1]} y ${parejaFinal[1][1]}`}.`);

const salaAislados: number[][] = crearSalaOcupada();
salaAislados[0][0] = ASIENTO_DISPONIBLE;
salaAislados[0][2] = ASIENTO_DISPONIBLE;
const resultadoAislados: [[number, number], [number, number]] | null = buscarAsientosContiguos(salaAislados);
console.log(`Asientos aislados: ${resultadoAislados === null ? "sin pareja" : "se encontró una pareja"}.`);

const salaSeparadaPorFilas: number[][] = crearSalaOcupada();
salaSeparadaPorFilas[1][CANTIDAD_COLUMNAS - 1] = ASIENTO_DISPONIBLE;
salaSeparadaPorFilas[2][0] = ASIENTO_DISPONIBLE;
const resultadoEntreFilas: [[number, number], [number, number]] | null = buscarAsientosContiguos(salaSeparadaPorFilas);
console.log(`Separación entre filas: ${resultadoEntreFilas === null ? "sin pareja" : "se encontró una pareja"}.`);

let dimensionesCorrectas: boolean = salaVacia.length === CANTIDAD_FILAS;
for (let indiceFila: number = 0; indiceFila < salaVacia.length; indiceFila++) {
  if (salaVacia[indiceFila].length !== CANTIDAD_COLUMNAS) {
    dimensionesCorrectas = false;
  }
}
console.log(`Dimensiones verificadas (8 × 10): ${dimensionesCorrectas ? "sí" : "no"}.`);
}

function obtenerElementoWeb(id: string): HTMLElement {
  const elemento: HTMLElement | null = document.getElementById(id);

  if (elemento === null) {
    throw new Error(`No se encontró el elemento requerido: #${id}`);
  }

  return elemento;
}

function actualizarEstadisticasWeb(salaWeb: number[][]): void {
  const [ocupadosWeb, disponiblesWeb]: [number, number] = contarAsientos(salaWeb);
  const capacidadWeb: number = ocupadosWeb + disponiblesWeb;
  obtenerElementoWeb("total-count").textContent = String(capacidadWeb);
  obtenerElementoWeb("occupied-count").textContent = String(ocupadosWeb);
  obtenerElementoWeb("available-count").textContent = String(disponiblesWeb);
}

function actualizarAspectoAsiento(
  asiento: HTMLButtonElement,
  estaOcupado: boolean,
  fila: number,
  columna: number,
  recomendado: boolean,
): void {
  const estadoAsiento: string = estaOcupado ? "ocupado" : "disponible";
  asiento.className = recomendado
    ? "aspect-square rounded-md border border-amber-200 bg-amber-400 text-slate-950 shadow-[0_0_14px_rgba(251,191,36,0.55)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
    : estaOcupado
    ? "aspect-square rounded-md border border-rose-400/40 bg-rose-500/80 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
    : "aspect-square rounded-md border border-emerald-300/30 bg-emerald-400/80 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900";
  const descripcionRecomendacion: string = recomendado ? ", recomendado para sentarse juntos" : "";
  asiento.setAttribute("aria-label", `Fila ${fila}, asiento ${columna}: ${estadoAsiento}${descripcionRecomendacion}`);
  asiento.title = `Fila ${fila}, asiento ${columna}: ${estadoAsiento}${descripcionRecomendacion}`;
}

function renderizarSalaWeb(): void {
  const salaWeb: number[][] = inicializarSala(CANTIDAD_FILAS, CANTIDAD_COLUMNAS);
  actualizarEstadisticasWeb(salaWeb);

  const mapa: HTMLElement = obtenerElementoWeb("seat-map");
  const mensajeReserva: HTMLElement = obtenerElementoWeb("booking-message");
  const botonBuscarPareja: HTMLElement = obtenerElementoWeb("find-pair-button");
  const asientosWeb: HTMLButtonElement[][] = [];
  let parejaRecomendada: [[number, number], [number, number]] | null = null;
  const fragmento: DocumentFragment = document.createDocumentFragment();
  const encabezadoColumnas: HTMLDivElement = document.createElement("div");
  encabezadoColumnas.className = "grid grid-cols-[2rem_minmax(0,1fr)] items-center gap-3 sm:gap-4";

  const espacioEtiqueta: HTMLSpanElement = document.createElement("span");
  espacioEtiqueta.setAttribute("aria-hidden", "true");
  encabezadoColumnas.appendChild(espacioEtiqueta);

  const numerosColumnas: HTMLDivElement = document.createElement("div");
  numerosColumnas.className = "grid grid-cols-10 gap-1.5 text-center text-[0.65rem] font-medium text-slate-500 sm:gap-2 sm:text-xs";
  for (let indiceColumna: number = 0; indiceColumna < CANTIDAD_COLUMNAS; indiceColumna++) {
    const numeroColumna: HTMLSpanElement = document.createElement("span");
    numeroColumna.textContent = String(indiceColumna + 1);
    numerosColumnas.appendChild(numeroColumna);
  }
  encabezadoColumnas.appendChild(numerosColumnas);
  fragmento.appendChild(encabezadoColumnas);

  for (let indiceFila: number = 0; indiceFila < salaWeb.length; indiceFila++) {
    const fila: HTMLDivElement = document.createElement("div");
    fila.className = "grid grid-cols-[2rem_minmax(0,1fr)] items-center gap-3 sm:gap-4";
    fila.setAttribute("role", "group");
    fila.setAttribute("aria-label", `Fila ${indiceFila + 1}`);

    const etiquetaFila: HTMLSpanElement = document.createElement("span");
    etiquetaFila.className = "text-right text-xs font-semibold text-slate-400 sm:text-sm";
    etiquetaFila.textContent = String(indiceFila + 1).padStart(2, "0");
    fila.appendChild(etiquetaFila);

    const asientosFila: HTMLDivElement = document.createElement("div");
    asientosFila.className = "grid grid-cols-10 gap-1.5 sm:gap-2";
    asientosFila.setAttribute("role", "group");
    asientosFila.setAttribute("aria-label", `Asientos de la fila ${indiceFila + 1}`);
    const botonesFila: HTMLButtonElement[] = [];

    for (let indiceColumna: number = 0; indiceColumna < salaWeb[indiceFila].length; indiceColumna++) {
      const asiento: HTMLButtonElement = document.createElement("button");
      const estaOcupado: boolean = salaWeb[indiceFila][indiceColumna] === ASIENTO_OCUPADO;
      const filaVisible: number = indiceFila + 1;
      const columnaVisible: number = indiceColumna + 1;

      asiento.type = "button";
      asiento.className = "aspect-square rounded-md border shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900";
      actualizarAspectoAsiento(asiento, estaOcupado, filaVisible, columnaVisible, false);
      asiento.addEventListener("click", () => {
        const estadoAnterior: number = salaWeb[indiceFila][indiceColumna];
        const resultado: string = reservarAsiento(salaWeb, filaVisible, columnaVisible);
        mensajeReserva.textContent = resultado;

        if (salaWeb[indiceFila][indiceColumna] !== estadoAnterior) {
          parejaRecomendada = null;
        }

        for (let filaBoton: number = 0; filaBoton < asientosWeb.length; filaBoton++) {
          for (let columnaBoton: number = 0; columnaBoton < asientosWeb[filaBoton].length; columnaBoton++) {
            const esRecomendado: boolean = parejaRecomendada !== null && (
              (parejaRecomendada[0][0] === filaBoton + 1 && parejaRecomendada[0][1] === columnaBoton + 1) ||
              (parejaRecomendada[1][0] === filaBoton + 1 && parejaRecomendada[1][1] === columnaBoton + 1)
            );
            actualizarAspectoAsiento(
              asientosWeb[filaBoton][columnaBoton],
              salaWeb[filaBoton][columnaBoton] === ASIENTO_OCUPADO,
              filaBoton + 1,
              columnaBoton + 1,
              esRecomendado,
            );
          }
        }
        actualizarEstadisticasWeb(salaWeb);
      });
      asientosFila.appendChild(asiento);
      botonesFila.push(asiento);
    }

    asientosWeb.push(botonesFila);
    fila.appendChild(asientosFila);
    fragmento.appendChild(fila);
  }

  mapa.appendChild(fragmento);

  botonBuscarPareja.addEventListener("click", () => {
    parejaRecomendada = buscarAsientosContiguos(salaWeb);

    for (let filaBoton: number = 0; filaBoton < asientosWeb.length; filaBoton++) {
      for (let columnaBoton: number = 0; columnaBoton < asientosWeb[filaBoton].length; columnaBoton++) {
        const esRecomendado: boolean = parejaRecomendada !== null && (
          (parejaRecomendada[0][0] === filaBoton + 1 && parejaRecomendada[0][1] === columnaBoton + 1) ||
          (parejaRecomendada[1][0] === filaBoton + 1 && parejaRecomendada[1][1] === columnaBoton + 1)
        );
        actualizarAspectoAsiento(
          asientosWeb[filaBoton][columnaBoton],
          salaWeb[filaBoton][columnaBoton] === ASIENTO_OCUPADO,
          filaBoton + 1,
          columnaBoton + 1,
          esRecomendado,
        );
      }
    }

    if (parejaRecomendada === null) {
      mensajeReserva.textContent = "No se encontraron dos asientos contiguos disponibles.";
    } else {
      mensajeReserva.textContent = `Se encontraron dos asientos juntos: fila ${parejaRecomendada[0][0]}, asientos ${parejaRecomendada[0][1]} y ${parejaRecomendada[1][1]}.`;
    }
  });
}

if (typeof document !== "undefined") {
  renderizarSalaWeb();
} else {
  ejecutarDemostracionesConsola();
}
