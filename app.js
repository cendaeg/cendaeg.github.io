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
    fadeOut(e);
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