var people = [];
function getElement(id) {
  return document.getElementById(id);
}
var people_list = getElement("people_list");
function addPerson(person) {
  people.push(person);
  var item = document.createElement("li");
  item.setAttribute("id", person.id);
  item.appendChild(document.createTextNode(person.id));
  var delete_button = document.createElement("button");
  delete_button.innerText = "Delete";
  item.appendChild(delete_button);
  people_list.appendChild(item);
  delete_button.addEventListener("click", function() {
    var index;
    people.forEach(function(p, i) {
      if (p.id === person.id) {
        index = i;
      }
    });
    people.splice(index, 1);
    people_list.removeChild(item);
    saveState();
  });
}
getElement("add_person_button").addEventListener("click", function() {
  var id = getElement("add_person_text").value;
  addPerson({id: id});
  saveState();
});
function saveState() {
  localStorage.people = JSON.stringify(people);
}
(function loadState() {
  if (localStorage.people) {
    var loaded_people = JSON.parse(localStorage.people);
    loaded_people.forEach(addPerson);
  }
})();

var startAudioBtn = document.createElement("button");
startAudioBtn.innerText = "Start!";
var happyFunTimeAudio = new Audio("mario-kart.ogg");
startAudioBtn.addEventListener("click", function() {
  happyFunTimeAudio.play();
});
document.body.appendChild(startAudioBtn);
