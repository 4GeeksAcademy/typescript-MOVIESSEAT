const CANTIDAD_FILAS: number = 8;
const CANTIDAD_COLUMNAS: number = 10;
const ASIENTO_DISPONIBLE: number = 0;
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

const salaInicial: number[][] = inicializarSala(CANTIDAD_FILAS, CANTIDAD_COLUMNAS);

console.log("¡Bienvenido a Cinema Seat Manager!");
console.log("Mapa de asientos:");
mostrarSala(salaInicial);
console.log(`Leyenda: ${SIMBOLO_DISPONIBLE} = disponible, ${SIMBOLO_OCUPADO} = ocupado`);
