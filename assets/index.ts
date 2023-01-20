window.onload = () => {
    let c = document.getElementById("discharging-simulation") as HTMLCanvasElement;
    let dpi = 5;
    c.width *= dpi;
    c.height = c.width / 2;
    let ctx = c.getContext("2d")!;
    ctx.scale(dpi, dpi);
    c.style.maxWidth = "100%";
    c.style.maxHeight = "50vh";

    let conv = (x: number) => x / 100 * c.width / dpi;
    let drawLine = (x1: number, y1: number, x2: number, y2: number) => {
        ctx.beginPath();
        ctx.moveTo(conv(x1), conv(y1));
        ctx.lineTo(conv(x2), conv(y2));
        ctx.stroke();
    }
    let drawCharge = (x: number, y: number, color: string) => {
        ctx.beginPath();
        ctx.arc(conv(x), conv(y), conv(0.5), 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.fill();
    }
    let drawPositive = (x: number, y: number) => drawCharge(x, y, "red");
    let drawNegative = (x: number, y: number) => drawCharge(x, y, "blue");

    const wireStartX = 40;
    const wireEndX = 45;
    const wireTopY = 10;
    const wireLeftX = 5;
    const wireBottomY = 45;
    const wireRightX = 95;
    let drawComponents = () => {
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
    }
    let drawCharges = () => {
        for (let i = 0; i < 100; ++i) {
            let r = i % 15;
            let c = (i - r) / 15;
            drawNegative(39.4 - 0.2 * c, 2.5 + r * 2);
        }
        for (let i = 0; i < 100; ++i) {
            let r = i % 15;
            let c = (i - r) / 15;
            drawPositive(45.6 + 0.2 * c, 2.5 + r * 2);
        }
    }

    let offset = 0;
    let chargeSpacing = 10;

    const l1 = wireStartX - wireLeftX;
    const l2 = wireBottomY - wireTopY;
    const l3 = wireRightX - wireLeftX;
    const l4 = wireRightX - wireEndX;
    const wireLength = l1 + 2 * l2 + l3 + l4;
    function wirePosToCoord(pos: number): [number, number] {
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
    let frame = () => {
        ctx.clearRect(0, 0, conv(100), conv(50));
        drawComponents();
        for (let p = offset % chargeSpacing; p < wireLength; p += chargeSpacing) {
            let [x, y] = wirePosToCoord(p);
            drawNegative(x, y);
        }
        drawCharges();
        offset += 0.5;
    }
    setInterval(frame, 25);
}
