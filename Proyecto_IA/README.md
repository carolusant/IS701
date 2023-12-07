
# Proyecto AI: Dectector de lenguaje de señas
 
Prototipo de un detector de lenguaje de señas muy básico utilizando modelos pre-entrenados de tensorflow.js(MediaPipe y FingerPose), implementado en Vue.js
https://i.ibb.co/XVkVDfr/sat-231207-145731.png
![alt text](https://i.ibb.co/XVkVDfr/sat-231207-145731.png)

## Instalación

Primero instaláremos el gestor de paquetes Yarn, para poder descargar todas las dependencias sin problemas, esto debido a que npm me creaba conflicto con vue

```bash
 npm install --global yarn
```

Luego de eso ejecutamos los siguientes comandos
#### Instalar dependencias del proyecto
```
yarn install
```

#### Lints y corregir archivos
```
yarn lint
```

#### Compilar app y ejecutar el servidor
```
yarn serve
```

## Bugs

Al iniciar la app nos encontramos con ese error muchas veces, llegamos a la conclusión de que era algo error de red porque los datos de esa librería esta siendo entregados mediante una CDN, y también el error se va con solo actualizar la paginas de 2-10 veces, es bien raro. Pero aparte de eso todo funciona como debería.

![alt text](https://i.ibb.co/RvBTtDn/err.png)
#### Para corregir ese bug solo tenemos que actualizar la pagina varias veces

## Autores
```javascript
Carlos Antonio Gonzales Garza 20192000980
Jeyson Samuel Mejia Hernandez 20172002003
```

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)
