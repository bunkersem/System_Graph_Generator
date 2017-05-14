function init(){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'sats.json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log(xhr.getAllResponseHeaders());
            createSystem(JSON.parse(xhr.responseText))
        }
    }



    xhr.send();
}

function createSystem(system, names = true, rootName, vertical = false) {

    const xMult = 2;
    const yMult = 2;
    const rMult = 3;

    let canvas = document.querySelector('#system');

    let ctx = canvas.getContext("2d");


    createSatelliteContent(system.root, !vertical, 20 + getSchemeRadius(system.root.diameter) * 0.5, 20 + getSchemeRadius(system.root.diameter) * 0.5, rootName);

    function createSatelliteContent(system, scope, x, y, name="") {

        console.log(system);

        drawSat(x, y, system.diameter);
        if (names){
            drawName(x + (scope & 1 ? getSchemeRadius(system.diameter) + 10 : 0) - 6, 
                y - (!(scope & 1) ? getSchemeRadius(system.diameter) + 4 : 0) + 1,
                name);
        }
        y += !(scope & 1) ? getSchemeRadius(system.diameter)/5 : 0;

        for (sat in system.satellites) {
            !(scope & 1)
                ? y += 10 + getSchemeRadius(system.satellites[sat].diameter)/2 + getSchemeRadius(system.diameter)/2
                : x += 50

            createSatelliteContent(system.satellites[sat], scope + 1, x, y, sat);
        }
    }

    function drawSat(x, y, radius) {
        ctx.beginPath();
        ctx.arc(x * xMult, y * yMult, getSchemeRadius(radius), 0, 2 * Math.PI);
        ctx.stroke();
    }
    function drawName(x, y, text) {
        ctx.font = "10px Arial";
        ctx.fillText(capitalizeFirstLetter(text), x * xMult, y * yMult);
    }
    function getSchemeRadius(diameter) {
        return (Math.sqrt(diameter) * 0.01) * rMult
    }
}


/*
{
    "root":{
        "diameter":"n",
        "satellites":{
            -,
            -,
            -

        }
    }
}


*/

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}