window.onload = () => {
  let container = document.getElementById(
    "discharging-simulation"
  ) as HTMLCanvasElement;
  container.style.borderStyle = "dotted";
  container.style.borderWidth = "1px";
  container.style.padding = "1em";
  container.style.margin = "1em";
  container.style.cursor = "default";

  let controls = document.createElement("p");
  let info = document.createElement("p");
  let running = false;
  let t = 0;
  let playPauseButton = document.createElement("button");
  playPauseButton.style.margin = "0.3em";
  let updatePlayPauseText = () => {
    if (running) {
      playPauseButton.innerText = "Pause Simulation";
    } else {
      playPauseButton.innerText = "Play Simulation";
    }
  };
  playPauseButton.onclick = () => {
    running = !running;
    updatePlayPauseText();
  };
  updatePlayPauseText();
  let resetButton = document.createElement("button");
  resetButton.onclick = () => {
    t = 0;
  };
  resetButton.style.margin = "0.3em";
  resetButton.innerText = "Reset";
  controls.appendChild(playPauseButton);
  controls.appendChild(resetButton);
  container.appendChild(controls);
  container.appendChild(info);

  let c = document.createElement("canvas");
  c.style.maxWidth = "100%";
  c.style.maxHeight = "50vh";

  container.appendChild(c);

  let dpi = 5;
  c.width *= dpi;
  c.height = c.width / 2;
  let ctx = c.getContext("2d")!;
  ctx.scale(dpi, dpi);

  let conv = (x: number) => ((x / 100) * c.width) / dpi;
  let drawLine = (x1: number, y1: number, x2: number, y2: number) => {
    ctx.beginPath();
    ctx.moveTo(conv(x1), conv(y1));
    ctx.lineTo(conv(x2), conv(y2));
    ctx.stroke();
  };
  let drawCharge = (x: number, y: number, color: string) => {
    ctx.beginPath();
    ctx.arc(conv(x), conv(y), conv(0.4), 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
  };
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
  };
  let drawPlateCharges = (n: number) => {
    for (let i = 0; i < n; ++i) {
      let r = i % 15;
      let c = (i - r) / 15;
      drawNegative(39.4 - c, 2.5 + r);
    }
    for (let i = 0; i < n; ++i) {
      let r = i % 15;
      let c = (i - r) / 15;
      drawPositive(45.6 + c, 2.5 + r);
    }
  };

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

  let offset = 0;
  const chargeSpacing = 5;
  const q0 = 45;
  const frameDelay = 25 / 1000;
  const timeFactor = 1 / 4;

  let frame = () => {
    ctx.clearRect(0, 0, conv(100), conv(50));
    drawComponents();
    for (let p = offset % chargeSpacing; p < wireLength; p += chargeSpacing) {
      let [x, y] = wirePosToCoord(p);
      drawNegative(x, y);
    }
    let q = q0 * Math.exp(-t);
    info.innerText = `t = ${t.toFixed(1)}, Q = ${q.toPrecision(2)}`;
    drawPlateCharges(Math.round(q));
    if (running) {
      let dt = frameDelay * timeFactor;
      offset += q0 * Math.exp(-t) * chargeSpacing * dt;
      t += dt;
    }
  };
  setInterval(frame, frameDelay * 1000);
};
