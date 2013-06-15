
window.APP = window.angular.module('main', []).controller('MainCtrl', function($scope) {
  var happyFunTimeAudio = new Audio("mario-kart.ogg");
  var requestAnimationFrame = window.requestAnimationFrame;

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
    $scope.state.gameState = 'race';
    saveState();
  };

  $scope.backToSetup = function() {
    $scope.state.gameState = 'setup';
    saveState();
  };

  $scope.readyToStart = function() {
    if ($scope.state.gameState !== "race") return false;
    if (!$scope.currentCheckpoint()) return false;
    return !$scope.theClockIsTicking();
  };

  $scope.theClockIsTicking = function() {
    if ($scope.state.gameState !== "race") return false;
    if (!$scope.currentCheckpoint())       return false;
    if (!$scope.currentCheckpoint().start) return false;
    return $scope.state.people.some(function(person) {
      return !person.times[$scope.state.current_checkpoint];
    });
  };

  $scope.currentCheckpoint = function() {
    return $scope.state.checkpoints[$scope.state.current_checkpoint];
  };

  $scope.readySetGo = function() {
    var checkpoint = $scope.currentCheckpoint();
    // mario kart gives an 8 second count down
    checkpoint.start = new Date(new Date().getTime() + 8000);
    saveState();
    happyFunTimeAudio.play();
  };

  $scope.personIsDone = function(person) {
    var checkpoint_index = $scope.state.current_checkpoint;
    var checkpoint = $scope.currentCheckpoint();
    var end_time = new Date();
    person.times[checkpoint_index] = end_time - checkpoint.start;
    var all_done = $scope.state.people.every(function(person) {
      return !!person.times[checkpoint_index];
    });
    if (all_done) {
      $scope.state.current_checkpoint += 1;
    }
    saveState();
  };

  $scope.totalTime = function(person) {
    var total_time = 0;
    person.times.forEach(function(time) {
      if (time) total_time += time;
    });
    return total_time;
  };

  $scope.rupeesForCheckpoint = function(person, checkpoint_index) {
    return rupeesForSomething(person, function(person) {
      return person.times[checkpoint_index];
    });
  };

  function rupeesForSomething(person, timeForPerson) {
    var my_time = timeForPerson(person);
    if (!my_time) return "";
    var rupees = 0;
    $scope.state.people.forEach(function(other) {
      var their_time = timeForPerson(other);
      if (!their_time || my_time < their_time) rupees += 1;
    });
    return rupees;
  }

  $scope.rupeesForTotalTime = function(person) {
    return rupeesForSomething(person, function(person) {
      return $scope.totalTime(person);
    });
  };

  $scope.totalRupees = function(person) {
    var rupees = 0;
    var prt;
    for (var i = 0; i < $scope.state.checkpoints.length; i++) {
      prt = $scope.rupeesForCheckpoint(person, i);
      if (prt) rupees += prt;
    }
    prt = $scope.rupeesForTotalTime(person);
    if (prt) rupees += prt;
    return rupees;
  };

  loadState(localStorage.state);

  requestAnimationFrame(function animateClock() {
    var clock = document.getElementById("clock");
    if ($scope.theClockIsTicking()) {
      clock.style.display = "";
      var start = $scope.currentCheckpoint().start;
      clock.innerText = formatMs(new Date() - start, true);
    } else {
      clock.style.display = "none";
    }
    requestAnimationFrame(animateClock);
  });

  var save_textarea = document.getElementById("save_textarea");
  var lense_of_truth = document.getElementById("lense_of_truth");
  var load_state_button = document.getElementById("load_state_button");
  function hideState() {
    save_textarea.style.display = "none";
    load_state_button.style.display = "none";
    lense_of_truth.innerText = "Show State";
  }

  $scope.lenseOfTruth = function() {
    if (save_textarea.style.display === "none") {
      save_textarea.style.display = "";
      load_state_button.style.display = "";
      save_textarea.select();
      save_textarea.focus();
      lense_of_truth.innerText = "Hide State";
      document.body.scrollTop = 1e10;
    } else {
      hideState();
    }
  };

  $scope.loadState = function() {
    var text = save_textarea.value;
    var state;
    try {
      state = window.angular.fromJson(text);
    } catch (e) {
      return alert(e);
    }
    loadState(state);
    hideState();
  };

  function saveState() {
    localStorage.state = window.angular.toJson($scope.state);
  }

  $scope.prettyState = function() {
    return window.angular.toJson($scope.state, true);
  };

  function loadState(state) {
    if (state) {
      $scope.state = window.angular.fromJson(state);
      $scope.state.checkpoints.forEach(function(checkpoint) {
        if (checkpoint.start) checkpoint.start = new Date(checkpoint.start);
      });
    }
  }

  $scope.resetState = function() {
    if (confirm("delete all 50 states?")) {
      localStorage.clear();
      location.href = location.href;
    }
  };

  function currentTitle() {
    if ($scope.state.gameState === "play") {
      var checkpoint = $scope.currentCheckpoint();
      return checkpoint.name + " - Zelda Race - ";
    } else {
      return "Zelda Race - ";
    }
  }

  var marqueeIndex = 0;
  updateTitle();
  setInterval(updateTitle, 200);
  function updateTitle() {
    var title = currentTitle();
    while (title.substr(marqueeIndex, 1) === " ") marqueeIndex += 1;
    document.title = title.substring(marqueeIndex) + title.substring(0, marqueeIndex)
    marqueeIndex = (marqueeIndex + 1) % title.length;
  }
});

function formatMs(ms, include_ms) {
  if (!ms) return "";
  var result = "";
  if (ms < 0) {
    result += "-";
    ms = -ms;
  }
  var hours = Math.floor(ms / (60 * 60 * 1000));

  var minutes = Math.floor((ms / 60000) % 60);
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  var seconds = Math.floor((ms / 1000) % 60);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  result += hours + ":" + minutes + ":" + seconds;
  if (include_ms) {
    var millis = "" + (ms % 1000);
    while (millis.length < 3) millis = "0" + millis;
    result += "." + millis;
  }
  return result;
}

window.APP.filter('formatMs', function() {
  return formatMs;
});

window.APP.directive('rupeeDisplay', function() {
  return {
    template: '<div class="rupee-display">' +
              '<span ng-show="red"><img src="img/rupee-red.png">{{ red }}</span>' +
              '<span ng-show="blue"><img ng-show="blue" src="img/rupee-blue.png">{{ blue }}</span>' +
              '<span ng-show="green"><img ng-show="green" src="img/rupee-green.png">{{ green }}</span>' +
              '</div>',
    link: zelda,
    replace: true,
    scope: true,
  };
  function zelda($scope, elem, attrs) {
    refresh();
    $scope.$watch(refresh);

    function refresh() {
      var total = $scope.$eval(attrs.rupeeCount);
      $scope.red = Math.floor(total / 20);
      total -= $scope.red * 20;

      $scope.blue = Math.floor((total - $scope.red * 20) / 5);
      total -= $scope.blue * 5;

      $scope.green = total;
    }
  }
});

window.APP.run();

