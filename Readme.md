# Super Mario Clone Game

Este repositorio forma parte del workshop en vivo "El developer aumentado por IA" de [LIDR.co](https://lidr.co). Si quieres aprender a sacarle todo el partido a los asistentes de código y multiplicar tu productividad, revisa nuestro bootcamp [AI4Devs](https://www.lidr.co/ia-devs).

## Descripción

Este proyecto es un clon simple del juego Super Mario, desarrollado usando Phaser 3, un popular framework para construir juegos HTML5. El juego presenta un personaje que puede correr, saltar y recoger monedas mientras evita enemigos.

## Características

- **Animaciones del jugador**: correr, saltar y estar inactivo.
- **Monedas coleccionables**: aumentan la puntuación del jugador.
- **Enemigos**: el jugador debe evitarlos.
- **Plataformas**: el jugador puede saltar sobre ellas.
- **Escenario de fin de juego**: cuando el jugador colisiona con un enemigo.

## Configuración

Para jugar, necesitas servir los archivos usando un servidor web. Puedes configurar fácilmente un servidor local usando Python.

### Usando el Servidor HTTP de Python

Si tienes Python instalado, puedes configurar un servidor HTTP simple para servir los archivos del juego. Aquí te explicamos cómo hacerlo:

1. Navega al directorio del juego en tu terminal.
2. Ejecuta el siguiente comando para iniciar el servidor:

    - Para Python 3.x:
     ```bash
     python -m http.server
     ```

    - Para Python 2.x:
     ```bash
     python -m SimpleHTTPServer
     ```

Después de ejecutar el comando, puedes abrir tu navegador web y dirigirte a [http://localhost:8000](http://localhost:8000) para jugar.

## Archivos

- `index.html`: El archivo HTML que carga el juego.
- `main.js`: Contiene la lógica del juego y la configuración de Phaser.

## Controles del Juego

- **Teclas de flecha**: Mover al jugador (izquierda, derecha y salto).

¡Disfruta jugando y modificando el juego!
