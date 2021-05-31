// Tienda de empanadas (Empanadas de Doña Mirtha)

const ajaxUrl = "http://localhost:3000/ordenes"
const URLJSON1 = "data/empanadas.json"
const URLJSON2 = "data/plantillas.json"

const empanadas = []

$.getJSON(URLJSON1, function (respuesta, estado) {

    if(estado === "success"){

        let productos = respuesta;

        for (const producto of productos) {
            empanadas.push(producto)
        }
    }
})


function existe(arrayE, idEmpanada, cantidadE, numeroPosicionArray) {
    
    const buscar = arrayE.find( empanada => empanada.id  === idEmpanada);

    if ( buscar ){

        arrayE.map(function(dato){
            if(dato.id === idEmpanada){
                dato.cantidad = cantidadE;
            }
        })
    }
    else{

        arrayE.push(empanadas[numeroPosicionArray])

        arrayE.map(function(dato){
            if(dato.id === idEmpanada){
                dato.cantidad = cantidadE;
            }
        })
    }
}

function listandoOrden(inputCantidad, arrayOrden, formEscuchado) {

    const cantidad = inputCantidad.value;

    const arrayActual = paraPlantilla.find(x => x.form === formEscuchado);

    const posicionArray = empanadas.findIndex(x => x.id === arrayActual.id);

    existe(arrayOrden, arrayActual.id, cantidad, posicionArray)
}


const paraPlantilla = [];

let nuevaOrden = [];

$.getJSON(URLJSON2, function (respuesta, estado) {

    if(estado === "success"){

        let productos = respuesta;

        for (const producto of productos) {

            paraPlantilla.push(producto)

        }
        for (const plantillaVisual of paraPlantilla){

            let plantilla = document.createElement("div");

            plantilla.setAttribute("class","col");

            plantilla.innerHTML = `<div class="card">
                                        <h4 class="card-title"> ${plantillaVisual.empanada}</h4>
                                        <form class="formEmpanadas" id="${plantillaVisual.form}">
                                            <p>Cantidad:</p>
                                            <input type="number" id="${plantillaVisual.input}" min="0" value="0">
                                            
                                        </form>
                                        <p class="card-body">Precio por unidad: ${plantillaVisual.precio} $</p>
                                    </div>`;

            $("#divPadre").append(plantilla);

        }

        const inputCantidadJQ = document.getElementById("cantJQ");

        $("#form-empanada-JQ").change( (event) => {

            listandoOrden(inputCantidadJQ, nuevaOrden, "form-empanada-JQ")

            $("#carro").trigger("click");

        })

        const inputCantidadCS = document.getElementById("cantCS");
        
        $("#form-empanada-CS").change( (event) => {

            listandoOrden(inputCantidadCS, nuevaOrden, "form-empanada-CS")

            $("#carro").trigger("click");

        })

        const inputCantidadCP = document.getElementById("cantCP");

        $("#form-empanada-CP").change( (event) => {

            listandoOrden(inputCantidadCP, nuevaOrden, "form-empanada-CP")

            $("#carro").trigger("click");

        })

        const inputCantidadPL = document.getElementById("cantPL");

        $("#form-empanada-PL").change( (event) => {

            listandoOrden(inputCantidadPL, nuevaOrden, "form-empanada-PL")

            $("#carro").trigger("click");

        })
        const inputCantidadCL = document.getElementById("cantCL");

        $("#form-empanada-CL").change( (event) => {

            listandoOrden(inputCantidadCL, nuevaOrden, "form-empanada-CL")

            $("#carro").trigger("click");

        })

        $(".formEmpanadas").submit( function(event){
    
            event.preventDefault()
            
        })

    }
});

const tabla = document.getElementById("tabla");

$("table").hide()
$("#montoFinal").hide()

$("#carro").click( function(){
    let elementosAnteriores = document.getElementsByTagName("tr");

    if ( tabla.childElementCount === 1 ){

        const ordenFiltrada = nuevaOrden.filter(orden => orden.cantidad > 0)

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
