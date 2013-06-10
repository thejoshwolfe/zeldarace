var people = {};
function getElement(id) {
  return document.getElementById(id);
}
var people_list = getElement("people_list");
function addPerson(person) {
  if (people[person.id]) return;
  people[person.id] = person;
  var item = document.createElement("li");
  item.setAttribute("id", person.id);
  item.appendChild(document.createTextNode(person.id));
  var delete_button = document.createElement("button");
  delete_button.innerText = "Delete";
  item.appendChild(delete_button);
  people_list.appendChild(item);
  delete_button.addEventListener("click", function() {
    delete people[person.id];
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
    for (var k in loaded_people) {
      addPerson(loaded_people[k]);
    }
  }
})();

var happyFunTimeAudio = new Audio("mario-kart.ogg");
getElement("mario_cart_button").addEventListener("click", function() {
  happyFunTimeAudio.play();
});


var checkpoints = [
  {
    name: "Deku Tree",
    desc: "Pause immediately after the cutscene after...",
  },
  {
    name: "Dodongo's Cavern",
    desc: "Pause at some point...",
  },
  {
    name: "Adult Link",
    desc: "Pause",
  },
  {
    name: "Forest Temple",
    desc: "Pause",
  },
  {
    name: "Fire Temple",
    desc: "Pause",
  },
  {
    name: "Water Temple",
    desc: "Pause",
  },
  {
    name: "Shadow Temple",
    desc: "Pause",
  },
  {
    name: "Spirit Temple",
    desc: "Pause",
  },
  {
    name: "Ganon's Castle",
    desc: "Pause",
  },
];
