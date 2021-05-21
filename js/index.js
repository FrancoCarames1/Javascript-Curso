// Tienda de empanadas (Empanadas de Doña Mirtha)

//Declaraciones de AJAX 
const ajaxUrl = "http://localhost:3000/ordenes"

//Definiendo las empanadas que hay
const empanadas = [{ id: 1, empanada: "Jamón y Queso", precio: 80 , cantidad: 0}, 
                    { id: 2, empanada: "Carne Suave", precio: 90, cantidad: 0 }, 
                    { id: 3, empanada: "Carne Picante", precio: 100, cantidad: 0 },
                    { id: 4, empanada: "Pollo", precio: 85, cantidad: 0 },
                    { id: 5, empanada: "Choclo", precio: 100, cantidad: 0 },]; 

const paraPlantilla = [{empanada: "Jamón y Queso", precio: 80, form: "form-empanada-JQ", input: "cantJQ"},
                        {empanada: "Carne Suave", precio: 90, form: "form-empanada-CS", input: "cantCS"},
                        {empanada: "Carne Picante", precio: 100, form: "form-empanada-CP", input: "cantCP"},
                        {empanada: "Pollo", precio: 85, form: "form-empanada-PL", input: "cantPL"},
                        {empanada: "Choclo", precio: 100, form: "form-empanada-CL", input: "cantCL"}];

// Funciones

function existe(arrayE, idEmpanada, cantidadE, numeroPosicionArray) {
    
    //busca en el array si ya había empanadas con ese id
    const buscar = arrayE.find( empanada => empanada.id  === idEmpanada);

    if ( buscar ){
        // si había se cambia solo la cantidad
        arrayE.map(function(dato){
            if(dato.id === idEmpanada){
                dato.cantidad = cantidadE;
            }
        })
    }
    else{
        // si no había se agrega una orden y el número
        arrayE.push(empanadas[numeroPosicionArray])
        arrayE.map(function(dato){
            if(dato.id === idEmpanada){
                dato.cantidad = cantidadE;
            }
        })
    }
}

//Crea la plantilla de elementos con sus formularios
for (const plantillaVisual of paraPlantilla){
let plantilla = document.createElement("div");
plantilla.setAttribute("class","col");
plantilla.innerHTML = `<div class="card">
                            <h4 class="card-title"> ${plantillaVisual.empanada}</h4>
                            <form class="formEmpanadas" id="${plantillaVisual.form}">
                                <p>Cantidad:</p>
                                <input type="number" id="${plantillaVisual.input}" min="0">
                                
                            </form>
                            <p class="card-body">Precio por unidad: ${plantillaVisual.precio} $</p>
                        </div>`;
//Agregamos el contenido
$("#divPadre").append(plantilla);}

// Declaración de orden
let nuevaOrden = [];

//Declaración de input
const inputCantidadJQ = document.getElementById("cantJQ");

//Eventos al apretar botones en las empanadas. Intente volver esto una función y no funciono
$("#form-empanada-JQ").change( (event) => {

    //Se guarda el número de empanadas que quiere el cliente
    const cantidad = inputCantidadJQ.value;

    //Se ejecuta la función existe
    existe(nuevaOrden, 1, cantidad, 0);

    console.log(nuevaOrden);

    //Se actualiza el carro
    $("#carro").trigger("click");
})

//Declaración de ids formulario y input
const inputCantidadCS = document.getElementById("cantCS");

//Eventos al apretar botones en las empanadas. Intente volver esto una función y no funciono
$("#form-empanada-CS").change( (event) => {

    //Se guarda el número de empanadas que quiere el cliente
    const cantidad = inputCantidadCS.value;

    //Se ejecuta la función existe
    existe(nuevaOrden, 2, cantidad, 1);

    console.log(nuevaOrden);

    //Se actualiza el carro
    $("#carro").trigger("click");
})

//Declaración de ids formulario y input
const inputCantidadCP = document.getElementById("cantCP");

//Eventos al apretar botones en las empanadas. Intente volver esto una función y no funciono
$("#form-empanada-CP").change( (event) => {

    //Se guarda el número de empanadas que quiere el cliente
    const cantidad = inputCantidadCP.value;

    //Se ejecuta la función existe
    existe(nuevaOrden, 3, cantidad, 2);

    console.log(nuevaOrden);

    //Se actualiza el carro
    $("#carro").trigger("click");
})

//Declaración de ids formulario y input
const inputCantidadPL = document.getElementById("cantPL");

//Eventos al apretar botones en las empanadas. Intente volver esto una función y no funciono
$("#form-empanada-PL").change( (event) => {

    //Se guarda el número de empanadas que quiere el cliente
    const cantidad = inputCantidadPL.value;

    //Se ejecuta la función existe
    existe(nuevaOrden, 4, cantidad, 3);

    console.log(nuevaOrden);

    //Se actualiza el carro
    $("#carro").trigger("click");
})
//Declaración de ids formulario y input
const inputCantidadCL = document.getElementById("cantCL");

