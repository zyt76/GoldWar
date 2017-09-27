/**
 * 根据在一个范围内变化的数值,控制概率线性变化
 * @param {*数值变化初始值} firstNum 
 * @param {*数值变化末尾值} lastNum 
 * @param {*概率变化初始值} firstProbability 
 * @param {*概率变化末尾值} lastProbability 
 * @param {*变化的数值} numX 
 */
function probabilityDistribution(firstNum, lastNum, firstProbability, lastProbability, numX) {
    var newProbability = 0;
    if (firstProbability == lastProbability) {
        return firstProbability;
    }
    newProbability = numX - firstNum;
    newProbability = newProbability / (lastNum - firstNum);
    newProbability = newProbability * (lastProbability - firstProbability);
    newProbability = newProbability + lastProbability;
    return newProbability;
}
var colorObj = {
    yellow: {
        probability:probabilityDistribution(2000, 800, 0.8, 0.1, disappearTime),
        fn:yellowFn },
    black: {
        probability:probabilityDistribution(2000, 800, 0.1, 0.5, disappearTime),
        fn:blackFn},
    red: {
        probability:probabilityDistribution(2000, 800, 0.03, 0.17, disappearTime),
        fn:redFn},
    orange: {
        probability:probabilityDistribution(2000, 800, 0.03, 0.03, disappearTime),
        fn:orangeFn},
    green: {
        probability:probabilityDistribution(2000, 800, 0.04, 0.2, disappearTime),
        fn:greenFn}
}
/**
 * 根据传入的金币json对象,随机生成金币,并以相应初始化函数初始化金币对象
 * @param {*金币json对象} colorObj 
 */
function colorProbability(colorObj) {
    var randomNum = Math.random();
    var minProbability = 0;
    var maxProbability = 1;
    for (var color in colorObj) {
        var probability = colorObj[color]['probability'];
        maxProbability = probability;
        if (randomNum < maxProbability && randomNum >= minProbability && colorObj[color].fn) {
            colorObj[color].fn();
        }
        minProbability = maxProbability;
    }
}
/**
 * 各色金币特性的初始化函数
 */
function yellowFn() { }
function blackFn() { }
function redFn() { }
function orangeFn() { }
function greenFn() { }
/**
 * 金币标准初始化函数
 * 
 */
function goldInit(obj) {
    var newBox = document.createElement("div");
    newBox.colorObj = {
        yellow: {
            probability:probabilityDistribution(2000, 800, 0.8, 0.1, disappearTime),
            fn:yellowFn },
        black: {
            probability:probabilityDistribution(2000, 800, 0.1, 0.5, disappearTime),
            fn:blackFn},
        red: {
            probability:probabilityDistribution(2000, 800, 0.03, 0.17, disappearTime),
            fn:redFn},
        orange: {
            probability:probabilityDistribution(2000, 800, 0.03, 0.03, disappearTime),
            fn:orangeFn},
        green: {
            probability:probabilityDistribution(2000, 800, 0.04, 0.2, disappearTime),
            fn:greenFn}
    }
    newBox.className = "pee";
    newBox.innerHTML = "$";
    bind(newBox, "click", function () { goldPee(1) });
    bind(newBox, "click", seduce);
    bind(newBox, "click", addCombo);
    obj.appendChild(newBox);
    var maxSpeed = 10;
    var speedX = getSpeed(maxSpeed)[0];
    var speedY = getSpeed(maxSpeed)[0];
    fly(newBox,speedX,speedY,goldDistanceLimits(oBox, newBox));
}
/**
 * 金币点击后弹出金币个数控制函数
 * 
 */
function goldPee(times) {
    for (var i = 0; i < times; i++) {
        pee();
    }
}
/**
 * 输出金币飞行范围函数
 * @param {*吐金币按钮} oBox 
 * @param {*金币对象} gold
 */
function goldDistanceLimits(oBox, gold) {
    var clientW = 0;
    var clientH = 0;
    var limitLeft = 0;
    var limitRight = 0;
    var limitTop = 0;
    limitLeft = - ((getClientArea()[0] / 2) - (parseInt(getStyle(oBox,"width")) / 2) - (parseInt(getStyle(gold,"width")) / 2));
    limitRight = (getClientArea()[0] / 2) + (parseInt(getStyle(oBox,"width")) / 2 - (parseInt(getStyle(gold,"width")) / 2));
    limitTop = -(getClientArea()[1] - parseInt(getStyle(oBox,"height")) - (parseInt(getStyle(gold,"height")) / 2) + 18);
    return [limitLeft,limitRight,limitTop];
}
/**
 * 获取可视区大小函数
 * @param {*} ev 
 */
function getClientArea(ev) {
    ev = ev || event;
    var clientW = 0;
    var clientH = 0;
    clientW = document.documentElement.clientWidth;
    clientH = document.documentElement.clientHeight;
    return [clientW,clientH];
}
/**
 * 
 * @param {*需要飞行的对象} obj 
 */
function fly(obj,speedX,speedY,arrLimits) {
    var timer = null;
    timer = setInterval(function () {
        obj.style.left = parseInt(getStyle(obj,"left")) + speedX + "px";
        obj.style.top = parseInt(getStyle(obj,"top")) - speedY + "px";
        if (
            parseInt(getStyle(obj,"left")) <= arrLimits[0] ||
            parseInt(getStyle(obj,"left")) >= arrLimits[1] ||
            parseInt(getStyle(obj,"top")) <= arrLimits[2]
        ) {
            if (parseInt(getStyle(obj,"left")) <= arrLimits[0]) {
                parseInt(getStyle(obj,"left")) = arrLimits[0];
            } else if (parseInt(getStyle(obj,"left")) >= arrLimits[1]) {
                parseInt(getStyle(obj,"left")) = arrLimits[1];
            } else {
                parseInt(getStyle(obj,"top")) = arrLimits[2];
            }
            clearInterval(timer);
            timer = setTimeout(function () {
                obj.parentNode.removeChild(obj);
            },2000);
        }
    },10);
}
function getSpeed(maxSpeed) {
    var speedX = Math.round(Math.random() * maxSpeed * 2) - 10;
    var speedY = Math.round(Math.random() * maxSpeed);
    return [speedX,speedY];
}
/**
 * 游戏主体函数
 * @param {*} e 
 */





















 
