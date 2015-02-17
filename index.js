var source;

function valueOfDigit() {
    var value = source.charAt(0);
    source = source.slice(1, source.length);
    return value;
}

function valueOfDigitSeq() {
    var value = parseFloat(valueOfDigit());
    while (isDigit(source.charAt(0))) {
        value *= 10;
        value += valueOfDigit();
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

function main() {
    source = document.getElementById('expression').value;
    var value = valueOfExpr();
    console.log(value);
}

main();
