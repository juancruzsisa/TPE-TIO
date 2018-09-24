<?php

require_once "./controller/TiendaController.php";

class TiendaView
{


  function Mostrar($marcas, $productos){
     //$marcas = getMarca();
     //$productos = getProducto();
   ?>
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset="utf-8">
       <title>To Do App</title>
       <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
     </head>
     <body>
       <div class="container">
         <div class="row">
           <div class="col-md-6 col-md-offset-3">
             <h1>Lista de base de datos</h1>
             <ul class="list-group">
   <?php
             foreach ($productos as $producto) {
               echo '<li class="list-group-item">'.$producto['id_producto'].': '.$producto['nombre'].': '.$producto['talle'].': '.$producto['stock'].': '.$producto['id_marca'].'<a href="borrar/'.$producto['id_producto'].'">Borrar</a></li>';
             }

             foreach ($marcas as $marca) {
               echo '<li class="list-group-item">'.$marca['id_marca'].': '.$marca['nombre'].': '.$marca['descripcion'].'<a href="borrar/'.$marca['id_marca'].'">Borrar</a></li>';
             }
   ?>
             </ul>
             <form method="post" action="agregar">
               <div class="form-group">
                 <label for="nombreform">nombre</label>
                 <input type="text" class="form-control" id="nombreform" name="nombreform" placeholder="nombre de la marca">
               </div>
               <div class="form-group">
                 <label for="descripcionform">Descripcion</label>
                 <textarea  id="descripcionform" name="descripcionform" rows="8" cols="50"></textarea>
               </div>
               <button type="submit" class="btn btn-default">Crear</button>
             </form>

           </div>
          </div>
        </div><!-- /.container -->
     </body>
   </html>
   <?php
   }



}
 ?>
