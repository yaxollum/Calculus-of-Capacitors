window.onload = () => {
    let c = document.getElementById("discharging-simulation") as HTMLCanvasElement;
    let dpi = 5;
    c.width *= dpi;
    c.height = c.width / 2;
    let ctx = c.getContext("2d")!;
    ctx.scale(dpi, dpi);
    c.style.maxWidth = "100%";
    c.style.maxHeight = "50vh";

    let convX = (x: number) => x / 100 * c.width / dpi;
    let convY = (y: number) => y / 100 * c.height / dpi;
    let drawLine = (x1: number, y1: number, x2: number, y2: number) => {
        ctx.beginPath();
        ctx.moveTo(convX(x1), convY(y1));
        ctx.lineTo(convX(x2), convY(y2));
        ctx.stroke();
    }
    let drawCharge = (x: number, y: number, color: string) => {
        ctx.beginPath();
        ctx.arc(convX(x), convY(y), convX(0.5), 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.fill();
    }
    let drawPositive = (x: number, y: number) => drawCharge(x, y, "red");
    let drawNegative = (x: number, y: number) => drawCharge(x, y, "blue");

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

    for (let i = 0; i < 100; ++i) {
        let r = i % 15;
        let c = (i - r) / 15;
        drawNegative(39.4 - 0.2 * c, 5 + r * 2);
    }
    for (let i = 0; i < 100; ++i) {
        let r = i % 15;
        let c = (i - r) / 15;
        drawPositive(45.6 + 0.2 * c, 5 + r * 2);
    }

    let frame = () => {

    }
    setInterval(frame, 10);
}
