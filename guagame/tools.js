var log = console.log.bind(console)

var imageFromPath = function (path) {
	var img = new Image()
	img.src = path
	return img
}

var aInb = function (a,b) {
	if(xInx1_x2(a.x,b.x,b.x+b.w) || xInx1_x2(b.x,a.x,a.x+a.w)) {
		if(xInx1_x2(a.y,b.y,b.y+b.h) || xInx1_x2(b.y,a.y,a.y+a.h)) {
			return true
		}
	}
	return false
}

var xInx1_x2 = function (x,x1,x2) {
	return x >= x1 && x <= x2
} 