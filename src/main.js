
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
  li.textContent = valorNombre+"-"+valorDescripcion;
  lista.appendChild(li)
  
})