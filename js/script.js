let canvas = $("#GDT")[0];
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

let json = GDTtoJSON(level);
json.forEach(obj => {
  // canvas stuff
});
