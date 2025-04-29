function createAsteroids () {
    info.startCountdown(15)
    while (info.countdown() > 0) {
        projectile = sprites.createProjectileFromSide(assets.image`asteroid0`, randint(-75, -25), randint(-25, 25))
        projectile.setPosition(160, randint(5, 115))
        pause(randint(250, 1000))
    }
}
function startGame () {
    info.setLife(3)
    scene.setBackgroundImage(assets.image`spaceBackground`)
    discovery = sprites.create(assets.image`discoveryShuttle`, SpriteKind.Player)
    discovery.z = 10
    discovery.setPosition(30, 60)
    controller.moveSprite(discovery, 75, 75)
    discovery.setStayInScreen(true)
    createAsteroids()
}
info.onCountdownEnd(function () {
    hubble = sprites.create(assets.image`hubbleTelescope`, SpriteKind.Player)
    hubble.setPosition(140, 55)
    music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.InBackground)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Player, function (sprite, otherSprite) {
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Projectile)
    scene.setBackgroundImage(assets.image`kellyScreen`)
    game.showLongText("Successful", DialogLayout.Bottom)
    game.showLongText("Mission Accomplished, Thank You", DialogLayout.Bottom)
    game.reset()
})
let hubble: Sprite = null
let discovery: Sprite = null
let projectile: Sprite = null
scene.setBackgroundImage(assets.image`kellyScreen`)
game.showLongText("Hi! My name is Saumya", DialogLayout.Bottom)
game.showLongText("Use the arrow key to move", DialogLayout.Bottom)
startGame()
