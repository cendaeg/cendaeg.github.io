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
