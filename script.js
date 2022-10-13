    /*

    this code is by "tanktot games", its a tutorial of how to make a incremental game, check him out and subscribe to his channel, because he makes this greate tutorial for new people such as myself, he will show how to add buildings, upgrades, achievements, numbers on clicks, etc. you just have to subscribe to his channel, and watch his videos. :D.

    */

    var game = {
    score: 0,
    totalScore: 0,
    totalClicks: 0,
    clickValue: 88,
    version: 1.000,

    addToScore: function(amount) {
        this.score += amount;
        this.totalScore += amount;
        display.updateScore();
    },

    getScorePerSecond: function() {
        var scorePerSecond = 0;
        for (i = 0; i < building.name.length; i++) {
            scorePerSecond += building.income[i] * building.count[i];
        }
        return scorePerSecond;
    }
};

var building = {
    name: [
        "Cursor",
        "Ingredients",
        "Factory"
    ],
    image: [
        "cursor.png",
        "ingredients.png",
        "factory.png"
    ],
    count: [0, 0, 0],
    description: [
        "Cursors make .5 Per Second, This is the default",
        "Ingredients make 9 Per Second, This is the default",
        "factories make 50 Per Second, This is the default"
    ],
    income: [
        .5,
        9,
        50
    ],
    cost: [
        25,
        125,
        1000
    ],

    purchase: function(index) {
        if (game.score >= this.cost[index]) {
            game.score -= this.cost[index];
            this.count[index]++;
            this.cost[index] = Math.ceil(this.cost[index] * 1.10);
            display.updateScore();
            display.updateShop();
            display.updateUpgrades();
        }
    }
};

var upgrade = {
    name: [
        "Better Fingers",
        "v2 Fingers",
        "Better Ingredients",
        "v2 ingredients",
        "Better Factories",
        "v2 factories",
        "Better Clicker",
        "v2 Clicker"
    ],
    description: [
        "Cursors are twice as efficient",
        "Cursors are twice as efficient",
        "ingredients are twice as efficient",
        "ingredients are twice as efficient",
        "factories are twice as efficient",
        "factories are twice as efficient",
        "The mouse is twice as efficient",
        "The mouse is twice as efficient"
    ],
    image: [
        "cursor.png",
        "cursors.png",
        "ingredients.png",
        "in.png",
        "factory.png",
        "pn.png",
        "more.png",
        "hey.png"
    ],
    type: [
        "building",
        "building",
        "building",
        "building",
        "building",
        "building",
        "click",
        "click"
    ],
    cost: [
        100,
        250,
        500,
        750,
        2000,
        10000,
        100,
        1000
    ],
    buildingIndex: [
        0,
        0,
        1,
        1,
        2,
        2,
        -1,
        -1
    ],
    requirement: [
1,
5,
1,
5,
1,
5,
99,
888
    ],
    bonus: [
2,
2,
2,
2,
2,
2,
2,
2
    ],
    purchased: [false, false, false, false, false,false, false, false],

    purchase: function(index) {
        if (!this.purchased[index] && game.score >= this.cost[index]) {
            if (this.type[index] == "building" && building.count[this.buildingIndex[index]] >= this.requirement[index]) {
                game.score -= this.cost[index];
                building.income[this.buildingIndex[index]] *= this.bonus[index];
                this.purchased[index] = true;

                display.updateUpgrades();
                display.updateScore();
            } else if (this.type[index] == "click" && game.totalClicks >= this.requirement[index]) {
                game.score -= this.cost[index];
                game.clickValue *= this.bonus[index];
                this.purchased[index] = true;

                display.updateUpgrades();
                display.updateScore();
            }
        }
    }
};

