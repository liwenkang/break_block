class GuaScene {
	constructor(game) {
		 this.game = game
	}
	static new(game) {
		var i = new this(game)
		return i
	}
	draw() {
		// alert("一定要继承本函数")
	}
	update(){

	}
}

