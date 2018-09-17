var loadLevel = function (game, n) {
	n--
	var level = levels[n]
	var blocks = []
	for(var i = 0; i < level.length; i++) {
		//新生成砖块
		var p = level[i]
		var b = Block(game, p)
		//设置block坐标
		blocks.push(b)
	}
	return blocks
}

window.paused = false

var enableDebugMode = function (game,enable) {
	if(!enable) {
		return
	}
	//这是为了debug
	//控制速度
	document.querySelector('#id-input-speed').addEventListener('input',function (event) {
		var input = event.target
		window.fps = Number(input.value)
	})
}

var __main = function () {
	var images = {
		ball:'img/ball.png',
		block:'img/block.png',
		paddle:'img/paddle.png',
	}
	window.paused = false

	var game = GuaGame.instance(30,images,function (g) {
		var s = SceneTitle.new(g)
		g.runWithScene(s)
	})

	enableDebugMode(game,true)
}

__main()