var achievement = {
    name: [
        "Stone Fingers",
        "Iron Fingers",
        "gold Fingers",
        "Stone Ingredients",
        "Iron ingredients",
        "Stone factories",
        "Iron factories",
        "fingers",
        "FInger lick",
        "Fingers are tired, take a break",
        "back to work, honey",
        "What a great start",
        "You're improving",
        "great progress",
        "Are you okay?"
    ],
    description: [
        "Buy 1 cursor",
        "Buy 10 Cursors",
        "Buy 25 Cursors",
        "Buy 1 ingredient",
        "Buy 10 ingredients",
        "Buy 1 factory",
        "Buy 10 factories",
        "click the salsa 1 time",
        "Click the salsa 10 times",
        "Click the salsa 100 times",
        "Click the salsa 1000 times",
        "have 1 Salsa",
        "have 10 salsa",
        "have 100 Salsa",
        "have 1000 Salsa"
    ],
    image: [
        "cursor.png",
        "cursors.png",
        "ip.png",
        "i.png",
        "ji.png",
        "factory.png",
        "pn.png",
        "more.png",
        "hi.png",
        "2.png",
        "poop.png",
        "example.png",
        "salsa.png",
        "moe.png",
        "mov.png"
    ],
    type: [
        "building",
        "building",
        "building",
        "building",
        "building",
        "building",
        "building",
        "click",
        "click",
        "click",
        "click",
        "score",
        "score",
        "score",
        "score"
    ],
    requirement: [
        1,
        10,
        25,
        1,
        10,
        1,
        10,
        1,
        10,
        100,
        1000,
        1,
        10,
        100,
        1000
    ],
    objectIndex: [
        0,
        0,
        0,
        1,
        1,
        2,
        2,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1
    ],
    awarded: [false, false, false,false, false,false, false, false, false, false, false, false, false],

    earn: function (index) {
        this.awarded[index] = true;
    }
};

var display = {
    updateScore: function() {
        document.getElementById("score").innerHTML = numberformat.format(game.score);
        document.getElementById("scorepersecond").innerHTML = numberformat.format(game.getScorePerSecond());
        document.getElementById("totals").innerHTML = numberformat.format(game.totalScore);
        document.title = numberformat.format(game.score) + " Salsa - Salsa Clicker";
    },

    updateShop: function () {
        document.getElementById("shopContainer").innerHTML = "";
        for (i = 0; i < building.name.length; i++) {
            document.getElementById("shopContainer").innerHTML += '<table class="shopButton" onclick="building.purchase('+i+')"><tr><td id="image"><img src="'+building.image[i]+'" title="'+building.description[i]+' &#10;"></td><td id="nameAndCost">'+building.name[i]+'<p></p><p><span>'+numberformat.format(building.cost[i])+'</span> Salsa</p></td><td id="amount"><span>'+numberformat.format(building.count[i])+'</span></td></tr></table>';
        }
    },
    updateUpgrades: function() {
        document.getElementById("upgradeContainer").innerHTML = "";
        for (i = 0; i < upgrade.name.length; i++) {
            if (!upgrade.purchased[i]) {
                if (upgrade.type[i] == "building" && building.count[upgrade.buildingIndex[i]] >= upgrade.requirement[i]) {
                    document.getElementById("upgradeContainer").innerHTML += '<img src="'+upgrade.image[i]+'" title="'+upgrade.name[i]+' &#10; '+upgrade.description[i]+' &#10; '+numberformat.format(upgrade.cost[i])+'(Salsa)" onclick="upgrade.purchase('+i+')">';
                } else if (upgrade.type[i] == "click" && game.totalClicks >= upgrade.requirement[i]) {
                    document.getElementById("upgradeContainer").innerHTML += '<img src="'+upgrade.image[i]+'" title="'+upgrade.name[i]+' &#10; '+upgrade.description[i]+' &#10; '+numberformat.format(upgrade.cost[i])+'(Salsa)" onclick="upgrade.purchase('+i+')">';
                }
            }
        }
    },
    updateAchievements: function() {
        document.getElementById("achievementContainer").innerHTML = "";
        for (i = 0; i < achievement.name.length; i++) {
            if (achievement.awarded[i]) {
                document.getElementById("achievementContainer").innerHTML += '<img src="'+achievement.image[i]+'" title="'+achievement.name[i]+' &#10 '+achievement.description[i]+'">';
            }
        }
    }
};