// function pee(e) {
//     e = e || event;
//     countEnd++;
//     var timer = null;
//     var newBox = document.createElement("div");
//     var trueDisappearTime = 0;
//     trueDisappearTime = disappearTime;
//     newBox.className = "pee";
//     // newBox.style.boxShadow = "2px 3px 5px rgba(0, 0, 0, 0,8)";
//     // newBox.style.background = "none";
//     // newBox.style.backgroundColor = "yellow";
//     // newBox.style.zIndex = "1000";
//     var times = 1;
//     bind(newBox, "click", function () {
//         for (var i = 0; i < times; i++) {
//             pee();
//             // addCombo();
//         }
//     });

//     bind(newBox, "click", addCombo);
//     bind(newBox, "click", seduce);
//     oBox.appendChild(newBox);
//     // bind(newBox, "click", addCombo);
//     var speedX = 0;
//     var speedY = 0;
//     var maxY;
//     var maxX;
//     // pee();
//     speedY = Math.ceil(10 * Math.random());
//     speedX = Math.ceil(10 * Math.random()) - 5;

//     // 控制各色金币出现概率-----------------------------------------------------------------------------
//     var colorObj = {
//         yellow: {
//             probability: probabilityDistribution(2000, 800, 0.8, 0.1, disappearTime),
//             fn: yellowFn
//         },
//         black: {
//             probability: probabilityDistribution(2000, 800, 0.1, 0.5, disappearTime),
//             fn: blackFn
//         },
//         red: {
//             probability: probabilityDistribution(2000, 800, 0.03, 0.17, disappearTime),
//             fn: redFn
//         },
//         orange: {
//             probability: probabilityDistribution(2000, 800, 0.03, 0.03, disappearTime),
//             fn: orangeFn
//         },
//         green: {
//             probability: probabilityDistribution(2000, 800, 0.04, 0.2, disappearTime),
//             fn: greenFn
//         }
//     }
//     var probabilityMax = 2000;
//     var numRandom = Math.random() * 1000;
//     if (disappearTime < 1200) {
//         numRandom = Math.random() * 160;
//     } else if (disappearTime < 1500) {
//         numRandom = Math.random() * 250;
//     } else if (disappearTime < 1800) {
//         numRandom = Math.random() * 500;
//     }
//     if (numRandom < 100) {
//         newBox.style.backgroundColor = "black";
//         newBox.style.color = "white";
//         times = 2;
//     } else if (numRandom >= 100 && numRandom < 120) {
//         newBox.style.backgroundColor = "red";
//         newBox.style.color = "white";
//         newBox.style.border = "1px solid black";
//         newBox.style.opacity = 0.3;
//         times = 5;
//     } else if (numRandom < 125) {
//         newBox.style.backgroundColor = "orange";
//         times = 1;
//         if (trueDisappearTime < 1500) {
//             trueDisappearTime = 1500;
//         }
//     } else if (numRandom < 145) {
//         newBox.style.backgroundColor = "green";
//         trueDisappearTime = 5000;
//     }
//     if (e && e.target.style.backgroundColor == "orange") {
//         if (addOneMore.isFirst) {
//             addOneMore();
//             oHelpDisappearTime.getElementsByTagName("span")[0].innerHTML = Math.floor(disappearTime) / 1000 > 0 ? Math.floor(disappearTime) / 1000 : 0;
//             e.target.style.backgroundColor = "yellow";
//         }
//         addOneMore.isFirst = false;
//     }

//     newBox.innerHTML = "$";
//     // oNumber.innerHTML = "$";

//     maxY = Math.ceil(document.documentElement.clientHeight * Math.random() + 100);
//     timer = setInterval(function () {
//         newBox.style.left = parseInt(getStyle(newBox, "left")) + speedX + "px";
//         newBox.style.top = parseInt(getStyle(newBox, "top")) - speedY + "px";
//         console.log(disappearTime);
//         // 显示金币可在桌面上停留的时间
//         oHelpDisappearTime.getElementsByTagName("span")[0].innerHTML = Math.floor(disappearTime) / 1000 > 0 ? Math.floor(disappearTime) / 1000 : 0;
//         if (parseInt(getStyle(newBox, "top")) <= -maxY) {
//             clearInterval(timer);
//             timer = setTimeout(function () {
//                 oBox.removeChild(newBox);
//                 countEnd--;
//                 addOneMore.isFirst = true;
//                 if (countEnd <= 1) {
//                     // alert("游戏结束");
//                     if (oneMorechance > 0) {
//                         oneMorechance--;
//                         oOneMoreChance.getElementsByTagName("span")[0].innerHTML = oneMorechance;
//                         for (var i = 0; i < 5; i++) {
//                             pee();
//                             addCombo();
//                         }
//                         return;
//                     }
//                     // 游戏出口---------------------------------------------------------------
//                     // 重置开始---------------------------------------------------------------
//                     ending();
//                 }
//             }, trueDisappearTime)
//         }
//     }, 10)
// }