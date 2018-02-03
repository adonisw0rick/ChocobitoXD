$(document).ready(function () {
  // Datos
  var dialog
  var form
  var name = $('#name')
  var allFields = $([]).add(name)
  var tips = $('.validateTips')

  function updateTips (t) {
    tips
      .text(t)
      .addClass('ui-state-highlight')
    setTimeout(function () {
      tips.removeClass('ui-state-highlight', 1500)
    }, 500)
  }

  function checkLength (o, n, min, max) {
    if (o.val().length > max || o.val().length < min) {
      o.addClass('ui-state-error')
      updateTips('El tamaño del ' + n + ' debe estar comprendido entre ' +
                min + ' y ' + max + ' carácteres.')
      return false
    } else {
      return true
    }
  }

  function checkRegexp (o, regexp, n) {
    if (!(regexp.test(o.val()))) {
      o.addClass('ui-state-error')
      updateTips(n)
      return false
    } else {
      return true
    }
  }
  function checkIcono (o) {
    if (o === undefined) {
      // o.addClass('ui-state-error')
      updateTips('Debe seleccionar un icono')
      console.log($('#resultados > img'))
      return false
    } else {
      return true
    }
  }
  var cont = 0
  function startthegame () {
    $('#chocobos').css('filter', 'opacity(100%)')
    var valid = true
    allFields.removeClass('ui-state-error')

    valid = valid && checkLength(name, 'nombre', 2, 100)
    valid = valid && checkRegexp(name, /^[A-Za-z]([a-z_\s])+$/i, 'El nombre de jugador solo puede tener letras y espacios.')
    console.log($('#resultados > img'))
    if (valid) {
      $('#dialog-form #name').text(name.val())

      dialog.dialog('close')
      cont++
      if (cont === 1) {
        empiezajuego()
      }
      if (($('#dialog-form #resultados > img')['0']) == undefined) {
        $('#dialog-form #resultados').text('https://cdn6.aptoide.com/imgs/4/3/0/4300b7ceff535bded4c859fb0eb74ccb_icon.png?w=256')
      }
      $('#dialog-form #resultados').text($('#dialog-form #resultados > img')['0'].currentSrc)
    }
    if (cont > 1) {
      restart()
    }
    return valid
  }
  function vuelveajugar () {
    volver.dialog('close')
    return true
  }
  // Ventanas modales
  dialog = $('#dialog-form').dialog({
    show: { effect: 'fold', duration: 700 },
    hide: { effect: 'fold', duration: 700 },
    autoOpen: false,
    height: 500,
    width: 'auto',
    modal: true,
    buttons: {
      'Aceptar': startthegame,
      'Cancel': function () {
        dialog.dialog('close')
      }
    },
    close: function () {
      dialog.dialog('close')
    }
  })
  volver = $('#volver-form').dialog({
    closeOnEscape: false,
    show: { effect: 'fold', duration: 700 },
    hide: { effect: 'fold', duration: 700 },
    autoOpen: false,
    height: 500,
    width: 'auto',
    modal: true,
    buttons: {
      'Aceptar': resetthegame,
      'Cancel': noresetthegame
    },
    close: function () {

    }
  })
  function noresetthegame () {
    var valid = true
    chocobito.body.x = 500
    chocobito.kill()
    volver.dialog('close')
    return valid
  }

  function resetthegame () {
    var valid = true
    volver.dialog('close')
    restart()
    return valid
  }
  $('#start').click(function () {
    dialog.dialog('open')
  })
})
