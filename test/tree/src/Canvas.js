/* global Angel  */
class Canvas {
    // 画布类，控制离屏缓存以及重绘
    init(container, opt = {}){
        let canvas = this.createCanvas(container);
        this.angel = Angel.init(canvas);
        this.repaint = opt.repaint;

        this.bindEvent(canvas);
        return {
            angel: this.angel,
            centerX: this.centerX,
            centerY: this.centerY
        };
    }
    getTranslateX(dom){
        return this.getTranslate(dom, 0);
    }
    getTranslateY(dom){
        return this.getTranslate(dom, 1);
    }
    getTranslate(dom, i){
        let str = dom.style.transform;
        return parseInt(str.match(/(\-)?[\.\d]+/g)[i]);
    }
    setTranslate(dom, x, y){
        dom.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    }
    createCanvas(container){
        let canvas = this.canvas = document.createElement('div'),
            canvasContainer = document.createElement('div');
        container.appendChild(canvasContainer);
        canvasContainer.appendChild(canvas);
        canvasContainer.style.overflow = "hidden";
        canvas.style.position = "relative";
        canvas.style.width = 5 * container.offsetWidth + 'px';
        canvas.style.height = 5 * container.offsetHeight + 'px';
        this.setTranslate(
            canvas,
            -0.4 * canvas.offsetWidth,
            -0.4 * canvas.offsetHeight
        );
        this.width = 5 * container.offsetWidth;
        this.height = 5 * container.offsetHeight;
        this.centerX = 2.5 * container.offsetWidth;
        this.centerY = 2.5 * container.offsetHeight;
        return canvas;
    }
    initCanvasPosition(){
        let canvas = this.canvas;
        this.setTranslate(
            canvas,
            -0.4 * canvas.offsetWidth,
            -0.4 * canvas.offsetHeight
        );
    }
    bindEvent(canvasDom){
        // 绑定画布拖动状态
        let dom = canvasDom,
            isDown = false,
            startX,
            startY,
            domX,
            domY;
        dom.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX;
            startY = e.pageY;
            domX = this.getTranslateX(dom);
            domY = this.getTranslateY(dom);
        });
        dom.addEventListener('mousemove', (e) => {
            if(isDown){
                // 画布拖动
                this.setTranslate(
                    dom,
                    domX + e.pageX - startX,
                    domY + e.pageY - startY
                );
            }
        });

        let dragComplete = () => {
            isDown = false;
            let w = this.width,
                h = this.height,
                x = this.getTranslateX(dom),
                y = this.getTranslateY(dom);
            if(x < -0.6 * w || x > -0.2 * w ||
              y < -0.6 * h || y > -0.2 * y ){
                if(this.repaint){
                    this.centerX += (x + this.width * 0.4);
                    this.centerY += (y + this.height * 0.4);
                    this.initCanvasPosition();
                    this.repaint(this.centerX, this.centerY);
                }
            }
        };
        dom.addEventListener('mouseup', dragComplete);
        dom.addEventListener('mouseout', dragComplete);
    }
}
export default new Canvas();
