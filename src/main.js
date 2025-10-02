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
 var seleccion = document.createElement("select")

 var opcionCompletado = document.createElement("option");
 opcionCompletado.value = "completado";
 opcionCompletado.textContent = "completado";

 var opcionPendiente = document.createElement("option");
 opcionPendiente.value = "pendiente";
 opcionPendiente.textContent = "pendiente";

 //añadir las opciones al select
 seleccion.appendChild(opcionCompletado);
 seleccion.appendChild(opcionPendiente);

 li.textContent = valorNombre + "-" + valorDescripcion;
 li.appendChild(seleccion);
 lista.appendChild(li);
 guardarTareas();
 })

function guardarTareas(){
  var tareas = [];
  var items = lista.querySelectorAll("li"); 
  items.forEach(li => {
    let [nombre, descripcion] = li.firstChild.textContent.split("-");
    let estado = li.querySelector("select").value;
    tareas.push({ nombre, descripcion, estado });
  });

  localStorage.setItem("listaDeTareas", JSON.stringify(tareas));
}

function cargarTareas(){
  var tareasGuardadasJSON = localStorage.getItem("listaDeTareas");
  if (!tareasGuardadasJSON) return;

  var listaDeTareas;
  try {
    listaDeTareas = JSON.parse(tareasGuardadasJSON);
  } catch (error) {
    console.error("error leyendo localStorage", error);
    return;
  }

  if (!Array.isArray(listaDeTareas)) return;

  lista.innerHTML = "";
 
  listaDeTareas.forEach(function (tarea) {
    var li = document.createElement("li");

    var span = document.createElement("span");
    span.textContent = (tarea.nombre || "") + " - " + (tarea.descripcion || "");

    var select = document.createElement("select");

    var optPend = document.createElement("option");
    optPend.value = "pendiente";
    optPend.textContent = "pendiente";

    var optComp = document.createElement("option");
    optComp.value = "completado";
    optComp.textContent = "completado";

    select.appendChild(optPend);
    select.appendChild(optComp);

    // Asignar el estado guardado
    select.value = tarea.estado || "pendiente";

    // Guardar al cambiar
    select.addEventListener("change", guardarTareas);

    li.appendChild(span);
    li.appendChild(select);
    lista.appendChild(li);
  });
}

window.addEventListener("DOMContentLoaded", cargarTareas);