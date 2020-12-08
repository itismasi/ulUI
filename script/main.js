class waterFall {
	constructor(min = "3rem", max = "6rem", scroll = 50) {
		this.element = document.querySelector("#water-fall");
		this.button = this.element.querySelector("*[id$=button]");

		this.minHeight = min;
		this.maxHeight = max;
		this.topSpace = top;
		this.scrollPercentage = scroll;
		this.scrollPoint = innerHeight * this.scrollPercentage / 100;

		window.addEventListener("resize", () => {this.scrollPointer(event)});
		window.addEventListener("scroll", () => {this.scrollListener(event)});

		this.scrollListener();
	}

	fall(value) {
		if (!!this.button) {
			if (this.button.getAttribute("active") == "true") return;
		}
		this.element.style.maxHeight = value;
		this.element.style.height = value;
	}
	
	scrollPointer(event = null) {
		this.scrollPoint = innerHeight * this.scrollPercentage / 100;
	}

	scrollListener(event = null) {
		if (window.scrollY < this.scrollPoint) {
			this.element.setAttribute("zone", "min");
			this.fall(this.minHeight)
		}
		else {
			this.element.setAttribute("zone", "max");
			this.fall(this.maxHeight)
		}
	}
}

class hamburger {
	constructor(width, color = "#212121", prefix = "hamburger") {
		this.button = document.querySelector("#" + prefix + "-button");
		this.button.style.color = color;
		this.drawer = document.querySelector("#" + prefix + "-drawer");
		this.drawer.style.width = width;

		this.width = width;
		this.color = color;
		this.position = 1;

		this.button.addEventListener("click", () => {this.action()});
		this.action();
	}

	valueExport() {
		return (this.position > 0) ? 0 : "-" + width;
	}classExport() {
		if (this.position > 0) {
			this.drawer.setAttribute("active", "true");
			if (!!document.querySelector("#water-fall")) this.drawer.style.height = "calc(100% - " + document.querySelector("#water-fall").offsetHeight + "px)";

			this.button.setAttribute("active", "true");
			this.button.style.background = this.color;

			document.body.style.overflowY = "hidden";
		}else {
			this.drawer.setAttribute("active", "false");

			this.button.setAttribute("active", "false");
			this.button.style.background = "none";

			document.body.style.overflowY = "unset";
		}
	}

	action() {
		this.position = -this.position;
		console.log(this.valueExport());
		this.classExport();
		this.drawer.style.right = this.valueExport();
	}
}



class scrollHelper {
	constructor (selector = true) {
		if (selector === true) {
			this.element = window;
			this.getBounding = () => document.body.getBoundingClientRect();
		}
		else {
			this.element = document.querySelector(selector);
			this.getBounding = () => this.element.getBoundingClientRect();
		}

		this.flag = false;
		window.addEventListener("load", () => {
			this.flag = true;
		});
	}

	EasingFunctions = {
		linear: t => t,
		easeInQuad: t => t*t,
		easeOutQuad: t => t*(2-t),
		easeInOutQuad: t => t<.5 ? 2*t*t : -1+(4-2*t)*t,
		easeInCubic: t => t*t*t,
		easeOutCubic: t => (--t)*t*t+1,
		easeInOutCubic: t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1,
		easeInQuart: t => t*t*t*t,
		easeOutQuart: t => 1-(--t)*t*t*t,
		easeInOutQuart: t => t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t,
		easeInQuint: t => t*t*t*t*t,
		easeOutQuint: t => 1+(--t)*t*t*t*t,
		easeInOutQuint: t => t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t
	}

	scrollTo (endPoint, method = this.EasingFunctions.easeInOutCubic, startVelocity = 2) {
		if(this.flag == false) {
			window.setTimeout(() => {
				this.scrollTo(endPoint, method, startVelocity);
			}, 100);
		} else {
			let bounds = this.getBounding();
			const startedScroll = bounds.top;
			let endVelocity = method(startVelocity);
	
			if (endPoint > bounds.bottom) {
				console.warn("EndPoint out of range");
				return;
			}
	
			const animation = setInterval(() => {
				bounds = this.getBounding();
				if (-bounds.y > endPoint) {
					console.log("Finished Scrolling");
					clearInterval(animation);
				}else {
					endVelocity = method(startVelocity);
					console.log(endVelocity);
					startVelocity = endVelocity;
					this.element.scrollBy(0, 1);
				}
			}, endVelocity);
		}
	}
}

class urlWorker {
	getParameterByName(name, url = window.location.href) {
		name = name.replace(/[\[\]]/g, '\\$&');
		var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}
}