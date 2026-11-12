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

const salaInicial: number[][] = inicializarSala(CANTIDAD_FILAS, CANTIDAD_COLUMNAS);

console.log("¡Bienvenido a Cinema Seat Manager!");
console.log("Mapa de asientos:");
mostrarSala(salaInicial);
console.log(`Leyenda: ${SIMBOLO_DISPONIBLE} = disponible, ${SIMBOLO_OCUPADO} = ocupado`);

console.log("\nPRUEBAS DE RESERVA");
console.log("Estado inicial de la sala:");
mostrarSala(salaInicial);

const mensajeReserva: string = reservarAsiento(salaInicial, 3, 5);
console.log(mensajeReserva);
console.log("Sala después de reservar fila 3, asiento 5:");
mostrarSala(salaInicial);

console.log(reservarAsiento(salaInicial, 3, 5));
console.log(reservarAsiento(salaInicial, 9, 5));
console.log(reservarAsiento(salaInicial, 2, 11));

let intentosFallidosSinCambios: boolean = salaInicial[2][4] === ASIENTO_OCUPADO;

for (let indiceFila: number = 0; indiceFila < salaInicial.length; indiceFila++) {
  for (let indiceColumna: number = 0; indiceColumna < salaInicial[indiceFila].length; indiceColumna++) {
    if ((indiceFila !== 2 || indiceColumna !== 4) && salaInicial[indiceFila][indiceColumna] !== ASIENTO_DISPONIBLE) {
      intentosFallidosSinCambios = false;
    }
  }
}

if (intentosFallidosSinCambios) {
  console.log("Verificación correcta: los intentos fallidos no modificaron otros asientos.");
} else {
  console.log("Verificación incorrecta: se detectó un cambio inesperado en la sala.");
}

console.log("\nPRUEBAS DE CONTEO DE ASIENTOS");
const salaConteo: number[][] = inicializarSala(CANTIDAD_FILAS, CANTIDAD_COLUMNAS);
const capacidadTotal: number = CANTIDAD_FILAS * CANTIDAD_COLUMNAS;

const [ocupadosIniciales, disponiblesIniciales]: [number, number] = contarAsientos(salaConteo);
console.log(`Escenario A — Sala vacía: ocupados ${ocupadosIniciales}, disponibles ${disponiblesIniciales}.`);

console.log(reservarAsiento(salaConteo, 3, 5));
const [ocupadosTrasUnaReserva, disponiblesTrasUnaReserva]: [number, number] = contarAsientos(salaConteo);
console.log(`Escenario B — Una reserva: ocupados ${ocupadosTrasUnaReserva}, disponibles ${disponiblesTrasUnaReserva}.`);

console.log(reservarAsiento(salaConteo, 2, 2));
console.log(reservarAsiento(salaConteo, 8, 10));
const [ocupadosTrasVariasReservas, disponiblesTrasVariasReservas]: [number, number] = contarAsientos(salaConteo);
console.log(`Escenario C — Varias reservas: ocupados ${ocupadosTrasVariasReservas}, disponibles ${disponiblesTrasVariasReservas}.`);

console.log(reservarAsiento(salaConteo, 3, 5));
const [ocupadosTrasDuplicada, disponiblesTrasDuplicada]: [number, number] = contarAsientos(salaConteo);
console.log(`Escenario D — Reserva duplicada: ocupados ${ocupadosTrasDuplicada}, disponibles ${disponiblesTrasDuplicada}.`);

const salaAntesDelConteo: number[][] = [];
for (let indiceFila: number = 0; indiceFila < salaConteo.length; indiceFila++) {
  const filaCopiada: number[] = [];
  for (let indiceColumna: number = 0; indiceColumna < salaConteo[indiceFila].length; indiceColumna++) {
    filaCopiada.push(salaConteo[indiceFila][indiceColumna]);
  }
  salaAntesDelConteo.push(filaCopiada);
}

const [ocupadosFinales, disponiblesFinales]: [number, number] = contarAsientos(salaConteo);
let conteoSinModificarSala: boolean = true;
for (let indiceFila: number = 0; indiceFila < salaConteo.length; indiceFila++) {
  for (let indiceColumna: number = 0; indiceColumna < salaConteo[indiceFila].length; indiceColumna++) {
    if (salaConteo[indiceFila][indiceColumna] !== salaAntesDelConteo[indiceFila][indiceColumna]) {
      conteoSinModificarSala = false;
    }
  }
}

console.log("Escenario E — Comprobación de integridad:");
console.log(`Capacidad total: ${capacidadTotal} asientos`);
console.log(`Asientos ocupados: ${ocupadosFinales}`);
console.log(`Asientos disponibles: ${disponiblesFinales}`);
console.log(`La suma coincide con la capacidad: ${ocupadosFinales + disponiblesFinales === capacidadTotal ? "sí" : "no"}.`);
console.log(`contarAsientos no modificó la matriz: ${conteoSinModificarSala ? "sí" : "no"}.`);
