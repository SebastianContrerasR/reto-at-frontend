# Reto frontend
## Video Demo

Para abrir el video, click en la imagen.

[![Demo del proyecto](https://img.youtube.com/vi/30_mVe9EnyQ/maxresdefault.jpg)](https://youtu.be/30_mVe9EnyQ)

O copiar el enlace
```
https://youtu.be/30_mVe9EnyQ
```

#### Ejecución del Proyecto

Para ejecutar el proyecto, sigue estos pasos:

1. **Instalar Dependencias**: Asegúrate de tener todas las dependencias instaladas ejecutando:
   ```bash
   npm install
   ```
2. **Agregar env**: Asegúrate de copiar las variables de entorno a `env.local` o `env.production`.
3. **Ejecutar el Servidor de Desarrollo**: Inicia el servidor de desarrollo con:
   ```bash
   npm run dev
   ```
   Esto ejecutará Next.js en el puerto 4000 por defecto (`http://localhost:4000`).

4. **Construir el Proyecto para Producción**: Si deseas construir el proyecto para producción, usa:
   ```bash
   npm run build
   ```

5. **Iniciar el Servidor de Producción**: Una vez construido, puedes iniciar el servidor de producción con:
   ```bash
   npm run start
   ```

#### Arquitectura Basada en Características

Para el proyecto se usa una arquitectura basada en caracteristicas. Esta estructura se refleja en el proyecto, donde cada característica (como autenticación, vuelos y tickets) tiene su propia carpeta que agrupa componentes, servicios, contextos y tipos relacionados.

**Ventajas de la Arquitectura Basada en Características:**

1. **Cohesión**
2. **Escalabilidad**
3. **Mantenimiento**

**Relación con los Principios SOLID:**

- **Single Responsibility Principle (SRP)**: Cada carpeta o módulo tiene una única responsabilidad y está diseñado para manejar una parte específica del proyecto, como autenticación o gestión de vuelos.
- **Open/Closed Principle (OCP)**: La arquitectura permite extender funcionalidades sin modificar el código existente. Por ejemplo, puedes agregar nuevos componentes o servicios dentro de una característica sin afectar a otras.
- **Interface Segregation Principle (ISP)**: Cada módulo tiene interfaces específicas que se ajustan a sus necesidades, evitando interfaces grandes y complejas.
- **Dependency Inversion Principle (DIP)**: La arquitectura facilita la inyección de dependencias y el desacoplamiento entre componentes y servicios, promoviendo una mejor modularidad.

#### Tecnologías Usadas

- **Next.js**
- **Tailwind CSS**
- **TypeScript**
- **jsPDF**
- **Sonner**

#### **Capturas**
- Pagina principal (Lista de vuelos)

![image](https://github.com/user-attachments/assets/34d698fc-4123-47dc-85a1-24f74f8e93ab)

- Detalle de vuelo
  
![image](https://github.com/user-attachments/assets/fd9937a1-a9f2-4a80-b6bd-50b60ff79375)

- Seleccion de asientos para pagar

![image](https://github.com/user-attachments/assets/dde9fdc5-5514-4d5b-bb94-5f22a8acecbc)

- Lista de tickets del usuario
  
![image](https://github.com/user-attachments/assets/789c1e52-3b76-4701-a0a9-5d06fabdc832)

- Ejemplo de ticket para imprimir

![image](https://github.com/user-attachments/assets/ae2c9ae1-e2d5-45c5-9a5d-22a0a43e24c6)

- Registro

![image](https://github.com/user-attachments/assets/5c356db5-3d04-4699-81fd-9600544bfff4)

- Login

![image](https://github.com/user-attachments/assets/9cce4273-105e-4b10-9a68-9fc009ef8efd)

#### **Importante**
Se debe tener corriendo el backend para que funcione este proyecto. Link del backend: [Backend](https://github.com/SebastianContrerasR/reto-at-backend)
