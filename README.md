# Reto frontend

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

![image](https://github.com/user-attachments/assets/bd37375c-e1c6-463c-8945-b9d527106756)

- Detalle de vuelo y seleccion de asientos para pagar
  
![image](https://github.com/user-attachments/assets/8a0c1738-86c7-43b3-8915-21c031dceabe)

- Lista de tickets del usuario
  
![image](https://github.com/user-attachments/assets/fb3a6de5-0c8b-47ae-aedd-691b95962adb)

- Registro

![image](https://github.com/user-attachments/assets/5c356db5-3d04-4699-81fd-9600544bfff4)

- Login

![image](https://github.com/user-attachments/assets/9cce4273-105e-4b10-9a68-9fc009ef8efd)

#### **Importante**
Se debe tener corriendo el backend para que funcione este proyecto. Link del backend: [Backend](https://github.com/SebastianContrerasR/reto-at-backend)
