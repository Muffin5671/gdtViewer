const canvas = $("#GDT")[0];
const ctx = canvas.getContext("2d");

const level = prompt("Paste your Geometry Dash Testing level here:");

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

try {
  const json = GDTtoJSON(level);

  const bg = {
    id: Number(level.split("~")[0].split("_")[0]),
    color: Number(level.split("~")[0].split("_")[1]),
    brightness: Number(level.split("~")[0].split("_")[2])
  };
  switch (bg.id) {
    case 1:
      canvas.style.backgroundImage = "url(/gdtViewer/images/game_bg_01_001-uhd.png)";
      break;
    case 2:
      canvas.style.backgroundImage = "url(/gdtViewer/images/game_bg_07_001-uhd.png)";
      break;
    case 3:
      canvas.style.backgroundImage = "url(/gdtViewer/images/game_bg_11_001-uhd.png)";
      break;
    default:
      canvas.style.backgroundImage = "url(/gdtViewer/images/game_bg_01_001-uhd.png)";
      break;
  }
  canvas.style.backgroundColor = convertBGColorToHWB(bg.color, bg.brightness);

  canvas.width = json[json.length - 1].x * 15;
  canvas.height = screen.height;
  json.forEach(obj => {
    const img = new Image();
    img.src = `https://gdcolon.com/obj/${obj.id}.png`; // sorry colon
    img.addEventListener("load", (event) => {
      ctx.drawImage(img, obj.x * 1.65, -obj.y * 1.65 + (canvas.height - 25), 50, 50);
    });
  });
} catch (e) {
  alert(`There was an error:\n\n${e}`);
}
