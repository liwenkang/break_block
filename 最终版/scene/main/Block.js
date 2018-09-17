var Block = function (game,position) {
	//position是[0,0]格式
	var p = position
	// var image = imageFromPath("block.png")
	var img = game.imageByName('block')
	var o = {
		alive : true,
		lifes : p[2] || 1,
		x : p[0],
		y : p[1],
	}
	o.image = img.image
	o.w = img.w
	o.h = img.h

	o.kill = function () {
		o.lifes--
		if(o.lifes < 1) {
			o.alive = false
		}
	}
	o.collide = function (b) {
		//判断砖块和球相撞
		//o是砖块,b是小球
		//球存在的情况下,才能相撞
		return o.alive && aInb(b,o)
	}
	return o
}