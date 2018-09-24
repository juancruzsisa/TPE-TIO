"use strict";
cargarinicio();

function cargarinicio(event)
{

  fetch("inicio.html").then( function(response){
      console.log("ok");
      console.log(response);
      response.text().then(processText);
    });
}

let inicio = document.querySelectorAll(".botoninicio");
inicio.forEach(e=> e.addEventListener("click", cargarinicio));

function cargarformas(event)
{
  event.preventDefault();
  fetch("formaspago.html").then( function(response){
      console.log("ok");
      console.log(response);
      response.text().then(t=> document.querySelector("#use-ajax").innerHTML = t);
    });
}

let formas = document.querySelectorAll(".botonformas");
formas.forEach(e=> e.addEventListener("click", cargarformas));

function cargartablatalles(event)
{
  event.preventDefault();

  fetch("tabladetalles.html").then( function(response){
      console.log("ok");
      console.log(response);
      response.text().then(t=> document.querySelector("#use-ajax").innerHTML = t);
    });
}

let tablatalles = document.querySelectorAll(".botontablatalles");
tablatalles.forEach(e=> e.addEventListener("click", cargartablatalles));

function cargarcontactos(event)
{
  event.preventDefault();
  fetch("contactos.html").then( function(response){
      console.log("ok");
      console.log(response);
      response.text().then(t=> document.querySelector("#use-ajax").innerHTML = t);
    });
}

let contactos = document.querySelectorAll(".botoncontactos");
contactos.forEach(e=> e.addEventListener("click", cargarcontactos));

function cargarbotinnike(event)
{
  event.preventDefault();
  fetch("botinNike.html").then( function(response){
      console.log("ok");
      console.log(response);
      response.text().then(t=> document.querySelector("#use-ajax").innerHTML = t);
    });
}

let botinNike = document.querySelectorAll(".botonbotinNike");
botinNike.forEach(e=> e.addEventListener("click", cargarbotinnike));

function processText(t) {
  let container = document.querySelector("#use-ajax");
  container.innerHTML = t;
  container.querySelectorAll(".js-comportamiento")
            .forEach(b=> b.addEventListener("click", cargarbotinnike));
}

function cargartablastock(event){
  event.preventDefault();
  fetch("tabladestock.html").then( function(response){
      console.log("ok");
      response.text().then(t=> document.querySelector("#use-ajax").innerHTML = t);
    }).then(cargar => load());
}

let botontablastock = document.querySelectorAll(".botontablastock");
botontablastock.forEach(e=> e.addEventListener("click", cargartablastock));

//TABLA


let servidor="http://web-unicen.herokuapp.com/api/groups/"
let url = servidor + "mat/productos"

function load(){
  let container= document.querySelector("#use-ajax-tablastock");
  fetch(url).then(r => r.json())
            .then(json => mostrar(container, json))
            .then(activar => activarbotones())
            .then(a => cargarboorarfila(json))
            .then(s => cargareditarfila(json))
            .then(d => cargarformularioeditarfila(json))
            .then(f => cargarfiltrarfila(json));
}

function mostrar(container, json){
  let html="<table class=tablastock>";
    for (let i = 0; i < json.productos.length; i++) {
      html += "<tr class=filafiltrar"+i+">";
      let productos=json.productos[i].thing;
      let id= json.productos[i]._id;
      let nombreproducto= productos.nombreproducto;
      let marca= productos.marca;
      let modelo= productos.modelo;
      let talle= productos.talle;
      let cantidad= productos.cantidad;
      html +="<td>" + nombreproducto +"</td>";
      html +="<td>" + marca +"</td>";
      html +="<td>" + modelo +"</td>";
      html +="<td>" + talle +"</td>";
      html +="<td>" + cantidad +"</td>";
      html +="<td> <button class=botonborrarfila value="+id+" id=fila"+i+">Borrar</button> </td>";
      html +="<td> <button class=botoneditarfila value="+id+" id=filaeditar"+i+">Confirmar</button> </td>";
      html +="<td> <button class=botoncargarformeditarfila value="+id+" id=formulariofilaeditar"+i+">Editar fila</button> </td>";
      html += "</tr>";
      console.log(i);
      console.log(container);
    }
    html += " </table>";
    container.innerHTML=html

      cargarboorarfila(json);
      cargareditarfila(json);
      cargarformularioeditarfila(json)
      cargarfiltrarfila(json);

}

function filtrar(json){
  let datos= document.querySelectorAll(".js-filtro")[0].value
  if(datos==""){
    load();
  }
  else{for (let i = 0; i < json.productos.length;i++) {
      let filafiltrar = document.querySelectorAll(".filafiltrar"+i)[0];
      let productos=json.productos[i].thing;
      let nombreproducto= productos.nombreproducto;
      if (datos!=nombreproducto){
      filafiltrar.classList.add("ocultar");
      filafiltrar.classList.remove("mostrar");
      }
      if (datos==nombreproducto){
      filafiltrar.classList.remove("ocultar");
      filafiltrar.classList.add("mostrar");
      }
      }}
}



