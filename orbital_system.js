function init() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'planets.json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log(xhr.getAllResponseHeaders());
            createSystem(JSON.parse(xhr.responseText), 4)
        }
    }
    xhr.send();
}

function createSystem(system, speed = 1) {

    let canvas = document.querySelector('#system');
    let ctx = canvas.getContext("2d");

    let startTime = Date.now();
    console.log(startTime);

    setInterval(function () {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        system.root.x = canvas.width / 2;
        system.root.y = canvas.height / 2;
        system.root.drawSat();


        createSat(system.root.satellites, system.root)

        function createSat(system, parent) {
            for (sat in system) {
                sat = system[sat];
                sat.x = parent.x + sat.getRelativePositionX();
                sat.y = parent.y + sat.getRelativePositionY();
                sat.drawSat();

                createSat(sat.satellites, sat);
            }
        }
    }, 15);
    function drawName(x, y, text) {
        ctx.font = "10px Arial";
        ctx.fillText(capitalizeFirstLetter(text), x, y);
    }
    Object.prototype.getRelativePositionX = function () {
        return Math.sin(((((Date.now() - startTime) * 0.04) 
            * speed) 
                * (this.reverse ? -1 : 1)) 
                    / this.distance) 
                        * this.distance;
    };

    Object.prototype.getRelativePositionY = function () {
        return Math.cos(((((Date.now() - startTime) * 0.04) 
            * speed) 
                * (this.reverse ? -1 : 1)) 
                    / this.distance) 
                        * this.distance;
    };

    Object.prototype.drawSat = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.diameter, 0, 2 * Math.PI);
        ctx.stroke();
        if (this.color){
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    };
}