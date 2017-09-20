//场景
var Scene = function (game) {
	var s = {
		game:game,
	}
	//初始化
	var paddle = Paddle(game)
	var ball = Ball(game)
	//生成很多的砖块
	game.score = 0


	var blocks = loadLevel(game,1)//初始化是可以加载的

	game.registerAction('a',function () {
		paddle.moveLeft()
	})

	game.registerAction('d',function () {
		paddle.moveRight()
	})

	game.registerAction('f',function () {
		ball.fire()
	})



	window.addEventListener('keydown',function (event) {
		var k = event.key
		if(k == 'p') {
			//暂停
			window.paused = !window.paused
		}else if('1234567'.includes(k)){
			blocks = loadLevel(game, Number(k))//载入关卡
		}
	})

	s.draw = function () {

		// //画一个背景
		game.context.fillStyle = "#556"
		game.context.fillRect(0,0,400,300)

		game.drawImage(paddle)
		game.drawImage(ball)
		//draw blocks
		for(var i = 0; i < blocks.length; i++) {
			var block = blocks[i]
			if(block.alive) {
				game.drawImage(block)
			}
		}

		game.context.fillText("score:" + game.score, 10, 20)
	}
	s.update = function () {
		if(window.paused) {
			return
		}
		//加一个鼠标拖拽

		ball.move()
		// 判断游戏结束
		if (ball.y > paddle.y) {
			// 跳转到 游戏结束 的场景
			var end = SceneEnd.new(game)
			game.replaceScene(end)
		}
		// 判断相撞
		if (paddle.collide(ball)) {
			// 这里应该调用一个 ball.反弹() 来实现
			ball.反弹()
		}
		// 判断 ball 和 blocks 相撞
		for (var i = 0; i < blocks.length; i++) {
			var block = blocks[i]
			if (block.collide(ball)) {
				// log('block 相撞')
				block.kill()
				ball.反弹()
				// 更新分数
				game.score += 100
			}
		}
	}

		var enableDrag = false
		game.canvas.addEventListener('mousedown',function (event) {
			var x = event.offsetX
			var y = event.offsetY
			//检查是否点中了
			if(ball.hasPoint(x,y)) {
				//设置拖拽状态
				enableDrag = true
			}
		})

		game.canvas.addEventListener('mousemove',function (event) {
			var x = event.offsetX
			var y = event.offsetY
			if(enableDrag) {
				log(x,y,'drag')
				ball.x = x
				ball.y = y
			}
		})

		game.canvas.addEventListener("mouseup", function (event) {
			var x = event.offsetX
			var y = event.offsetY
			log(x,y,'up')
			enableDrag = false
		})

	return s
}