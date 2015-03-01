/*
 * Adds some keyboard functionality
 */
var evaluated = false;

function getKeyboardInput(input) {

    if (evaluated == true) {
        if ((input > 95 && input < 106) || (input > 47 && input < 58) || input == 110 || input == 190) {
            AC();
        }
        evaluated = false;
    }

    /* check key input */
    if (input == 13) {
        evaluated = true;
        calculate();
    } else if (input == 27) {
        AC();
    } else if (input > 95 && input < 106) {
        keyInput(input - 96);
    } else if (input > 47 && input < 58) {
        keyInput(input - 48);
    } else if (input == 46) {
        clearOne();
    } else if (input == 107) {
        keyInput("+");
    } else if (input == 189) {
        keyInput("-");
    } else if (input == 109) {
        keyInput("-");
    } else if (input == 106) {
        keyInput("*");
    } else if (input == 191) {
        keyInput("/");
    } else if (input == 111) {
        keyInput("/");
    } else if (input == 110) {
        keyInput(".");
    } else if (input == 190) {
        keyInput(".");
    } else if (input == 69) {
        keyInput("^");
    } else if (input == 83) {
        if (event.altKey) {
            sq();
        }
    } else if (input == 187) {
        if (event.shiftKey) {
            keyInput("+");
        }
    } else if (input == 38) {
        if (event.ctrlKey) {
            keyInput("^");
        }
    } else if (input == 56) {
        if (event.shiftKey) {
            keyInput("*");
        }
    }
}


function keyInput(key) {
    var expression = document.getElementById('expression');
    var newExp = expression.value + key;
    expression.value = newExp.toString();
}
