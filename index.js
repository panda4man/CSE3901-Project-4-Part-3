var source;

/* ==== HELPER METHODS TO EVAL EXPRESSION ==== */
function valueOfDigit() {
    var value = source.charAt(0);
    source = source.slice(1, source.length);
    return value;
}

function valueOfDigitSeq() {
    var value = parseFloat(valueOfDigit());
    while (isDigit(source.charAt(0))) {
        value *= 10;
        value += parseFloat(valueOfDigit());
    }
    return value;
}

function valueOfFactor() {
    var value = 0;
    if (source.charAt(0) == '(') {
        source = source.slice(1, source.length);
        value = valueOfExpr();
        source = source.slice(1, source.length);
    } else {
        value = valueOfDigitSeq();
    }
    return value;
}

function valueOfTerm () {
    var value = valueOfFactor();
    while (source.charAt(0) == '*' || source.charAt(0) == '/') {
        var op = source.charAt(0);
        source = source.slice(1, source.length);
        if (op == "*") {
            value *= valueOfFactor();
        } else {
            value /= valueOfFactor();
        }
    }
    return value;
}

function valueOfExpr() {
    var value = valueOfTerm();
    while (source.charAt(0) == '+' || source.charAt(0) == '-') {
        var op = source.charAt(0);
        source = source.slice(1, source.length);
        if (op == "+") {
            value += valueOfTerm();
        } else {
            value -= valueOfTerm();
        }

    }
    return value;
}

function isDigit(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function calculate() {
    var expression = document.getElementById('expression');
    source = expression.value;
    var value = valueOfExpr();
    expression.value = value.toString();
}

/* ==== CALCULATOR BUTTON CONTROLS ==== */
function termCapture(self) {
    var term = self.value;
    var expression = document.getElementById('expression');
    var newExp = expression.value + term;
    expression.value = newExp;
}

function clearOne(self) {
    var expression = document.getElementById('expression');
    var oldExp = expression.value;
    var newExp = oldExp.slice(0, oldExp.length-1);
    expression.value = newExp;
}

function AC(self) {
    document.getElementById('expression').value = '';
}

function memAdd(self) {
    var memory = localStorage.getItem('calc_memory') || 0;
    memory = parseFloat(memory);
    var value = document.getElementById('expression').value;
    if(isDigit(value)) {
        value = parseFloat(value);
        memory += value;
        localStorage.setItem('calc_memory', memory);
        message("Added " + value + " to memory.");
    }
}

function memSub(self) {
    var memory = localStorage.getItem('calc_memory') || 0;
    memory = parseFloat(memory);
    var value = document.getElementById('expression').value;
    if(isDigit(value)) {
        value = parseFloat(value);
        memory -= value;
        localStorage.setItem('calc_memory', memory);
        message("Subtracted " + value + " from memory.");
    }
}

function memClear(self) {
    localStorage.setItem('calc_memory', 0);
    message("Cleared the memory.");
}

function memRecall(self) {
    var expression = document.getElementById('expression');
    var memory = localStorage.getItem('calc_memory') || 0;
    expression.value = expression.value + memory;
}

/* ==== MESSAGE METHODS ==== */
function message(msg) {
    var el = document.getElementById('message');
    el.style.opacity = "0.0";
    setTimeout(function () {
        el.innerHTML = msg;
        el.style.opacity = "1.0";
        setTimeout(function () {
            el.style.opacity = "0.0";
        },2000);
    }, 500);
}
