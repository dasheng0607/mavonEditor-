export default function(renderer) {
    /**@type {HTMLCanvasElement} */
    const cvs = renderer.cvs;
    const click = handle("click");
    const mousedown = handle("mousedown");
    const mousemove = handle("mousemove");
    const mouseup=handle("mouseup");
	const touchstart = handle("touchstart");
	const touchmove = handle("touchmove")
	const touchend = handle("touchend")

    cvs.addEventListener("click", click);
    
    cvs.addEventListener("mousedown", mousedown);
    cvs.addEventListener("mousemove", mousemove);
    cvs.addEventListener("mouseup",mouseup);
	cvs.addEventListener("touchstart", touchstart);
	cvs.addEventListener("touchmove", touchmove);
	cvs.addEventListener("touchend", touchend);

    function handle(name) {
        return function(e) {
            const eventList = Array.isArray(renderer.eventsMap[name]);
            if (Array.isArray(renderer.eventsMap[name])) {
                renderer.eventsMap[name].forEach((item, i) => {
                    item(e);
                });
            }
        };
    }

    return function() {
        cvs.removeEventListener("click",click);
        cvs.removeEventListener("mousedown", mousedown);
        cvs.removeEventListener("mousemove", mousemove);
        cvs.removeEventListener("mouseup",mouseup)
		cvs.removeEventListener("touchstart",touchstart);
		cvs.removeEventListener("touchmove",touchmove);
		cvs.removeEventListener("touchend",touchend);
    };
}
