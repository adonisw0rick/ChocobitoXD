function empiezajuego () {
  var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'chocobos', { preload: preload, create: create, update: update, render: render })

  function preload () {
    game.time.advancedTiming = true
    game.load.image('contra2', 'assets/images/curva2.png')
    game.load.image('life', 'assets/images/chocobo_life.png')
    game.load.image('cactilio', 'assets/images/MiniCactiliopng.png')
    game.load.image('minicactilio', 'assets/images/ChibiCactiliopng.png')
    game.load.physics('physicsData', 'physics/sprites.json')
    game.load.physics('physicsData2', 'ShapesCactilioCorona.json')
    game.load.physics('columnasjson', 'columnas.json')
    game.load.image('chocobito', 'assets/images/chocobosolo.png')
    game.load.image('tronco', 'assets/images/suelopng.png')
    game.load.spritesheet('chocobitos', 'assets/images/choco60x65x9v2correr3.png', 64, 63, 9)
    game.load.spritesheet('chocobitosabajo', 'assets/images/choco60x65x9v2danio2.png', 64, 63, 9)
    game.load.spritesheet('chocobofull', 'assets/images/choco60x65x9v2.png', 64, 65)
    game.load.spritesheet('chocoyellow', 'assets/images/chocoyellow.png', 64, 65)
    game.load.spritesheet('chocopink', 'assets/images/chocopink.png', 64, 65)
    game.load.image('field', 'assets/images/rio2.png')
    game.load.image('columnapeq1', 'assets/images/columnapeq1.png')
    game.load.image('columnapeq2', 'assets/images/columnapeq2.png')
    game.load.image('columnamed1', 'assets/images/columnamed1.png')
    game.load.image('columna', 'assets/images/columna.png')
    game.load.image('columnagrande', 'assets/images/columnagrande.png')
    game.load.image('espinas', 'assets/images/circulopngpeq.png')
    game.load.image('espinas2', 'assets/images/semicirculopngpeq.png')
    game.load.audio('inicio', 'assets/music/ff7_race_starting.mp3')
    game.load.audio('music', 'assets/music/electricchocobo.mp3')
    game.load.audio('overpowered', 'assets/music/chocobo_poderoso.mp3')
    game.load.audio('musicboss', 'assets/music/chocobo_final.mp3')
  }

  // Variables protagonista
  var salto = true
  var chocobito
  var chocodied = false
  var estaabajo = false
  var estaalfondo = false
  var estaarriba = false
  //Variables campo
  var field
  var velocidad = 3
  var velocidadmaxima
  var curva
  var curva2
  var tronco
  var columnapeq1
  var columnapeq1v2
  var columnapeq1v3
  var columnapeq2
  var columnapeq2v2
  var columnamed1
  var columna
  var columnagrande
  var espinascircular
  var espinascircular2
  var result = 'Score: '
  var inicio
  var music
  var overpowered
  var musicboss

  // Elementos del juego

  var life
  var cactilio
  var minicactilio
  var minicactiliov2
  var minicactiliov3
  // Fases
  var fase1inicio = false
  var fase2inicio = false
  var fase3inicio = false
  var fase4inicio = false
  var fase5inicio = false
  var fase6inicio = false
  var fase7inicio = false
  var fase8inicio = false

  var fase1acabada = true
  var fase2acabada = true
  var fase3acabada = true
  var fase4acabada = true
  var fase5acabada = true
  var fase6acabada = true
  var fase7acabada = true
  var fase8acabada = true

  var columnahapasado = false
  // Música
  var started = true
  var musicisrunning = false
  var musicoverpoweredisrunning = false
  var musicbossisrunning = false
  var score = 0
  var scoreString = ''
  var scoreText

  function create () {
    //	Enable p2 physics
    game.physics.startSystem(Phaser.Physics.P2JS)
    game.advancedTiming = true
    game.physics.p2.setImpactEvents(true)

    field = game.add.tileSprite(0, 0, 800, 600, 'field')
    espinascircular = game.add.sprite(1300, 300, 'espinas')

    curva = game.add.sprite(1300, 530, 'contra2')
    curva2 = game.add.sprite(1300, 530, 'contra2')
    life = game.add.sprite(1600, 200, 'life')
    cactilio = game.add.sprite(1200, 200, 'cactilio')
    minicactilio = game.add.sprite(1200, 900, 'minicactilio')
    minicactiliov2 = game.add.sprite(1200, 900, 'minicactilio')
    minicactiliov3 = game.add.sprite(1200, 900, 'minicactilio')

    tronco = game.add.sprite(400, 590, 'tronco')

    columnapeq1 = game.add.sprite(1200, 490, 'columnapeq1')
    columnapeq2 = game.add.sprite(1300, 449, 'columnapeq2')
    columnapeq2v2 = game.add.sprite(1300, 449, 'columnapeq2')
    columnamed1 = game.add.sprite(1400, 429, 'columnamed1')
    columna = game.add.sprite(1500, 385, 'columna')
    columnagrande = game.add.sprite(1600, 308, 'columnagrande')
    chocobito = game.add.sprite(100, 200, 'chocobofull', 54)
    espinascircular2 = game.add.sprite(1300, 300, 'espinas2')

    //	Alternando entre true y false podemos hacer debug de los poligonos.
    this.game.physics.p2.enable([curva], false)
    game.physics.p2.enable([curva2], false)
    game.physics.p2.enable([life], false)
    game.physics.p2.enable([cactilio], false)
    game.physics.p2.enable([minicactilio], false)
    game.physics.p2.enable([minicactiliov2], false)
    game.physics.p2.enable([minicactiliov3], false)
    game.physics.p2.enable([tronco], false)
    game.physics.p2.enable([columna], false)
    game.physics.p2.enable([columnapeq1], false)
    game.physics.p2.enable([columnapeq2], false)

    game.physics.p2.enable([columnapeq2v2], false)
    game.physics.p2.enable([columnamed1], false)
    game.physics.p2.enable([columnagrande], false)
    game.physics.p2.enable([espinascircular], false)
    game.physics.p2.enable([espinascircular2], false)

    tronco.body.clearShapes()
    tronco.body.setRectangle(800, 100)
    tronco.body.static = true
    tronco.unbreakable = true
    tronco.alpha = 0
    curva.body.clearShapes()
    curva.body.loadPolygon('physicsData', 'contra2')
    curva.body.friction = 0
    curva.body.kinematic = true
    curva.unbreakable = true

    curva2.body.clearShapes()
    curva2.body.loadPolygon('physicsData', 'contra2')
    curva2.body.friction = 0
    curva2.body.kinematic = true
    curva2.unbreakable = true
    columna.body.setRectangle(100, 200)
    columna.body.kinematic = true
    columna.unbreakable = true
    espinascircular.body.clearShapes()
    espinascircular.body.loadPolygon('physicsData2', 'circulopngpeq')
    espinascircular.body.kinematic = true
    espinascircular.unbreakable = true

    columnapeq1.body.setRectangle(110, 230, 0, 80)
    columnapeq1.body.kinematic = true
    columnapeq1.unbreakable = true

    columnapeq2.body.setRectangle(110, 120, 0, 10)
    columnapeq2.body.kinematic = true
    columnapeq2.unbreakable = true

    columnapeq2v2.body.setRectangle(110, 190)
    columnapeq2v2.body.kinematic = true
    columnapeq2v2.unbreakable = true

    columnamed1.body.loadPolygon('columnasjson', 'columnamed1')
    columnamed1.body.kinematic = true
    columnamed1.unbreakable = true

    columnagrande.body.setRectangle(100, 300)
    columnagrande.body.kinematic = true
    columnagrande.unbreakable = true

    columna.scale.setTo(1, 1.1)
    columnapeq1.scale.setTo(1, 1.2)
    columnapeq2.scale.setTo(1, 1.15)
    columnamed1.scale.setTo(1, 1.1)
    columnagrande.scale.setTo(1, 1.1)
    espinascircular2.body.clearShapes()
    espinascircular2.body.kinematic = true
    espinascircular2.unbreakable = true

    cactilio.body.clearShapes()
    cactilio.body.loadPolygon('physicsData2', 'MiniCactiliopng')
    cactilio.body.static = true
    cactilio.unbreakable = true
    minicactilio.body.clearShapes()
    minicactilio.body.loadPolygon('physicsData2', 'ChibiCactiliopng')
    minicactilio.body.fixedRotation = true

    minicactiliov2.body.clearShapes()
    minicactiliov2.body.loadPolygon('physicsData2', 'ChibiCactiliopng')
    minicactiliov2.body.fixedRotation = true

    minicactiliov3.body.clearShapes()
    minicactiliov3.body.loadPolygon('physicsData2', 'ChibiCactiliopng')
    minicactiliov3.body.fixedRotation = true

    life.body.setCircle(55)
    life.body.fixedRotation = false
    life.anchor.setTo(0.5, 0.5)
    life.body.clearShapes()

    // El protagonista!
    chocobito.animations.add('embestida', [11], 8, true)
    chocobito.animations.add('right', [1, 2], 10, true)
    chocobito.animations.add('up', [11, 12, 13], 10, true)
    chocobito.animations.add('bajada', [37, 38, 39, 40], 8, true)
    chocobito.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 20, true)
    chocobito.play('fly')
    chocobito.name = 'chocobito'
    game.physics.p2.enable([chocobito], false)
    chocobito.body.fixedRotation = true
    chocobito.body.clearShapes()
    chocobito.body.loadPolygon('physicsData2', 'chocobosolo')
    chocobito.anchor.x = 0.5
    chocobito.anchor.y = 0.5
    chocobito.body.collideWorldBounds = true

    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    this.A = game.input.keyboard.addKey(Phaser.Keyboard.A)
    this.S = game.input.keyboard.addKey(Phaser.Keyboard.S)
    this.D = game.input.keyboard.addKey(Phaser.Keyboard.D)
    this.W = game.input.keyboard.addKey(Phaser.Keyboard.W)
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR])
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.A])
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.S])
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.D])
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.W])
    cursors = game.input.keyboard.createCursorKeys()
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

    //Añadimos gravedad
    game.physics.p2.gravity.y = 1380

    chocobito.body.collideWorldBounds = true

    inicio = game.add.audio('inicio')
    music = game.add.audio('music')
    overpowered = game.add.audio('overpowered')
    musicboss = game.add.audio('musicboss')

    game.sound.setDecodedCallback([inicio, music, overpowered, musicboss], start, this)
    chocobito.body.collideWorldBounds = true

    start()
    scoreString = 'Score : '
    scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' })
  }

  function start () {
    inicio.play()
  }

  function update () {
    contienealchocobo()
    if (chocobito.body.x < -150) {
      chocodied = true
    }

    score = score + Math.round(velocidad * 5)
    result = 'Puntuación: ' + score + '    FPS:' + game.time.fps + '      Vel: ' + velocidad
    life.body.velocity.y = -23
    // música
    if (started === true) {
      inicio.play()
      started = false
      musicisrunning = true
    }
    if (musicisrunning === true) {
      music.play()
      musicisrunning = false
    }

    if (velocidad < 10) {
      velocidad = velocidad * 1.0004
    }
    if (velocidad < 15) {
      velocidad = velocidad * 1.0002
    } else {
      velocidad = velocidad * 1.0001
    }

    field.tilePosition.y = -1020
    field.tilePosition.x -= velocidad
    life.body.rotateLeft(100)
    if (chocobito.body.y > 450) {
      salto = true
    }
    if (this.spaceKey.isDown && (estaalfondo === false)) {
      chocobito.body.moveRight(1200)
      chocobito.body.moveUp(50)
      chocobito.play('embestida')
    } else if (this.spaceKey.isUp) {
      chocobito.play('fly')
    }
    if (this.A.isDown) {
      chocobito.body.moveLeft(500)
    }
    if (this.S.isDown && (estaabajo === false)) {
      chocobito.body.moveDown(1000)
      chocobito.play('bajada')
    }
    if (this.W.isDown && salto !== false) {
      chocobito.body.moveUp(500)
      if (chocobito.body.y < 320) {
        salto = false
      }
    }
    if (this.D.isDown && (estaalfondo === false)) {
      chocobito.body.moveRight(200)
    }
    if (fase1acabada === false) {
      fase1()
    }
    if (fase2acabada === false) {
      fase2()
    }
    if (fase3acabada === false) {
      fase3()
    }
    if (fase4acabada === false) {
      fase4()
    }
    if (fase5acabada === false) {
      fase5()
    }
    if (fase6acabada === false) {
      fase6()
    }
    if (fase7acabada === false) {
      fase7()
    }
    if (fase8acabada === false) {
      fase8()
    }

    if ((fase1acabada === true) && (fase2acabada === true) && (fase3acabada === true) &&
            (fase4acabada === true) && (fase5acabada === true) && (fase6acabada === true) && (fase7acabada === true) &&
            (fase8acabada === true)) {
      let randomprof = Math.floor(Math.random() * (8 - 1 + 1)) + 1
      todoensusitio()
      switch (randomprof) {
        case 1:
          fase1acabada = false
          break
        case 2:
          fase2acabada = false
          break
        case 3:
          fase3acabada = false
          break
        case 4:
          fase4acabada = false
          break
        case 5:
          fase5acabada = false
          break
        case 6:
          fase6acabada = false
          break
        case 7:
          fase7acabada = false
          break
        case 8:
          fase8acabada = false
          break
        default:
          break
      }
    }
    overpoweredmodeon()
    if (chocobito.body.x < 0) {
      if (velocidad > 0) {
        velocidadmaxima = velocidad
        $('#users tbody').append('<tr>' +
                    '<td>' + $('#dialog-form #name').text() + '</td>' +
                    '<td>' + (Math.round(velocidadmaxima * 100) / 100) +
                    '</td>' +
                    '<td>' + score + '</td>' +
                    '<td>' + '<img width=80 src="' + $('#dialog-form #resultados').text() + '"/>' + '</td>' +
                    '</tr>')
        var valor = localStorage['scores']
        var valores = JSON.parse(valor)
        valores.Scores.Nombre[valores.Scores.Nombre.length] = $('#dialog-form #name').text()
        valores.Scores.VelocidadMax[valores.Scores.VelocidadMax.length] = (Math.round(velocidadmaxima * 100) / 100)
        valores.Scores.Puntuacion[valores.Scores.Puntuacion.length] = score
        valores.Scores.Icono[valores.Scores.Icono.length] = $('#dialog-form #resultados').text()
        console.log(valores)
        nuevaclave('scores', JSON.stringify(valores))
        $('#users').tablesorter({ sortList: [[2, 1]] })
      }
      velocidad = 0
      volver.dialog('open')
    }
  }
  var volver = $('#volver-form').dialog({
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
  dialog = $('#dialog-form').dialog({
    show: { effect: 'fold', duration: 700 },
    hide: { effect: 'fold', duration: 700 },
    autoOpen: false,
    height: 500,
    width: 'auto',
    modal: true,
    buttons: {
      'Aceptar': resetthegame,
      'Cancel': function () {
        dialog.dialog('close')
      }
    },
    close: function () {
      dialog.dialog('close')
    }
  })
  function vuelveajugar () {
    volver.dialog('close')
    return true
  }

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
  function restart () {
    //  A new level starts
    todoensusitio()
    musicoverpoweredisrunning = false
    chocobito.kill()
    chocobito.body.kinematic = false
    chocobito = game.add.sprite(100, 100, 'chocobitos', 9)
    chocobito.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 20, true)
    chocobito.play('fly')
    chocobito.name = 'chocobito'
    game.physics.p2.enable([chocobito], false)
    chocobito.body.fixedRotation = true
    chocobito.body.clearShapes()
    chocobito.body.loadPolygon('physicsData2', 'chocobosolo')
    music.stop()
    velocidad = 2
    chocodied = false
    score = 0
    started = true
    musicsisrunning = false
    fase1inicio = false
    fase2inicio = false
    fase3inicio = false
    fase4inicio = false
    fase5inicio = false
    fase6inicio = false
    fase7inicio = false
    fase8inicio = false

    fase1acabada = true
    fase2acabada = true
    fase3acabada = true
    fase4acabada = true
    fase5acabada = true
    fase6acabada = true
    fase7acabada = true
    fase8acabada = true

    var columnahapasado = false
  }

  function render () {
    game.debug.text(result, 32, 32)
  }

  function fase1 () {
    if (fase1inicio === false) {
      curva.body.x = 800
      curva.body.y = 530
      columnapeq1.body.x = 1400
      columnapeq1.body.y = 500
      setTimeout(function () {
        minicactilio.body.x = 700
        minicactilio.body.y = 500
      }, 1000)
    }
    curva.body.x = curva.body.x - velocidad
    minicactilio.body.velocity.x = minicactilio.body.velocity.x - 100 * velocidad
    columnapeq1.body.x = columnapeq1.body.x - velocidad
    fase1inicio = true
    if (columnapeq1.body.x < -100) {
      columnapeq1.body.x = 1000
      fase1acabada = true
      fase1inicio = false
    }
  }
  function fase2 () {
    if (fase2inicio === false) {
      columnapeq2.body.x = 900
      columnapeq2.body.y = 500
      curva.body.x = 1000
      curva.body.y = 530
      columnagrande.body.x = 1300
      columnagrande.body.y = 60
      columnapeq1.body.x = 1600
      setTimeout(function () {
        minicactilio.body.x = 700
        minicactilio.body.y = 500
      }, 1000)
    }
    curva.body.x = curva.body.x - velocidad
    minicactilio.body.velocity.x = minicactilio.body.velocity.x - 100 * velocidad
    columnapeq1.body.x = columnapeq1.body.x - velocidad
    columnagrande.body.x = columnagrande.body.x - velocidad
    fase2inicio = true
    if (columnapeq1.body.x < -100) {
      fase2acabada = true
      columnapeq1.body.x = 1000
      fase2inicio = false
    }
  }

  function fase3 () {
    if (fase3inicio === false) {
      columnapeq2.body.x = 600
      columnapeq2.body.y = 500
      curva.body.x = 900
      curva.body.y = 530
      espinascircular.body.x = 1200
      espinascircular.body.y = 410
      espinascircular2.body.x = 1200
      espinascircular2.body.y = 410
    }
    curva.body.x = curva.body.x - velocidad
    columnapeq2.body.x = columnapeq2.body.x - velocidad
    espinascircular.body.x = espinascircular.body.x - velocidad
    espinascircular2.body.x = espinascircular2.body.x - velocidad
    fase3inicio = true
    if (espinascircular.body.x < -300) {
      fase3acabada = true
      espinascircular.body.x = 1200
      fase3inicio = false
    }
  }

  function fase4 () {
    if (fase4inicio === false) {
      curva.body.x = 900
      curva.body.y = 530
      columnapeq2.body.x = 1200
      columnapeq2.body.y = 500
      columna.body.x = 1350
      life.body.x = 1500
    }
    curva.body.x = curva.body.x - velocidad
    columnapeq2.body.x = columnapeq2.body.x - velocidad
    columna.body.x = columna.body.x - velocidad
    life.body.x = life.body.x - velocidad
    fase4inicio = true
    if (columna.body.x < -150) {
      fase4acabada = true
      columna.body.x = 1000
      fase4inicio = false
    }
  }
  function fase5 () {
    if (fase5inicio === false) {
      columnapeq2.body.x = 1200
      columnapeq2.body.y = 500
      columna.body.x = 1350
      columna.body.y = 200
      columnagrande.body.x = 1500
      columnagrande.body.y = 60
      columnahapasado = false
    }
    if ((columnagrande.body.x < 400) && (columnahapasado == false)) {
      minicactilio.body.x = 800
      minicactilio.body.y = 400
      minicactiliov2.body.x = 800
      minicactiliov2.body.y = 200
      minicactiliov3.body.x = 850
      minicactiliov3.body.y = 0

      setCactilioVelocityZero()
      columnahapasado = true
    }
    minicactilio.body.velocity.x = minicactilio.body.velocity.x - 100 * velocidad
    minicactiliov2.body.velocity.x = minicactilio.body.velocity.x - 100 * velocidad
    minicactiliov3.body.velocity.x = minicactilio.body.velocity.x - 100 * velocidad
    columnapeq2.body.x = columnapeq2.body.x - velocidad
    columna.body.x = columna.body.x - velocidad
    columnagrande.body.x = columnagrande.body.x - velocidad
    fase5inicio = true
    if (columna.body.x < -400) {
      fase5acabada = true
      columna.body.x = 1000
      fase5inicio = false
      columnahapasado = false
    }
  }

  function fase6 () {
    if (fase6inicio === false) {
      columnapeq1.body.x = 1000
      columnapeq1.body.y = 500
      columna.body.x = 1150
      columna.body.y = 0
      columnapeq2.body.x = 1300
      columnapeq2.body.y = 500
      columnagrande.body.x = 1500
      columnagrande.body.y = 60
      curva.body.x = 1700
      columnahapasado = false
    }
    if ((columnagrande.body.x < 400) && (columnahapasado == false)) {
      minicactilio.body.x = 800
      minicactilio.body.y = 400
      minicactiliov2.body.x = 800
      minicactiliov2.body.y = 200
      minicactiliov3.body.x = 850
      minicactiliov3.body.y = 0

      setCactilioVelocityZero()
      columnahapasado = true
    }
    minicactilio.body.velocity.x = minicactilio.body.velocity.x - 100 * velocidad
    minicactiliov2.body.velocity.x = minicactilio.body.velocity.x - 100 * velocidad
    minicactiliov3.body.velocity.x = minicactilio.body.velocity.x - 100 * velocidad
    columnapeq1.body.x = columnapeq1.body.x - velocidad
    columnapeq2.body.x = columnapeq2.body.x - velocidad
    curva.body.x = curva.body.x - velocidad
    columna.body.x = columna.body.x - velocidad
    columnagrande.body.x = columnagrande.body.x - velocidad
    fase6inicio = true
    if (columnagrande.body.x < -500) {
      fase6acabada = true
      columnagrande.body.x = 1000
      fase6inicio = false
      columnahapasado = false
    }
  }

  function fase7 () {
    if (fase7inicio === false) {
      curva.body.x = 900
      curva.body.y = 530
      columnapeq2.body.x = 1200
      columnapeq2.body.y = 530
      espinascircular.body.x = 1200
      espinascircular.body.y = 390
      espinascircular2.body.x = 1200
      espinascircular2.body.y = 390
      curva2.body.x = 1500
      curva2.body.y = 530
    }
    curva.body.x = curva.body.x - velocidad
    columnapeq2.body.x = columnapeq2.body.x - velocidad
    espinascircular.body.x = espinascircular.body.x - velocidad
    espinascircular2.body.x = espinascircular2.body.x - velocidad
    curva2.body.x = curva2.body.x - velocidad
    fase7inicio = true
    if (curva2.body.x < -300) {
      fase7acabada = true
      curva2.body.x = 1200
      fase7inicio = false
    }
  }

  function fase8 () {
    if (fase8inicio === false) {
      curva.body.x = 900
      curva.body.y = 530
      columnapeq2.body.x = 900
      columnapeq2.body.y = 190
      columnapeq2v2.body.x = 1500
      columnapeq2v2.body.y = 190
      columnagrande.body.x = 1200
      columnagrande.body.y = 100
      curva2.body.x = 1500
      curva2.body.y = 530
      columnahapasado = false
    }
    if ((columnagrande.body.x < 400) && (columnahapasado == false)) {
      minicactilio.body.x = 800
      minicactilio.body.y = 400
      minicactiliov2.body.x = 800
      minicactiliov2.body.y = 200
      minicactiliov3.body.x = 850
      minicactiliov3.body.y = 0

      setCactilioVelocityZero()
      columnahapasado = true
    }
    minicactilio.body.velocity.x = minicactilio.body.velocity.x - 100 * velocidad
    minicactiliov2.body.velocity.x = minicactilio.body.velocity.x - 100 * velocidad
    minicactiliov3.body.velocity.x = minicactilio.body.velocity.x - 100 * velocidad

    curva.body.x = curva.body.x - velocidad
    columnapeq2.body.x = columnapeq2.body.x - velocidad
    columnapeq2v2.body.x = columnapeq2v2.body.x - velocidad
    columnagrande.body.x = columnagrande.body.x - velocidad
    curva2.body.x = curva2.body.x - velocidad
    fase8inicio = true
    if (curva2.body.x < -300) {
      fase8acabada = true
      curva2.body.x = 1200
      fase8inicio = false
    }
  }

  function setCactilioVelocityZero () {
    minicactilio.body.velocity.x = 0
    minicactiliov2.body.velocity.x = 0
    minicactiliov3.body.velocity.x = 0
    minicactilio.body.velocity.y = 0
    minicactiliov2.body.velocity.y = 0
    minicactiliov3.body.velocity.y = 0
  }
  function todoensusitio () {
    curva.body.x = 1300
    curva.body.y = 530
    curva2.body.x = 1300
    curva2.body.y = 530
    columnapeq1.body.x = 1200
    columnapeq1.body.y = 490
    columnapeq2.body.x = 1300
    columnapeq2.body.y = 459
    columnapeq2v2.body.x = 1300
    columnapeq2v2.body.y = 459
    columnamed1.body.x = 1400
    columnamed1.body.y = 439
    columna.body.x = 1500
    columna.body.y = 385
    columnagrande.body.x = 1600
    columnagrande.body.y = 308
    espinascircular.body.x = 1300
    espinascircular.body.y = 300
    espinascircular2.body.x = 1300
    espinascircular2.body.y = 300
    life.body.x = 1600
    life.body.y = 200
  }
  function overpoweredmodeon () {
    if (musicoverpoweredisrunning === false) {
      if (((chocobito.body.x > life.body.x - 40) && (chocobito.body.x < life.body.x + 98)) && ((chocobito.body.y > life.body.y - 40) && (chocobito.body.y < life.body.y + 68))) {
        life.body.x = -300
        score = score + 15000
        music.stop()
        overpowered.play()
        musicoverpoweredisrunning = true
        chocobito.body.kinematic = true
        chocobito.alpha = 0.5

        setTimeout(function () {
          if (musicoverpoweredisrunning === true) {
            musicoverpoweredisrunning = false
            musicisrunning = true
            let x = chocobito.body.x
            let y = chocobito.body.y
            chocobito.kill()
            chocobito.body.kinematic = false
            chocobito = game.add.sprite(x, y, 'chocobitos', 9)
            chocobito.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 20, true)
            chocobito.play('fly')
            chocobito.name = 'chocobito'
            game.physics.p2.enable([chocobito], false)
            chocobito.body.fixedRotation = true
            chocobito.body.clearShapes()
            chocobito.body.loadPolygon('physicsData2', 'chocobosolo')
          }
        }, 17000)
      }
    }
  }
  function contienealchocobo () {
    if ((chocobito.body.x > 790) || (chocobito.body.y > 520) || (chocobito.body.y < 50)) {
      chocobito.body.velocity.x = 0
      chocobito.body.velocity.y = 0
    }
    if (chocobito.body.x > 790) {
      estaalfondo = true
    } else {
      estaalfondo = false
    }
    if (chocobito.body.y > 520) {
      estaabajo = true
    } else {
      estaabajo = false
    }
    if (chocobito.body.y < 50) {
      estaarriba = true
    } else {
      estaarriba = false
    }
  }
  $('#start').text('RESTART')
  $('#start').unbind('click')
  $('#start').click(function () {
    restart()
  })
  function loadJSONFile (url, callback) {
    let xhttp
    if (window.XMLHttpRequest) {
      xhttp = new XMLHttpRequest()
    } else {
      xhttp = new ActiveXObject('Microsoft.XMLHTTP')
    }
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        if (typeof callback === 'function') {
          callback(xhttp.responseText)
        }
      }
    }
    xhttp.open('GET', url, false)
    xhttp.send()
  }
  function nuevaclave (clave, valor) {
    if (localStorage[clave] != null) {
      localStorage.setItem(clave, valor)
    } else {
      localStorage.setItem(clave, valor)
    }
  }

  if (localStorage.length > 0) {
    var valor = localStorage['scores']
    var valores = JSON.parse(valor)
    console.log(valores.length)
    for (let i = 0; i < valores.Scores.Nombre.length; i++) {
      $('#users tbody').append('<tr>' +
                '<td>' + valores.Scores.Nombre[i] + '</td>' +
                '<td>' + valores.Scores.VelocidadMax[i] +
                '</td>' +
                '<td>' + valores.Scores.Puntuacion[i] + '</td>' +
                '<td>' + '<img width=80 src="' + valores.Scores.Icono[i] + '"/>' + '</td>' +
                '</tr>')
    }
  } else {
    loadJSONFile('scores.json', (responseText) => {
      scores = JSON.parse(responseText)
      console.log(scores)
      nuevaclave('scores', JSON.stringify(scores))
      var valor = localStorage['scores']
      var valores = JSON.parse(valor)
      console.log(valores)
    })
  }
}
