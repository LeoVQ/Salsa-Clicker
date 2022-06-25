document.getElementById("clicker").addEventListener("click", function(event) {
    game.totalClicks++;
    game.addToScore(game.clickValue);

    document.getElementById("clicks").innerHTML = numberformat.format(game.totalClicks);
    document.getElementById("totals").innerHTML = numberformat.format(game.totalScore);
    hi(event);
}, false);

function hi(event) {
    let clicker = document.getElementById("clicker");

    let clickerOffset = clicker.getBoundingClientRect();
    let positon = {
        x: event.pageX - clickerOffset.left + randomNumber(-6, 7),
        y: event.pageY - clickerOffset.top
    };

    let element = document.createElement("div");

    element.textContent = "+" + numberformat.format(game.clickValue);
    element.classList.add("number", "u");
    element.style.left = positon.x + "px";
    element.style.top = positon.y + "px";

    clicker.appendChild(element);

    let movementInterval = window.setInterval(function() {
        if (typeof element == "undefined" && element == null) clearInterval(movementInterval);

        positon.y--;
        element.style.top = positon.y + "px";
    }, 10);

    fadeOut(element, 3000, 0.5, function() {
        element.remove();
    });
}

function fadeOut(element, duration, finalOpacity, callback) {
    let opacity = 1;

    let elementFadingInterval = window.setInterval(function() {
        opacity -= 500 / duration;

        if (opacity <- finalOpacity) {
            clearInterval(elementFadingInterval);
            callback();
        }
    }, 60);

    element.style.opacity = opacity;
}

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}