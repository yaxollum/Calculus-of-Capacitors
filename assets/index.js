window.onload = function () {
    var container = document.getElementById("discharging-simulation");
    container.style.borderStyle = "dotted";
    container.style.borderWidth = "1px";
    container.style.padding = "1em";
    container.style.margin = "1em";
    container.style.cursor = "default";
    var controls = document.createElement("p");
    var info = document.createElement("p");
    var running = false;
    var t = 0;
    var playPauseButton = document.createElement("button");
    playPauseButton.style.margin = "0.3em";
    var updatePlayPauseText = function () {
        if (running) {
            playPauseButton.innerText = "Pause Simulation";
        }
        else {
            playPauseButton.innerText = "Play Simulation";
        }
    };
    playPauseButton.onclick = function () {
        running = !running;
        updatePlayPauseText();
    };
    updatePlayPauseText();
    var resetButton = document.createElement("button");
    resetButton.onclick = function () {
        t = 0;
    };
    resetButton.style.margin = "0.3em";
    resetButton.innerText = "Reset";
    controls.appendChild(playPauseButton);
    controls.appendChild(resetButton);
    container.appendChild(controls);
    container.appendChild(info);
    var c = document.createElement("canvas");
    c.style.maxWidth = "100%";
    c.style.maxHeight = "50vh";
    container.appendChild(c);
    var dpi = 5;
    c.width *= dpi;
    c.height = c.width / 2;
    var ctx = c.getContext("2d");
    ctx.scale(dpi, dpi);
    var conv = function (x) { return ((x / 100) * c.width) / dpi; };
    var drawLine = function (x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(conv(x1), conv(y1));
        ctx.lineTo(conv(x2), conv(y2));
        ctx.stroke();
    };
    var drawCharge = function (x, y, color) {
        ctx.beginPath();
        ctx.arc(conv(x), conv(y), conv(0.4), 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.fill();
    };
    var drawPositive = function (x, y) { return drawCharge(x, y, "red"); };
    var drawNegative = function (x, y) { return drawCharge(x, y, "blue"); };
    var wireStartX = 40;
    var wireEndX = 45;
    var wireTopY = 10;
    var wireLeftX = 5;
    var wireBottomY = 45;
    var wireRightX = 95;
    var drawComponents = function () {
        // capacitor
        drawLine(40, 2.5, 40, 17.5);
        drawLine(45, 2.5, 45, 17.5);
        // wires
        drawLine(wireStartX, wireTopY, wireLeftX, wireTopY);
        drawLine(wireLeftX, wireTopY, wireLeftX, wireBottomY);
        drawLine(wireLeftX, wireBottomY, 40, wireBottomY);
        drawLine(48, wireBottomY, wireRightX, wireBottomY);
        drawLine(wireRightX, wireBottomY, wireRightX, wireTopY);
        drawLine(wireRightX, wireTopY, wireEndX, wireTopY);
        // resistor
        drawLine(40, 45, 41, 40);
        drawLine(41, 40, 43, 50);
        drawLine(43, 50, 45, 40);
        drawLine(45, 40, 47, 50);
        drawLine(47, 50, 48, 45);
    };
    var drawPlateCharges = function (n) {
        for (var i = 0; i < n; ++i) {
            var r = i % 15;
            var c_1 = (i - r) / 15;
            drawNegative(39.4 - c_1, 2.5 + r);
        }
        for (var i = 0; i < n; ++i) {
            var r = i % 15;
            var c_2 = (i - r) / 15;
            drawPositive(45.6 + c_2, 2.5 + r);
        }
    };
    var l1 = wireStartX - wireLeftX;
    var l2 = wireBottomY - wireTopY;
    var l3 = wireRightX - wireLeftX;
    var l4 = wireRightX - wireEndX;
    var wireLength = l1 + 2 * l2 + l3 + l4;
    function wirePosToCoord(pos) {
        if (pos <= l1) {
            return [wireStartX - pos, wireTopY];
        }
        pos -= l1;
        if (pos <= l2) {
            return [wireLeftX, wireTopY + pos];
        }
        pos -= l2;
        if (pos <= l3) {
            return [wireLeftX + pos, wireBottomY];
        }
        pos -= l3;
        if (pos <= l2) {
            return [wireRightX, wireBottomY - pos];
        }
        pos -= l2;
        return [wireRightX - pos, wireTopY];
    }
    var offset = 0;
    var chargeSpacing = 5;
    var q0 = 45;
    var frameDelay = 25 / 1000;
    var timeFactor = 1 / 4;
    var frame = function () {
        ctx.clearRect(0, 0, conv(100), conv(50));
        drawComponents();
        for (var p = offset % chargeSpacing; p < wireLength; p += chargeSpacing) {
            var _a = wirePosToCoord(p), x = _a[0], y = _a[1];
            drawNegative(x, y);
        }
        var q = q0 * Math.exp(-t);
        info.innerText = "t = " + t.toFixed(1) + ", Q = " + q.toPrecision(2);
        drawPlateCharges(Math.round(q));
        if (running) {
            var dt = frameDelay * timeFactor;
            offset += q0 * Math.exp(-t) * chargeSpacing * dt;
            t += dt;
        }
    };
    setInterval(frame, frameDelay * 1000);
};
