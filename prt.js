
window.APP = window.angular.module('main', []).controller('MainCtrl', function($scope) {
  $scope.state = {
    people: [
      {
        name: "Andy",
        times: [],
        profile_img: "img/faces/andy.png",
      },
      {
        name: "Josh",
        times: [],
        profile_img: "img/faces/josh_wolfe.png",
      },
    ],
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
    current_checkpoint: 0,
  };

  $scope.addPerson = function() {
    $scope.state.people.push({name: "new person", times: []});
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
    $scope.state.gameState = 'ready';
    saveState();
  };

  $scope.backToSetup = function() {
    $scope.state.gameState = 'setup';
    saveState();
  };

  $scope.readySetGo = function() {
    var checkpoint = $scope.state.checkpoints[$scope.state.current_checkpoint];
    checkpoint.start = new Date();
    $scope.state.gameState = 'play';
    saveState();
    happyFunTimeAudio.play();
  };

  $scope.everyoneWins = function() {
    var checkpoint_index = $scope.state.current_checkpoint;
    var checkpoint = $scope.state.checkpoints[checkpoint_index];
    $scope.state.current_checkpoint += 1;
    var end_time = new Date();
    $scope.state.people.forEach(function(person) {
      person.times[checkpoint_index] = end_time - checkpoint.start;
    });
    $scope.state.gameState = 'ready';
    saveState();
  };

  loadState();

  function saveState() {
    localStorage.state = window.angular.toJson($scope.state);
  }

  function loadState() {
    if (localStorage.state) {
      $scope.state = window.angular.fromJson(localStorage.state);
      $scope.state.checkpoints.forEach(function(checkpoint) {
        if (checkpoint.start) checkpoint.start = new Date(checkpoint.start);
      });
    }
  }

  var happyFunTimeAudio = new Audio("mario-kart.ogg");

});

window.APP.run();
