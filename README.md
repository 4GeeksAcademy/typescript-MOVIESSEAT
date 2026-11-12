# Cinema Seat Manager

Cinema Seat Manager modela la gestión de asientos de un cine independiente. El ejercicio obligatorio representa una sala de **8 filas y 10 columnas (80 asientos)** y permite consultar su ocupación, reservar asientos y localizar parejas contiguas. La solución principal es una demostración de consola en TypeScript; la interfaz web es una ampliación opcional.

## Tecnologías

- **TypeScript** para la lógica y los tipos.
- **Node.js** y **npm** para ejecutar los scripts.
- **HTML5** para la estructura de la interfaz web.
- **Tailwind CSS v4**, cargado desde CDN en `index.html`. No requiere una instalación independiente para visualizar la interfaz; sí se necesita conexión a internet para descargar sus estilos.
- **Vite** para servir y compilar la interfaz web.

## Ejercicio obligatorio: lógica de consola

Las funciones principales están en `src/main.ts` y trabajan con una matriz `number[][]`. Las filas y columnas que reciben o muestran a las personas usuarias se numeran desde 1.

| Función | Parámetros | Retorno y responsabilidad |
| --- | --- | --- |
| `inicializarSala(cantidadFilas, cantidadColumnas)` | Cantidad de filas y columnas (`number`). | Crea y devuelve una matriz nueva `number[][]` con todos los asientos disponibles (`0`). |
| `mostrarSala(sala)` | Matriz de asientos (`number[][]`). | Imprime encabezados de columnas y filas numeradas; representa disponibilidad con `L` y ocupación con `X`. No modifica la matriz. |
| `reservarAsiento(sala, fila, columna)` | Matriz y coordenadas visibles (`number`). | Devuelve un mensaje (`string`). Marca el asiento como ocupado (`1`) si las coordenadas son enteros finitos, están dentro de rango y el asiento está libre. Rechaza coordenadas inválidas y reservas duplicadas. |
| `contarAsientos(sala)` | Matriz de asientos (`number[][]`). | Devuelve `[ocupados, disponibles]` como `[number, number]`, sin modificar la matriz. |
| `buscarAsientosContiguos(sala)` | Matriz de asientos (`number[][]`). | Devuelve el primer par libre horizontal de una misma fila, como `[[fila, columna], [fila, columna]]`, con coordenadas desde 1; si no hay pareja devuelve `null`. No reserva ni modifica los asientos. |

### Representación de los asientos

La sala se conserva como matriz bidimensional de números; cada arreglo interno representa una fila:

- `0` = disponible.
- `1` = ocupado.
- `L` = disponible al mostrar el mapa por consola.
- `X` = ocupado al mostrar el mapa por consola.
- `★` = pareja recomendada en la interfaz web. Es solo un indicador visual: los asientos recomendados siguen disponibles y la matriz de ocupación no cambia hasta que se reserva uno.

### Ejecutar y evaluar el ejercicio

Desde el directorio del proyecto, instala las dependencias y ejecuta la demostración obligatoria:

```bash
npm install
npm run console
```

`npm run console` ejecuta `tsx src/main.ts`. Presenta los cuatro escenarios principales y validaciones de límites; no requiere abrir la página web.

### Escenarios incluidos y resultados comprobados

1. **Sala vacía:** 0 ocupados, 80 disponibles; la primera pareja está en fila 1, asientos 1 y 2.
2. **Sala parcialmente ocupada:** 3 ocupados, 77 disponibles; la primera pareja está en fila 1, asientos 3 y 4. La reserva duplicada se rechaza y los conteos permanecen iguales.
3. **Sala casi llena con asientos libres aislados:** 76 ocupados, 4 disponibles; no se encuentra una pareja horizontal.
4. **Sala completamente ocupada:** 80 ocupados, 0 disponibles; no se encuentra pareja y se rechaza reservar un asiento ocupado.

La demostración también verifica fila y columna fuera de rango, coordenadas decimales, duplicados, una pareja libre al final de la sala, asientos aislados, asientos disponibles separados entre filas y las dimensiones de 8 × 10.

## Interfaz web opcional

La ampliación web presenta los 80 asientos y permite reservar con clic, consultar ocupados y disponibles, recibir el rechazo de reservas duplicadas y buscar dos asientos contiguos. La primera pareja libre encontrada se marca visualmente con `★` y se identifica también en su etiqueta accesible. Los estados `L` y `X`, el foco visible y los controles de botón permiten comprender y navegar la interfaz sin depender solo del color.

La interfaz reutiliza las cinco funciones de `src/main.ts`; no implementa una lógica paralela de reserva o búsqueda. El mapa puede desplazarse horizontalmente dentro de su propio contenedor en pantallas pequeñas.

### Ejecutar la interfaz web

Con las dependencias instaladas, inicia el servidor de desarrollo definido por el script `start`:

```bash
npm run start
```

Abre en el navegador la URL local que indique Vite en la terminal. El puerto puede variar si el predeterminado está ocupado. El comando `npm run console` sigue siendo suficiente para evaluar el ejercicio obligatorio.

## Verificaciones

Los siguientes scripts están definidos en `package.json`:

```bash
npm run typecheck
npm run build
```

`typecheck` comprueba los tipos sin emitir archivos. `build` ejecuta la compilación de TypeScript y genera la salida de producción de Vite.

## Estructura del proyecto

```text
.
├── index.html
├── package.json
├── README.md
├── tsconfig.json
├── vite.config.ts
├── public/
└── src/
    └── main.ts
```

- `src/main.ts`: las cinco funciones del ejercicio, sus demostraciones por consola y la integración de la interfaz web.
- `index.html`: estructura HTML5, contenido de la interfaz y carga de Tailwind CSS v4 desde CDN.
- `README.md`: documentación del proyecto.
- `package.json`: dependencias y scripts npm.
- `tsconfig.json`: configuración de TypeScript.
- `vite.config.ts`: configuración de Vite y su integración disponible para Tailwind CSS.

## Limitaciones

- Las reservas de la interfaz web se mantienen solo en memoria mientras la página permanece abierta; al recargar, la sala vuelve a estar vacía.
- No hay base de datos ni persistencia, autenticación o procesamiento de pagos.
- La interfaz web es una ampliación opcional; el ejercicio obligatorio se ejecuta por consola.
- Tailwind CSS se obtiene de un CDN y necesita conexión a internet para cargar los estilos.
- El programa es un ejercicio académico, no una plataforma comercial de venta de entradas.

## Clonar el repositorio

```bash
git clone https://github.com/4GeeksAcademy/typescript-MOVIESSEAT.git
cd typescript-MOVIESSEAT
npm install
```

## Autor

**Joaquín Rengifo**

4Geeks Academy — AI Engineering
