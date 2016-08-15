/**
 * Created by cendaeg on 4/30/16.
 */
var clickables = document.querySelectorAll(".clickable");

function fadeOut(e) {
  e.style.opacity = 1;
  (function __() {
    e.style.opacity -= 0.1;
    if(e.style.opacity <= 0) {
      e.style.display = "none";
    } else {
      setTimeout(__, 25);
    }
  })();
}

function fadeIn(e) {
  e.style.display = "inline";
  e.style.opacity = 0;
  (function __() {
    e.style.opacity = Number(e.style.opacity)+0.1;
    if(e.style.opacity <= 1) {
      setTimeout(__, 25);
    }
  })();
}

function display(e) {
  e.style.display = "none";
  var disp = document.querySelector(e.dataset.display);
  fadeIn(disp);
}

var clickEnum = {
  "display": display
};

Array.prototype.map.call(clickables, function(a) {
  a.addEventListener("click", function() {
    var todo = a.dataset.onclick;
    var doer = clickEnum[todo];
    doer(a);
  });
});

function addToPage(node, toAdd) {
  node = document.querySelector(node);
  toAdd.then(function(data) {
    node.innerHTML = data.join(" ");
  });
}

function getRecentMusic() {
  return new Promise(function(res, rej) {
    var url = "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=conlinism&api_key=e35b8c8d4ef1feb4d9e8eb54e44c94fa&format=json"
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.responseText);
        var track = data.recenttracks.track[0];
        res([track.name, "-", track.artist["#text"]]);
      } else {
      }
    };
    request.onerror = function() {
    };
    request.send();
  });
}

function getRecentPost() {
  return new Promise(function(res, rej) {
    var url = "/blog/posts.json"
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.responseText);
        res(["<a href='/blog/"+data[0]+"'>", data[0], "</a>"]);
      } else {
      }
    };
    request.onerror = function() {
    };
    request.send();
  });
}

addToPage("#music", getRecentMusic());
addToPage("#post", getRecentPost());

'use strict';
var cvss = document.querySelectorAll('.glitch_port');
var _loop = function _loop() {
  var cvs = cvss[i];
  var ctx = cvs.getContext('2d');
  var imgObj = new Image();
  var tiles = [];
  var globalX = 150;
  var globalY = 150;
  var tile = function tile(img, sX, sY, sHeight, sWidth) {
    var neg = Math.random() > 0.5 ? -1 : 1;
    var randomShift = (Math.random() * 4 - 1) * neg * Math.random();
    var moveScale = 0.25;
    return {
      draw: function draw() {
        ctx.drawImage(imgObj, sX, sY, sHeight, sWidth, window.innerWidth / 2 + sX + globalX * moveScale * randomShift * moveScale, -75 + sY + globalY * moveScale * randomShift * moveScale, sHeight, sWidth);
      }
    };
  };
  var redrawTiles = function redrawTiles() {
    for (var _i = 0; _i < tiles.length; _i++) {
      tiles[_i].draw();
    }
  };
  imgObj.onload = function () {
    cvs.height = window.innerHeight;
    cvs.width = window.innerWidth;
    for (var i = 0; i < 300; i++) {
      var sX = imgObj.width / (2 * Math.random() + 1);
      var sY = 100 + imgObj.height * Math.random();
      var sHeight = 100 * Math.random();
      var sWidth = 100 * Math.random();
      var t = new tile(imgObj, sX, sY, sHeight, sWidth);
      tiles.push(t);
    }
    redrawTiles();
  };
  window.addEventListener('mousemove', function (e) {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    globalX = e.clientX - 300;
    globalY = e.clientY - 300;
    redrawTiles();
  });
  imgObj.src = cvs.dataset.src;
};
for (var i = 0; i < cvss.length; i++) {
  _loop();
}
