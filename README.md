# Reto frontend
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

#### Ejecución del Proyecto

Para ejecutar el proyecto, sigue estos pasos:

1. **Instalar Dependencias**: Asegúrate de tener todas las dependencias instaladas ejecutando:
   ```bash
   npm install
   ```

2. **Ejecutar el Servidor de Desarrollo**: Inicia el servidor de desarrollo con:
   ```bash
   npm run dev
   ```
   Esto ejecutará Next.js en el puerto 4000 por defecto (`http://localhost:4000`).

3. **Construir el Proyecto para Producción**: Si deseas construir el proyecto para producción, usa:
   ```bash
   npm run build
   ```

4. **Iniciar el Servidor de Producción**: Una vez construido, puedes iniciar el servidor de producción con:
   ```bash
   npm run start
   ```

#### **Importante**
Se debe tener corriendo el backend para que funcione este proyecto. Link del backend: [Texto del Enlace](http://ejemplo.com)
