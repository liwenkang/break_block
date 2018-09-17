//场景


class SceneEnd extends GuaScene {
	constructor(game) {
		super(game)
		//初始化

		game.registerAction('r',function () {
			var s = SceneTitle.new(game)
			game.replaceScene(s)
		})

	}


	draw() {
		this.game.context.fillText("游戏结束,你的分数是:" + this.game.score + " " + "按 r 返回标题界面",100,290)
	}
	update(){
	}
}