//Eventos al apretar botones en las empanadas. Intente volver esto una función y no funciono
$("#form-empanada-CL").change( (event) => {

    //Se guarda el número de empanadas que quiere el cliente
    const cantidad = inputCantidadCL.value;

    //Se ejecuta la función existe
    existe(nuevaOrden, 5, cantidad, 4);

    console.log(nuevaOrden);

    //Se actualiza el carro
    $("#carro").trigger("click");
})

//Hace que si apretan enter se actualicen todos los input de cantidad de empanadas
//Porque al apretar enter están provocando un cambio y eso hace que se dispare automáticamente el change
//Antes utilicé trigger y por esa razón se ejecutaba 2 veces la actualización
$(".formEmpanadas").submit( function(event){
    
    event.preventDefault()
    
})

//Declaración de botón de actualización y tabla donde se publica
const tabla = document.getElementById("tabla");

$("table").hide()
$("#montoFinal").hide()

//Creación y actualización de tabla
$("#carro").click( function(){
    let elementosAnteriores = document.getElementsByTagName("tr");

    if ( tabla.childElementCount == 1 ){

        const ordenFiltrada = nuevaOrden.filter(orden => orden.cantidad > 0);

        console.log(ordenFiltrada);

        let montoFinal = 0;

        for (const orden of ordenFiltrada) {

            $("table").fadeOut("slow")

            let contenedor = document.createElement("tr");

            let precioConjunto = orden.cantidad * orden.precio;
            
            montoFinal = precioConjunto + montoFinal;

            contenedor.innerHTML = `<td> ${orden.id} </td>
                                    <td> ${orden.empanada} </td>
                                    <td> ${orden.cantidad} </td>
                                    <td> ${precioConjunto}$ </td>`;

            tabla.appendChild(contenedor);

        }

        $("table").fadeIn("slow")

        //Modificación del texto que figura el monto final
        $("#montoFinal").html( `Monto final: <b>${montoFinal}$</b>`)

        $("#montoFinal").delay("500").slideDown("slow")

    }else{

        $("table").fadeOut("slow")

        $("#montoFinal").slideUp("fast")

        let vueltas = tabla.childElementCount;
        while(vueltas > 1){
            tabla.removeChild(elementosAnteriores[1])
            vueltas = vueltas - 1;
        }

        const ordenFiltrada = nuevaOrden.filter(orden => orden.cantidad > 0);

        let montoFinal = 0;

        for (const orden of ordenFiltrada) {

            let contenedor = document.createElement("tr");

            let precioConjunto = orden.cantidad * orden.precio;
            
            montoFinal = precioConjunto + montoFinal;

            contenedor.innerHTML = `<td> ${orden.id} </td>
                                    <td> ${orden.empanada} </td>
                                    <td> ${orden.cantidad} </td>
                                    <td> ${precioConjunto}$ </td>`;

            tabla.appendChild(contenedor);
        }

        $("table").fadeIn("slow")

        //Modificación del texto que figura el monto final
        $("#montoFinal").html( `Monto final: <b>${montoFinal}$</b>`)

        $("#montoFinal").delay("500").slideDown("slow")

    }
})

const formPago = document.getElementById("enviarPagar")

let direccion = localStorage.getItem('direccion');
let telefono = localStorage.getItem('telefono');

if((direccion !== null)&&(direccion !== "null")){
    const inputDireccion = document.getElementById("direccion");
    const inputTelefono = document.getElementById("telefono");
    inputDireccion.setAttribute("value",direccion);
    inputTelefono.setAttribute("value",telefono);
    //Agregar el método de pago
}

formPago.addEventListener("submit",(event) => {

    event.preventDefault();

    const inputDireccion = document.getElementById("direccion");
    const inputTelefono = document.getElementById("telefono");

    let guardarDireccion = inputDireccion.value;
    let guardarTelefono = inputTelefono.value;

    localStorage.setItem("direccion", guardarDireccion);
    localStorage.setItem("telefono", guardarTelefono);

    let ordenFinal = {Direccion: guardarDireccion, Telefono: guardarTelefono, Orden: nuevaOrden};

    console.log(ordenFinal)

    $.post(ajaxUrl, ordenFinal, (response, status) =>{
        if(status === "success"){

            console.log(status)
            console.log(response)

            $("#miModal").css({

                'display': 'block'
            
            });

        }else{
            alert("Error")
        }
    })
})

$(".close").click(function(){

    $("#miModal").css({

        'display': 'none'

    })

})