function editarfila(json, i){
  let id=document.querySelectorAll(".botoneditarfila")[i].value
  let url = servidor + "mat/productos/" +id;
  let nombreproducto = document.querySelectorAll(".js-nombreproductoeditar")[0].value;
  let marca = document.querySelectorAll(".js-marcaeditar")[0].value;
  let modelo =document.querySelectorAll(".js-modeloeditar")[0].value;
  let talle =document.querySelectorAll(".js-talleeditar")[0].value;
  let cantidad =document.querySelectorAll(".js-cantidadeditar")[0].value;
  let productos=
    {
    "nombreproducto": nombreproducto,
    "marca": marca,
    "modelo": modelo,
    "talle": talle,
    "cantidad": cantidad
  }
  let objeto = {
    "thing": productos
  }
  fetch(url,{
    "method": "PUT",
    "mode": 'cors',
    "headers": { "Content-Type": "application/json" },
    "body": JSON.stringify(objeto)
  }).then(r=> console.log(r))
    .then(cargar=>load())
}


function cargareditarfila(json){
  for (let i = 0; i < json.productos.length;i++) {
      let botoneditarfila = document.querySelector("#filaeditar"+i);
      botoneditarfila.addEventListener("click", function(){editarfila(json, i)})
  }
}


function cargareditarfila(json){
  for (let i = 0; i < json.productos.length;i++) {
      let botoneditarfila = document.querySelector("#filaeditar"+i);
      botoneditarfila.addEventListener("click", function(){editarfila(json, i)})
  }
}


function cargarfiltrarfila(json){
    let botonfiltro = document.querySelectorAll(".botonfiltro");
    botonfiltro.forEach(e=> e.addEventListener("click",function(){filtrar(json,)}))
  }

  function cargarformularioeditarfila(json){
    for (let i = 0; i < json.productos.length;i++) {
        let botoncargarformeditarfila = document.querySelector("#formulariofilaeditar"+i);
        botoncargarformeditarfila.addEventListener("click", function(){formularioeditarfila(json, i)})
    }
  }


function cargarboorarfila(json){
  for (let i = 0; i < json.productos.length; i++) {
      let botonborrarfila = document.querySelector("#fila"+i);
      botonborrarfila.addEventListener("click", function(){borrarfila(i)})
  }
}

function borrarfila(i){
  let id=document.querySelectorAll(".botonborrarfila")[i].value
//  let id=document.querySelector("#"+i).value
  console.log(id);
  let url = servidor + "mat/productos/" +id;
  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type':'application/json'
    }
}).then(r=> console.log(r))
  .then(cargar=>load());
}
//hasta aca

function formularioeditarfila(json, i){
  let container= document.querySelector("#lugareditar");
  let formulario= "<form action=index.html method=post> "
  let productos=json.productos[i].thing;
  let nombreproducto= productos.nombreproducto;
  let marca= productos.marca;
  let modelo= productos.modelo;
  let talle= productos.talle;
  let cantidad= productos.cantidad;
  formulario+="<p>Nombre del producto<input type=text class=js-nombreproductoeditar value="+nombreproducto+"></p>"
  formulario+="<p>marca<input type=text class=js-marcaeditar value="+marca+"></p>"
  formulario+="<p>modelo<input type=text class=js-modeloeditar value="+modelo+"></p>"
  formulario+="<p>talle<input type=text class=js-talleeditar value="+talle+"></p>"
  formulario+="<p>cantidad<input type=text class=js-cantidadeditar value="+cantidad+"></p>"
  formulario+="</form>"
  container.innerHTML=formulario;

}
//Cargar datos desde formulario a la tabla
function create(){
  let nombreproducto = document.querySelectorAll(".js-nombreproducto")[0].value;
  let marca = document.querySelectorAll(".js-marca")[0].value;
  let modelo =document.querySelectorAll(".js-modelo")[0].value;
  let talle =document.querySelectorAll(".js-talle")[0].value;
  let cantidad =document.querySelectorAll(".js-cantidad")[0].value;

  let productos=
    {
    "nombreproducto": nombreproducto,
    "marca": marca,
    "modelo": modelo,
    "talle": talle,
    "cantidad": cantidad
  }
  let objeto = {
    "thing": productos
  }
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(objeto)
}).then(r=> console.log(r))
  .then(cargar=>load());
}

function cargartres(){
  for (let i = 0; i < 3; i++) {
    create();
  }
}

function hola(valor){
  alert("hola" + valor);
}

function activarbotones(json){
  let botoncreartabla = document.querySelectorAll(".botoncreartabla");
  botoncreartabla.forEach(e=> e.addEventListener("click", create));

  let botoncreartrestabla = document.querySelectorAll(".botoncreartrestabla");
  botoncreartrestabla.forEach(e=> e.addEventListener("click", cargartres));
}
