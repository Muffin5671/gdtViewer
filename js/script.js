let canvas = $("gdt")[0];
let level = confirm("Paste your Geometry Dash Testing level here:");

function GDTtoJSON(gdt) {
  let json = [];
  let objects = gdt.split("~")[1];

  objects.split(";").forEach(obj => {
    let id = obj.split(",")[0];
    let x = obj.split(",")[1];
    let y = obj.split(",")[2];
    let dir = obj.split(",")[3];

    json.push({ id, x, y, dir });
  });

  return json;
}

let json = GDTtoJSON(level);
json.forEach(obj => {
  // canvas stuff
});
