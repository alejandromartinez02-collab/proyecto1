import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

var boton = document.getElementById("botonAgregar");
var lista = document.getElementById("listaTareas");
var inputTarea = document.getElementById("nombreTarea")
var inputDescripcion = document.getElementById("descripcion")

boton.addEventListener("click",function(){
  var valorNombre = inputTarea.value;
  var valorDescripcion = inputDescripcion.value;
  var li = document.createElement("li")
  var selecion = document.createElement("select")
  var opcionCompletado = document.createElement("option");
  opcionCompletado.value="completado"
  opcionCompletado.textContent="completado";
  var opcionPendiente = document.createElement("option");
  opcionPendiente.value="pendiente"
  opcionPendiente.textContent="pendiente"
  //añadir las opciones del select
  selecion.appendChild(opcionCompletado)
  selecion.appendChild(opcionPendiente)
  li.textContent = valorNombre+"-"+valorDescripcion;
  li.appendChild(selecion)
  lista.appendChild(li)
  guardarTareas();
})

//funcion guardar tareas para que simpre que añadimos algo se guarde
function guardarTareas(){
  var tareas = [];
  //sacar todos los li de la lista
  var items = lista.querySelectorAll("li"); 

  //para cada li vamos a hacer
  items.forEach(li => {
    //separamos el texto en nombre y descripcion usando el guion
    let [nombre, descripcion] = li.firstChild.textContent.split("-");
    //sacamos el valor actual del select
    let estado = li.querySelector("select").value;
    //guardamos el objeto en el array
    tareas.push({ nombre, descripcion, estado });
  });

  //guardamos el array de tareas como texto en localStorage
  localStorage.setItem("listaDeTareas", JSON.stringify(tareas));
}
