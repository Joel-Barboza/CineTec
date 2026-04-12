# CineTec

## Descripción general

CineTec es una aplicación web que combina:
- un backend en **ASP.NET Core** para servir una API REST y archivos estáticos,
- un frontend en **Angular** para la interfaz de usuario.

El proyecto guarda información de películas en un archivo JSON local y permite listar y agregar películas.

## Estructura importante

- `CineTec/` - proyecto backend ASP.NET Core.
- `cine-frontend/` - proyecto frontend Angular.
- `CineTec/wwwroot/` - carpeta donde se copia el build de Angular para que el backend sirva la SPA.
- `CineTec/Storage/movies.json` - almacenamiento local de películas.
- `deploy.bat` - script de despliegue que construye el frontend, copia los archivos a `wwwroot`, publica el backend y reinicia IIS.

## Qué debe saber un desarrollador

### Backend

- `CineTec/Program.cs` configura el pipeline y registra los servicios.
- `CineTec/Controllers/MoviesController.cs` expone la API:
  - `GET /api/movies` obtiene todas las películas.
  - `POST /api/movies` agrega una película nueva.
- `CineTec/Services/MovieService.cs` contiene la lógica de negocio y crea el objeto `Movie`.
- `CineTec/Repositories/MovieRepository.cs` lee y escribe datos en JSON.
- `CineTec/Entities/Movie.cs` define el modelo de película.

### Frontend

- `cine-frontend/package.json` contiene los scripts de Angular.
- El build de Angular se genera con `npm run build` y luego se copia a `CineTec/wwwroot`.
- El frontend consume la API expuesta por el backend.

### Despliegue

El script `deploy.bat` realiza estos pasos:
1. limpia `CineTec/wwwroot`,
2. construye el frontend Angular,
3. copia los archivos generados a `CineTec/wwwroot`,
4. detiene IIS,
5. publica el backend con `dotnet publish` en `C:\inetpub\CineTec`,
6. inicia IIS.

## Notas importantes

- Durante el desarrollo local, el backend lee/escribe en `CineTec/Storage/movies.json`.
- En producción, la aplicación publicada puede usar un directorio diferente (`C:\inetpub\CineTec\DataFiles`).
- Si se modifica el frontend, es necesario volver a construirlo y copiarlo a `wwwroot`.

## Cómo arrancar

### Backend

1. Abrir `CineTec.slnx` en Visual Studio.
2. Ejecutar el proyecto `CineTec`.

### Frontend

1. Ir a `cine-frontend/`.
2. Ejecutar `npm install`.
3. Ejecutar `npm start` para desarrollo local.

> El flujo típico de desarrollo es editar el frontend en `cine-frontend`, construirlo con Angular y luego publicar el backend para servir la SPA desde `CineTec/wwwroot`. 