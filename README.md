# Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Repositorio de backent laravel
https://github.com/arles071/Prueba-Grupo-OET.git

## Ejecutar Angular
Descargar el proyecto de angular e ingresar a la raiz del proyecto, una vez en 
esta ruta ejecutar los siguientes comandos:

npm install  => Este comando instala todas las dependencias de angular
ng serve => inicializa el proyecto de angular en la ruta localhost:4200

## Nota:
Revisar el archivo "resources\angular\src\environments\environment.ts" que este apuntando bien a la ruta del backend

## Pasos que tuve encuenta para realizar la prueba
De acuerdo al requerimiento de registro de vehículos se realizo un formulario para almacenar los datos del vehículo junto a la información del conductor y propietario, tambien cuando se escribe el documento se realiza una consulta a base de datos para validar la existencia del conductor o propietario que esta ingresando para el vehículo a registrar en caso de que el usuario exista los campos se llenan automaticamente y solamente se actualiza la informacion del propietario o conductor.

Tambien se habilito una ruta de nombre personas donde solamente se peude editar la persona.

## Paso en angular
* En este proyecto destaco el uso de interceptor para enviar el toque por cabecera y realizar un efecto de carga por cada petición.
* Para la creación de vehículos y personas se utiliza un modal de bootstrap al cual se le pasa información desde el componente padre al componente que se encarga de abrir el modal y de la misma manera el componente padre esta a la escucha para detectar cuando el modal se cierra. Este modal fue reutilizado para crear y actualizar un vehículo.
* Se realizo un login
* Se utilizo interfaces para vehículo y persona
* Se realizo servicios por cada crud en este caso vehicle tiene su propio servicio para generar el crud y personas
* Se descargo bootstrap, fontawesome y sweetalert2.scss los cuales los puede encontrar incluidos en el archivo
angular.json en la siguiente ruta: "resources\angular\angular.json".
* En el modal de visualizar la información de vehículos se incluyo el uso de un PIPE para mostar el testo en mayuscula.
* Se realizo un archivo de nombre enviroments.ts para agregar la ruta del servicio.
* Se implemento paginación en vehículos y personas
* Se implemento filtro por algunos campos

## Pasos en laravel
* Se realiza migración para tabla de vehículos, personas y ciudades.
* Se realiza un seede para subir ciudades y un usuario administrador para logearce desde angular
* En este caso solo utilice relacion de uno a uno en el modelo de vehículos ya que este contiene el id del propietario y conductor.
* En el model person solo se dejo creada la relación de muchos a uno donde un conductor puede estar en muchos vehículos o un propietario puede tener muchos vehículos.
* No se incluyo el registro de un usuario mediante formulario
* No se incluyo el registro de ciudades ya que para esto hay un seeder
* En las consultas se realizo paginación propio de laravel