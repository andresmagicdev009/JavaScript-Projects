function createUser(name) {

    // variables y const locales
    // No se incluyen en el objeto de retorno por lo que son privadas
    const discordName = "@" + name; 
    let reputation = 0;

    // 2. Funcionaes que acceen a las variables privadas (via Closure)
    const obtenerReputacion = () => reputation;
    const darReputacion = () => {
        reputation++; // Modifica la variable interna de forma segura 
    }

    // 3.  Se retonra un objeto publico usando Object Shorthand
    return {
        name, 
        discordName,
        obtenerReputacion,
        darReputacion
    }

}

const juan = createUser("Mr Robot");

juan.darReputacion();
juan.darReputacion();


console.log(juan.discordName); // @Mr Robot  propiedad publica
console.log(juan.obtenerReputacion()); // 2  Acceso controlado por metodo 


console.log(juan.reputatation); // undefined por que la propiedad es privada

