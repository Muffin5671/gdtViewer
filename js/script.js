let canvas = $("#GDT")[0];
const ctx = canvas.getContext("2d");

let level = prompt("Paste your Geometry Dash Testing level here:");

function GDTtoJSON(gdt) {
  let json = [];
  let objects = gdt.split("~")[1];

  objects.split(";").forEach(obj => {
    if (obj) {
      let id = Number(obj.split(",")[0]);
      let x = Number(obj.split(",")[1]);
      let y = Number(obj.split(",")[2]);
      let dir = Number(obj.split(",")[3]);

      json.push({ id, x, y, dir });
    }
  });

  return json;
}

function convertBGColorToHWB(tint, brightness) {
  let h = 216 + tint * 1.8 % 360;
  let w;
  let b;
  // brightness isn't 100% accurate but it works
  if (brightness < 0) {
    w = 0;
    b = 0 - brightness;
  } else {
    w = brightness;
    b = 0;
  }
  return `hwb(${h}deg ${w}% ${b}%)`;
}

let json = GDTtoJSON(level);

let bg = {
  id: level.split("~")[0].split("_")[0],
  color: level.split("~")[0].split("_")[1],
  brightness: level.split("~")[0].split("_")[2]
};
canvas.style.backgroundColor = convertBGColorToHWB(bg.color, bg.brightness);

canvas.width = json[json.length - 1].x + 600;
canvas.height = screen.height;
json.forEach(obj => {
  const img = new Image();
  img.src = `https://gdcolon.com/obj/${obj.id}.png`;
  img.addEventListener("load", () => {
    ctx.drawImage(img, obj.x * 1.65, -obj.y * 1.65 + (canvas.height - 25), 50, 50);
  });
});
