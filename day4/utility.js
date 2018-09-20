var log = console.log.bind(console)

// var log = (s) => {
//     document.querySelector("#id-text-log").value += '\n' + s
// }

// 载入图片
var imageFromPath = function (path) {
    var img = new Image()
    img.src = path
    return img
}

var aInb = function (a, b) {
    if (a.y > b.y && a.y < b.y + b.image.height) {
        if (a.x > b.x && a.x < b.x + b.image.width) {
            return true
        }
    }
    return false
}
