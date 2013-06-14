var people = {};
function getElement(id) {
  return document.getElementById(id);
}
var people_list = getElement("people_list");
getElement("add_person_button").addEventListener("click", function() {
  var id = getElement("add_person_text").value;
  var person = {id: id};
  if (people[person.id]) return;
  people[person.id] = person;
  saveState();
  render();
});
function saveState() {
  localStorage.people = JSON.stringify(people);
}
(function loadState() {
  if (localStorage.people) {
    people = JSON.parse(localStorage.people);
    render();
  }
})();
function render() {
  people_list.innerHTML = "";
  for (var id in people) {
    var person = people[id];
    makeListItem(person);
  }
  function makeListItem(person) {
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
}

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
