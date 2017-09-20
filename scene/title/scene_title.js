class SceneTitle extends GuaScene {
	constructor(game) {
		super(game)
		//初始化
		game.registerAction('k',function () {
			var s = Scene(game)
			game.replaceScene(s)
		})
	}


	draw() {
		this.game.context.fillText("按k开始游戏",100,90)
	}
	update(){
	}
}