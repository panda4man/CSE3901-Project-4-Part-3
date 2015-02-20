/*
 * Adds some keyboard control functionality
 */

var evaluated = false;

function getKeyboardInput(input) {

    if (evaluated == true) {
        if ((input > 95 && input < 106) || (input > 47 && input < 58) || input == 110 || input == 190) {
            AC();
        }
        evaluated = false;
    }


    if (input == 13) {
        evaluated = true;
        calculate();
    } else if (input == 27) {
        AC();
    }

}
