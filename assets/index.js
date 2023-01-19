window.onload = function () {
    var c = document.getElementById("discharging-simulation");
    var dpi = 5;
    c.width *= dpi;
    c.height = c.width / 2;
    var ctx = c.getContext("2d");
    ctx.scale(dpi, dpi);
    c.style.maxWidth = "100%";
    c.style.maxHeight = "50vh";
    var convX = function (x) { return x / 100 * c.width / dpi; };
    var convY = function (y) { return y / 100 * c.height / dpi; };
    var drawLine = function (x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(convX(x1), convY(y1));
        ctx.lineTo(convX(x2), convY(y2));
        ctx.stroke();
    };
    var drawCharge = function (x, y, color) {
        ctx.beginPath();
        ctx.arc(convX(x), convY(y), convX(0.5), 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.fill();
    };
    var drawPositive = function (x, y) { return drawCharge(x, y, "red"); };
    var drawNegative = function (x, y) { return drawCharge(x, y, "blue"); };
    // capacitor
    drawLine(40, 5, 40, 35);
    drawLine(45, 5, 45, 35);
    // wires
    drawLine(40, 20, 5, 20);
    drawLine(5, 20, 5, 90);
    drawLine(5, 90, 40, 90);
    drawLine(48, 90, 95, 90);
    drawLine(95, 90, 95, 20);
    drawLine(95, 20, 45, 20);
    // resistor
    drawLine(40, 90, 41, 80);
    drawLine(41, 80, 43, 100);
    drawLine(43, 100, 45, 80);
    drawLine(45, 80, 47, 100);
    drawLine(47, 100, 48, 90);
    for (var i = 0; i < 100; ++i) {
        var r = i % 15;
        var c_1 = (i - r) / 15;
        drawNegative(39.4 - 0.2 * c_1, 5 + r * 2);
    }
    for (var i = 0; i < 100; ++i) {
        var r = i % 15;
        var c_2 = (i - r) / 15;
        drawPositive(45.6 + 0.2 * c_2, 5 + r * 2);
    }
    var frame = function () {
    };
    setInterval(frame, 10);
};
