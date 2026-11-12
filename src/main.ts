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
