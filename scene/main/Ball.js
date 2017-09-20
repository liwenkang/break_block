var Ball = function(game) {
	var o = game.imageByName('ball')
	o.x = 100
	o.y = 200
	o.speedX = 5
	o.speedY = 5
	o.fired = false
	o.w = o.image.width
	o.h = o.image.height
	o.fire = function() {
		o.fired = true
	}
	o.move = function() {
		if (o.fired) {
			// log('move')
			if (o.x < 0 || o.x + o.w > 400) {
				o.speedX *= -1
			}
			if (o.y < 0 || o.y + o.h > 300) {
				o.speedY *= -1
			}
			// move
			o.x += o.speedX
			o.y += o.speedY
		}
	}
	o.反弹 = function() {
		o.speedY *= -1
	}
	o.hasPoint = function (x,y) {
		//一个点在矩形中
		var xIn = x >= o.x && x <= o.x + o.w
		var yIn = y >= o.y && y <= o.y + o.h
		return xIn && yIn
	}
	return o
}
