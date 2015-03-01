/* ==== HELPER METHODS TO EVAL EXPRESSION ==== */

function isDigit(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function calculate() {
    var expression = document.getElementById('expression');
    source = expression.value;
    var value = buildExpressionTree(source);
    expression.value = value.toString();
}

/* ==== CALCULATOR BUTTON CONTROLS ==== */
function termCapture(self) {
    var term = self.getAttribute('data-value');
    var expression = document.getElementById('expression');
    var newExp = expression.value + term;
    expression.value = newExp;
}

function clearOne(self) {
    var expression = document.getElementById('expression');
    var oldExp = expression.value;
    var newExp = oldExp.slice(0, oldExp.length - 1);
    expression.value = newExp;
}

function AC(self) {
    document.getElementById('expression').value = '';
}

function memAdd(self) {
    var memory = localStorage.getItem('calc_memory') || 0;
    memory = parseFloat(memory);
    var value = document.getElementById('expression').value;
    if (isDigit(value)) {
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
    if (isDigit(value)) {
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

function sq(){
    var expression = document.getElementById('expression');
    source = expression.value;
    var value = buildExpressionTree(source);
    expression.value = Math.sqrt(value).toString();
}

/* ==== MESSAGE METHODS ==== */
function message(msg) {
    var el = document.getElementById('message');
    el.style.opacity = "0.0";
    setTimeout(function() {
        el.innerHTML = msg;
        el.style.opacity = "1.0";
        setTimeout(function() {
            el.style.opacity = "0.0";
        }, 2000);
    }, 500);
}
