function eliminarObjetosRepetidos(array, clave) {
    const objetosVistos = {};
    return array.filter(objeto => {
      const valorClave = objeto[clave];
      if (!objetosVistos[valorClave]) {
        objetosVistos[valorClave] = true;
        return true;
      }
      return false;
    });
  }


module.exports ={  eliminarObjetosRepetidos}