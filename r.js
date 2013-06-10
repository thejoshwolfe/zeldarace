var people = [];
function getElement(id) {
  return document.getElementById(id);
}
var people_list = getElement("people_list");
function addMan(id) {
  var person = {
    id: id
  };
  var item = document.createElement("li");
  item.setAttribute("id", id);
  item.innerText = id;
  people_list.appendChild(item);
}
getElement("add_person_button").addEventListener("click", function() {
  var text = getElement("add_person_text").value;
  addMan(text);
});
function saveState() {
  var people = [];
  localStorage.asdf = "asdf";
}
