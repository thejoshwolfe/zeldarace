
window.APP = window.angular.module('main', []).controller('MainCtrl', function($scope) {
  $scope.state = {
    people: [],
    gameState: 'setup',
    checkpoints: [
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
    ],
  };

  $scope.addPerson = function() {
    $scope.state.people.push({name: $scope.new_person_name});
    saveState();
  };

  $scope.deletePerson = function(index) {
    $scope.state.people.splice(index, 1);
    saveState();
  };

  $scope.startGame = function() {
    $scope.state.gameState = 'game';
    saveState();
  };

  $scope.backToSetup = function() {
    $scope.state.gameState = 'setup';
    saveState();
  };

  $scope.readySetGo = function() {
    happyFunTimeAudio.play();
  };

  loadState();

  function saveState() {
    localStorage.state = window.angular.toJson($scope.state);
  }

  function loadState() {
    if (localStorage.state) {
      $scope.state = window.angular.fromJson(localStorage.state);
    }
  }

  var happyFunTimeAudio = new Audio("mario-kart.ogg");

});

window.APP.run();
