# Cinema Seat Manager 🎬

Cinema Seat Manager es un programa de consola para consultar y gestionar reservas de asientos de un cine independiente. Está desarrollado en TypeScript como proyecto académico del programa **AI Engineering de 4Geeks Academy**.

## Descripción del problema

El programa representa una sala de **8 filas y 10 asientos por fila**. Permite mostrar la disponibilidad, reservar asientos individuales sin aceptar reservas duplicadas, consultar los conteos y buscar el primer par de asientos libres consecutivos horizontalmente dentro de una misma fila.

## Tecnologías utilizadas

- TypeScript
- Node.js
- npm
- Git y GitHub para el control de versiones y alojamiento del proyecto

## Funcionalidades principales

Las cinco funciones públicas implementadas se encuentran en `src/main.ts`:

| Función | Parámetros | Resultado y comportamiento |
| --- | --- | --- |
| `inicializarSala(cantidadFilas, cantidadColumnas)` | Cantidad de filas y columnas (`number`). | Devuelve una matriz `number[][]` nueva, inicializada con asientos disponibles (`0`). |
| `mostrarSala(sala)` | Matriz de asientos (`number[][]`). | Imprime filas y columnas numeradas y representa los valores como `L` o `X`. No modifica la matriz. |
| `reservarAsiento(sala, fila, columna)` | Matriz y coordenadas visibles (`number`). | Devuelve un mensaje (`string`). Cambia el asiento de `0` a `1` si las coordenadas son enteros finitos válidos y el asiento está disponible; rechaza ubicaciones inválidas u ocupadas. |
| `contarAsientos(sala)` | Matriz de asientos (`number[][]`). | Devuelve la tupla `[ocupados, disponibles]` y no modifica la matriz. |
| `buscarAsientosContiguos(sala)` | Matriz de asientos (`number[][]`). | Devuelve el primer par horizontal como `[[fila, columna], [fila, columna]]` con coordenadas visibles desde 1; si no hay pareja, devuelve `null`. No modifica ni reserva los asientos. |

## Representación de los asientos

La estructura principal es una matriz bidimensional `number[][]`: cada arreglo interno corresponde a una fila.

- `0`: asiento disponible.
- `1`: asiento ocupado.
- `L`: representación en consola de un asiento disponible (*libre*).
- `X`: representación en consola de un asiento ocupado.

Las filas y columnas se muestran al usuario empezando desde **1**. Los índices internos de los arreglos empiezan desde **0**, por lo que las coordenadas visibles se convierten a índices restando uno.

## Instalación y ejecución

1. Clona el repositorio y entra a su directorio:

   ```bash
   git clone https://github.com/4GeeksAcademy/typescript-MOVIESSEAT
   cd typescript-MOVIESSEAT
   ```

2. Abre el proyecto en una terminal local o en GitHub Codespaces.
3. Instala las dependencias definidas por el proyecto:

   ```bash
   npm install
   ```

4. Ejecuta la demostración de consola:

   ```bash
   npm run console
   ```

5. Comprueba los tipos de TypeScript:

   ```bash
   npm run typecheck
   ```

Ambos comandos están definidos en `package.json`. El script `console` ejecuta `tsx src/main.ts`; `typecheck` ejecuta `tsc --noEmit`.

## Ejemplo de salida

El formato utilizado por `mostrarSala()` incluye los encabezados numéricos de columna y el número visible de cada fila:

```text
      1   2   3   4   5   6   7   8   9  10
 1 |  X   X   L   L   L   L   L   L   L   L
 2 |  L   L   L   L   L   L   L   L   L   L
 3 |  L   L   L   L   X   L   L   L   L   L
```

## Escenarios de demostración

Al ejecutar `npm run console`, el programa crea una matriz independiente para cada escenario y obtiene los conteos y las parejas mediante las funciones implementadas:

1. **Sala vacía:** 0 ocupados y 80 disponibles. La primera pareja libre está en la fila 1, asientos 1 y 2.
2. **Sala parcialmente ocupada:** 3 ocupados y 77 disponibles. La primera pareja libre está en la fila 1, asientos 3 y 4. Al intentar repetir una reserva, se rechaza y el conteo no cambia.
3. **Sala casi llena:** 76 ocupados y 4 disponibles aislados. No se encuentra una pareja horizontal.
4. **Sala completamente llena:** 80 ocupados y 0 disponibles. No se encuentra una pareja y una reserva de un asiento ocupado se rechaza.

La demostración incluye también validaciones de fila y columna fuera de rango, coordenadas decimales, reservas duplicadas, una pareja libre al final de la sala, asientos aislados y asientos libres separados entre filas.

## Restricciones del proyecto

El ejercicio utiliza arreglos bidimensionales, funciones con tipos explícitos, parámetros y valores de retorno, ciclos `for`, condicionales y tuplas para devolver varios resultados. No se utilizan objetos ni clases para representar asientos.

## Limitaciones

- Es una demostración programada de consola, no un sistema comercial de venta de entradas.
- No incluye base de datos ni persistencia: las reservas no se conservan entre ejecuciones.
- No implementa un proceso de compra.
- No contiene una interfaz web.
- Los escenarios se ejecutan como pruebas predefinidas; no hay menú interactivo.

## Estructura del repositorio

```text
.
├── README.md
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
├── index.html
├── learn.json
├── README.es.md
├── public/
└── src/
    └── main.ts
```

El árbol muestra los archivos relevantes de la plantilla y del programa; también existen archivos auxiliares de configuración y control de versiones.

## Aprendizajes

- Construcción y recorrido de matrices bidimensionales.
- Funciones TypeScript con parámetros y retornos tipados.
- Uso de ciclos `for` y condicionales.
- Conversión y validación de índices.
- Tuplas para representar resultados múltiples.
- Pruebas de escenarios y casos límite por consola.

## Autor y contexto académico

- **Autor:** Joaquín Rengifo
- **Institución:** 4Geeks Academy
- **Programa:** AI Engineering
