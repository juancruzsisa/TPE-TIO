<?php
/**
 *
 */
class TiendaModel
{
  private $db;

  function __construct()
  {
    $this->db = $this->connect();
  }


  function getProductos(){
    $sentencia_producto = $this->db->prepare( "select * from producto");
    $sentencia_producto->execute();
    return $sentencia_producto->fetchAll(PDO::FETCH_ASSOC);
  }

  function getMarcas(){
    $sentencia_marca = $this->db->prepare( "select * from marca");
    $sentencia_marca->execute();
    return $sentencia_marca->fetchAll(PDO::FETCH_ASSOC);
  }


  function getMarca($id_marca){
    $sentencia_marca = $this->db->prepare( "select * from marca where id=?");
    $sentencia_marca->execute($id_marca);
    return $sentencia_marca->fetchAll(PDO::FETCH_ASSOC);
  }

  function getProducto($id_producto){
    $sentencia_producto = $this->db->prepare( "select * from producto where id=?");
    $sentencia_producto->execute($id_producto);
    return $sentencia_producto->fetchAll(PDO::FETCH_ASSOC);
  }

  private function connect(){
    return new PDO('mysql:host=localhost;'
    .'dbname=db_web;charset=utf8'
    , 'root', '');
  }

  function InsertarMarca($nombre,$descripcion){
    $sentencia =$this->db->prepare("INSERT INTO marca(nombre, descripcion) VALUES(?,?)");
    $sentencia->execute(array($nombre,$descripcion));
}

  function BorrarMarca($id_marca){
    $sentencia = $this->db->prepare( "delete from marca where id_marca=?");
    $sentencia->execute(array($id_marca));
  }



}


 ?>
