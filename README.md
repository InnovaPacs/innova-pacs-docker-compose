# Docker-Compose para DCM4CHEE y OHIF Viewer

Este proyecto despliega una solución completa de PACS (Sistema de Archivamiento y Comunicación de Imágenes) utilizando Docker Compose. Incluye el servidor de archivo de imágenes [dcm4chee-arc-light](https://www.dcm4che.org/), una base de datos PostgreSQL, un servidor LDAP y el visor de imágenes médicas [OHIF Viewer](https://ohif.org/).

## Prerrequisitos

Asegúrate de tener instalados los siguientes programas en tu sistema:

*   [Docker](https://docs.docker.com/get-docker/)
*   [Docker Compose](https://docs.docker.com/compose/install/)

## Servicios

Este `docker-compose.yml` levantará los siguientes servicios:

*   **`ldap`**: Servidor OpenLDAP para la gestión de usuarios y directorios de dcm4chee.
*   **`db`**: Base de datos PostgreSQL para almacenar los metadatos de las imágenes y la configuración de la aplicación.
*   **`arc`**: El servidor principal de dcm4chee-arc-light, que gestiona el almacenamiento DICOM, la interfaz de usuario y los servicios DICOMweb.
*   **`ohif`**: El visor de imágenes médicas OHIF, que se conecta a dcm4chee-arc para visualizar los estudios.

## Configuración

### OHIF Viewer

La configuración del visor OHIF se encuentra en `ohif/app-config.js`. Por defecto, está configurado para conectarse a un servidor dcm4chee en una IP pública. Para un entorno de desarrollo local, necesitarás modificar las URLs para que apunten a tu máquina local.

Reemplaza la dirección IP `154.38.162.74` con `localhost` o la dirección IP de tu máquina anfitriona en el archivo `ohif/app-config.js`:

```javascript
// ohif/app-config.js

window.config = {
  // ...
  dataSources: [
    {
      // ...
      configuration: {
        friendlyName: 'dcmjs DICOMWeb Server',
        name: 'DCM4CHEE',
        wadoUriRoot: 'http://localhost:8080/dcm4chee-arc/aets/DCM4CHEE/wado',
        qidoRoot: 'http://localhost:8080/dcm4chee-arc/aets/DCM4CHEE/rs',
        wadoRoot: 'http://localhost:8080/dcm4chee-arc/aets/DCM4CHEE/rs',
        // ...
      },
    },
  ],
  // ...
};
```

## Cómo Ejecutar la Aplicación

1.  Clona este repositorio.
2.  Navega al directorio del proyecto.
3.  Ejecuta el siguiente comando para iniciar todos los servicios en segundo plano:

    ```bash
    docker-compose up -d
    ```

Para detener los servicios, ejecuta:

```bash
docker-compose down
```

## Acceso a los Servicios

Una vez que los contenedores estén en funcionamiento, podrás acceder a los siguientes servicios desde tu navegador web:

*   **OHIF Viewer**: [http://localhost:3010](http://localhost:3010)
*   **dcm4chee-arc-light UI**: [http://localhost:8080/dcm4chee-arc/ui2](http://localhost:8080/dcm4chee-arc/ui2)

### Credenciales por Defecto

*   **dcm4chee-arc-light UI**:
    *   **Usuario**: `admin`
    *   **Contraseña**: `admin`
*   **Base de Datos (PostgreSQL)**:
    *   **Usuario**: `pacs`
    *   **Contraseña**: `pacs`
    *   **Base de datos**: `pacsdb`