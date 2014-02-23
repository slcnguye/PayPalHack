function parseTheShitOutOfIt(str) {
        var lines = str.split("\n");
        console.log("testing");
        var company = lines[0];
        var description = lines[1];
        var index = 2;
        var numIndex = 2;
        var total = 0.0;
        for (var i = 2; i < lines.length; i++) {
            if (lines[i].indexOf('Total') >= 0 || lines[i].indexOf('total') >= 0) {
                index = i;
                var sideCheck = lines[i].split(" ");
                if (sideCheck.length == 1) {
                    sideCheck = lines[i].split("-");
                }
                console.log("I: " + i + " sideCheck: " + sideCheck);
                var fl = parseFloat(sideCheck[sideCheck.length - 1]);
                if ((fl + "").localeCompare('NaN')) {
                    total = fl;
                }
            }
            else {
                var numCheck = lines[i].split(" ");
                console.log("I: " + i + " NumCheckBefore: " + numCheck);
                if (numCheck.length == 1) {
                    numCheck = lines[i].split("-");
                }
                if (numCheck[0].indexOf('.') >= 0) {
                    if ((parseFloat(numCheck[0]) + "").localeCompare('NaN')) {
                        numIndex = i;
                        break;
                    }
                }
            }
        }
    console.log("Index: " + index + " NumIndex: " + numIndex);
        if (total == 0.0) {
            for (i = numIndex; i < 2*numIndex - index +1; i++) {
                numCheck = lines[i].split(" ");
                if (numCheck.length == 1) {
                    numCheck = lines[i].split("-");
                }
                console.log("I: " + i + " NumCheckAfter: " + numCheck);
                if (numCheck[0].indexOf('.') >= 0) {
                    fl = parseFloat(numCheck[0]);
                    if ((fl + "").localeCompare('NaN')) {
                        total = fl;
                    }
                    else {
                        break;
                    }
                }
                else {
                    break;
                }
            }
        }

        var obj = { Price: total, Place: company, Desc: description };
    return obj;
}