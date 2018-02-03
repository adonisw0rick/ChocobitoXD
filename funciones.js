addEventListener('load', inicializarEventos, false)

function inicializarEventos () {
  var ob = document.getElementById('icono')
  ob.addEventListener('change', presionBoton, false)
}

function presionBoton (e) {
  var ob1 = document.getElementById('icono')
  recuperarDatos(ob1.value)
}

var conexion1
function recuperarDatos (icono) {
  conexion1 = new XMLHttpRequest()
  conexion1.onreadystatechange = procesarEventos
  conexion1.open('GET', 'pagina4.php?pa=' + icono, true)
  conexion1.send()
}

function procesarEventos () {
  var resultados = document.getElementById('resultados')

  if (conexion1.readyState === 4) {
    var xml = conexion1.responseXML
    var foto = xml.getElementsByTagName('foto')
    console.log(foto)
    var imagen = document.createElement('img')
    imagen.setAttribute('src', foto[0].firstChild.nodeValue)
    imagen.setAttribute('width', '80')
    resultados.appendChild(imagen)
  } else {
    resultados.innerHTML = ''
  }
}
