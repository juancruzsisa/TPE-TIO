<?php

require_once "./view/TiendaView.php";
require_once "./model/TiendaModel.php";

class TiendaController
{
  private $view;
  private $model;


  function __construct()
  {
    $this->view = new TiendaView();
    $this->model = new TiendaModel();
  }

function Home(){
  $productos = $this->model->getProductos();
  $marcas = $this->model->getMarcas();
  $this->view->Mostrar($marcas, $productos);
}

function InsertarMarca(){
  $nombre = $_POST["nombreform"];
  $descripcion = $_POST["descripcionform"];
  $this->model->InsertarMarca($nombre,$descripcion);
  header("Location: http://".$_SERVER["SERVER_NAME"] . dirname($_SERVER["PHP_SELF"]));
}

function BorrarMarca($param){
  $this->model->BorrarMarca($param[0]);
  header("Location: http://".$_SERVER["SERVER_NAME"] . dirname($_SERVER["PHP_SELF"]));
}

  function EditarMarca($id_marca){
  $tarea = $this->model->getMarca($id_marca);
  $this->view->mostrarmarca($tarea);
  header("Location: http://".$_SERVER["SERVER_NAME"] . dirname($_SERVER["PHP_SELF"]));
  }

}


 ?>