function saveGame() {
    var gameSave = {
        score: game.score,
        totalClicks: game.totalClicks,
        totalScore: game.totalScore,
        clickValue: game.clickValue,
        version: game.version,
        buildingCount: building.count,
        buildingIncome: building.income,
        buildingCost: building.cost,
        buildingDescription: building.description,
        upgradePurchased: upgrade.purchased,
        achievementAwarded: achievement.awarded
    };
    localStorage.setItem('gameSave', JSON.stringify(gameSave));
}

function loadGame() {
    var savedGame = JSON.parse(localStorage.getItem('gameSave'));
    if (localStorage.getItem('gameSave') !== null) {
        if (typeof savedGame.score !== "undefined") game.score = savedGame.score;
        if (typeof savedGame.totalScore !== "undefined") game.totalScore = savedGame.totalScore;
        if (typeof savedGame.totalClicks !== "undefined") game.totalClicks = savedGame.totalClicks;
        if (typeof savedGame.clickValue !== "undefined") game.clickValue = savedGame.clickValue;
        if (typeof savedGame.buildingCount !== "undefined") {
            for (i = 0; i < savedGame.buildingCount.length; i++) {
                building.count[i] = savedGame.buildingCount[i];
            }
        }
        if (typeof savedGame.buildingIncome !== "undefined") {
            for (i = 0; i < savedGame.buildingIncome.length; i++) {
                building.income[i] = savedGame.buildingIncome[i];
            }
        }
        if (typeof savedGame.buildingCost !== "undefined") {
            for (i = 0; i < savedGame.buildingCost.length; i++) {
                building.cost[i] = savedGame.buildingCost[i];
            }
        }
        if (typeof savedGame.upgradePurchased !== "undefined") {
            for (i = 0; i < savedGame.upgradePurchased.length; i++) {
                upgrade.purchased[i] = savedGame.upgradePurchased[i];
            }
        }
        if (typeof savedGame.achievementAwarded !== "undefined") {
            for (i = 0; i < savedGame.achievementAwarded.length; i++) {
                achievement.awarded[i] = savedGame.achievementAwarded[i];
            }
        }
        if (typeof savedGame.buildingDescription !== "undefined") {
            for (i = 0; i < savedGame.buildingDescription.length; i++) {
                building.description[i] = savedGame.buildingDescription[i];
            }
        }
    }
}

window.onload = function () {
    loadGame();
    document.getElementById("clicks").innerHTML = numberformat.format(game.totalClicks);
    display.updateScore();
    display.updateUpgrades();
    display.updateAchievements();
    display.updateShop();
}

function resetGame() {
    if(confirm("Are you sure you want to reset your game?")) {
        var gameSave = {};
        localStorage.setItem('gameSave', JSON.stringify(gameSave));
        location.reload();
    }
}

setInterval(function () {
    for (i = 0; i < achievement.name.length; i++) {
        if (achievement.type[i] == "score" && game.totalScore >= achievement.requirement[i]) achievement.earn(i);
        else if (achievement.type[i] == "click" && game.totalClicks >= achievement.requirement[i]) achievement.earn(i);
        else if (achievement.type[i] == "building" && building.count[achievement.objectIndex[i]] >= achievement.requirement[i]) achievement.earn(i);
    }
    display.updateAchievements();
}, 2000);

setInterval(function () {
    display.updateScore();
    display.updateUpgrades();
}, 1000);

setInterval(function () {
    display.updateScore();
    game.score+=game.getScorePerSecond();
    game.totalScore+=game.getScorePerSecond();
}, 1000);

setInterval(function () {
    saveGame();
}, 30000);

document.addEventListener("keydown", function (event){
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        saveGame();
    }
}, false);

document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === 'r') {
        resetGame();
    }
}, false);
