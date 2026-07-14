class Persona {
    constructor(nombre, apellido, edad, dni){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this._dni = dni;
    }

    getDni() {
        return this._dni;
    }

    setDni(dni){
        // Validar si es una cedula ecuatoriana 
        if(dni.length !== 10 || !/^\d+$/.test(dni)) {
            console.error("El DNI debe tener 10 dígitos y contener solo números.");
            return null;
        }
        this._dni = dni;
    }



    // Set ara el nombre
    setNombre(nombre) {
        if (typeof nombre !== 'string' || nombre.trim() === '') {
            console.error("El nombre debe ser una cadena de texto no vacía.");
            return null;
        }   

        this.nombre = nombre;
    }

    // Set para el apellido
    setApellido(apellido) {
        if (typeof apellido !== 'string' || apellido.trim() === '') {
            console.error("El apellido debe ser una cadena de texto no vacía.");
            return null;
        }

        this.apellido = apellido;
    }

    // Verificar que la edad sea un número positivo 
    setEdad(edad) {
        if (typeof edad !== 'number' || edad < 0) {
            console.error("La edad debe ser un número positivo.");
            return null;
        }   

        this.edad = edad;
    }



}


/// Herencia de clases 


// Clase Padre (Super clase)
class Dispositivo {
    constructor (marca, modelo) {
        this.marca = marca;
        this.modelo = modelo;
        this.encendido = false;
    }


    encender() {
        this.encendido = true;
        return `El dispositivo ${this.marca} ${this.modelo} ha sido encendido.`;
    }

    apagar() {
        this.encendido = false;
        return `El dispositivo ${this.marca} ${this.modelo} ha sido apagado.`;
    }

    mostrarInfo() {
        return `Marca: ${this.marca}, Modelo: ${this.modelo}, Estado: ${this.encendido ? 'Encendido' : 'Apagado'}`;
    }
}

// Clase Hija (Sub clase)
class Smartphone extends Dispositivo {
    constructor(marca, modelo, sistemaOperativo){
        // 'super' llama al constructor de la clase padre (Dispositivo)
        // Esto es obligatorio antes de poder usar 'this' en el constructor hijo
        super(marca, modelo);
        this.sistemaOperativo = sistemaOperativo;
    }

    mostrarInfo() {
        // Podemos reutilizar el metodo del padre usando super.metodo()
        return `${super.mostrarInfo()}, Sistema Operativo: ${this.sistemaOperativo}`;
    }

    tomarFoto(){
        if(this.encendido) {
            return `La foto ha sido tomada con el ${this.marca} ${this.modelo}.`;
        }
        return `El dispositivo ${this.marca} ${this.modelo} está apagado. Por favor, enciéndelo primero.`;
    }

}


class CuentaBancaria {
    #saldo
    #titular

    constructor(titular, saldoInicial) {
        this.#titular = titular;
        this.#saldo = saldoInicial;
    }


    obtenerSaldo(){
        return this.#saldo;
    }


    // Metodo publico para depositar 
    depositar(monto) {
        if(this.#validarMonto(monto)) {
            this.#saldo += monto;
            return `Se han depositado ${monto}. Nuevo saldo: ${this.#saldo}`;
        } else{
            console.log("Monto inválido. Debe ser un número positivo.");
        }
    }

    // Metodo privado para validar el monto
    #validarMonto(monto){
        return monto > 0;
    }
}


// Creacion del objeto celular 

const miTelefono = new Smartphone("Samsung", "Galaxy S21", "Android");
console.log(miTelefono.encender());
console.log(miTelefono.mostrarInfo());
console.log(miTelefono.tomarFoto());
console.log(miTelefono.apagar());
console.log(miTelefono.tomarFoto());



