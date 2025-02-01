export function fileToJson(path) {
  var request = new XMLHttpRequest();
  request.open("GET", path, false);
  request.send(null);
  
  return JSON.parse(request.responseText);
}
