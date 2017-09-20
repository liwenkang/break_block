var Paddle = function (game) {
	var o = game.imageByName("paddle")
	o.speed = 15
	o.x = 100
	o.y = 250
	o.w = o.image.width
	o.h = o.image.height

	o.limitMove = function (x) {
		if(x < 0) {
			x = 0
		}
		if(x + o.image.width > 400) {
			x = 400 - o.image.width
		}
		o.x = x
	}

	o.moveLeft = function () {
		o.limitMove(o.x - o.speed)
	}
	o.moveRight = function () {
		o.limitMove(o.x + o.speed)
	}
	o.collide = function (ball) {
		//判断两个矩形是否相交
		return aInb(o,ball)
	}
	return o
}