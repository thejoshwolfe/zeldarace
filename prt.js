
window.APP = window.angular.module('main', []).controller('MainCtrl', function($scope) {
  $scope.state = {
    people: [],
    gameState: 'setup',
    checkpoints: [
      {
        name: "Deku Tree",
        img_src: "img/deku_stone.png",
        desc: "Pause immediately after the cutscene after...",
      },
      {
        name: "Dodongo's Cavern",
        img_src: "img/goron_stone.png",
        desc: "Pause at some point...",
      },
      {
        name: "Adult Link",
        img_src: "img/Light_Medallion.png",
        desc: "Pause",
      },
      {
        name: "Forest Temple",
        img_src: "img/Forest_Medallion.png",
        desc: "Pause",
      },
      {
        name: "Fire Temple",
        img_src: "img/Fire_Medallion.png",
        desc: "Pause",
      },
      {
        name: "Water Temple",
        img_src: "img/Water_Medallion.png",
        desc: "Pause",
      },
      {
        name: "Shadow Temple",
        img_src: "img/Shadow_Medallion.png",
        desc: "Pause",
      },
      {
        name: "Spirit Temple",
        img_src: "img/Spirit_Medallion.png",
        desc: "Pause",
      },
      {
        name: "Ganon's Castle",
        img_src: "img/triforce.png",
        desc: "Pause",
      },
    ],
  };

  $scope.addPerson = function() {
    $scope.state.people.push({name: "new person"});
    saveState();
  };

  $scope.save = function() {
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
