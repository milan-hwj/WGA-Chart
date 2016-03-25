"use strict";
class Tree {
	constructor(data, container){
		let angel = this.angel = Angel.init(container);
		let line = new Angel.Line({
            zlevel: 1,
            style : {
                brushType : 'stroke',
                strokeStyle : 'rgba(200, 0, 0, 1)',
                lineWidth : 1,
                path: [{x: 0, y:0},{x: 100, y:50},{x: 200, y:25}]
            }
        });
        let circle = new Angel.Circle({
            zlevel: 1,
            style : {
            	x: 100,
            	y: 100,
            	r: 30,
                brushType : 'stroke',
                lineWidth : 1
            }
        });
        let bezier = new Angel.BezierCurve({
        	zlevel: 1,
            style : {
            	points: [100, 20, 200, 400, 300, 200, 500, 200],
                brushType : 'stroke',
                lineWidth : 1
            }
        });
        angel.addShape(line);
        angel.addShape(circle);
        angel.addShape(bezier);
        angel.render();

        setInterval(function(){
                bezier.style.points = [
                	100 + Math.random()*10,
                	100 + Math.random()*10,
                	300 + Math.random()*10,
                	200 + Math.random()*10,
                	350 + Math.random()*10,
                	0 + Math.random()*10,
                	500 + Math.random()*10,
                	100 + Math.random()*10
                ];
                angel.modShape(bezier);
                angel.refresh();
            }, 100);
	}
}

new Tree({
	name: 'a',
	parent: {
		name: 'b'
	},
	child: {
		name: 'c'
	}
}, document.getElementById("Main"));