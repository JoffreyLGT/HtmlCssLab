// This component display a random image.
// The images are given to the component as attributes:
// first, second, third, forth, fifth

class RandomImg extends HTMLElement {
  constructor() {
    super();

    var shadow = this.attachShadow({ mode: "open" });

    var imgList = [];
    if (this.hasAttribute("first")) {
      imgList.push(this.getAttribute("first"));
    }
    if (this.hasAttribute("second")) {
      imgList.push(this.getAttribute("second"));
    }

    if (this.hasAttribute("third")) {
      imgList.push(this.getAttribute("third"));
    }

    if (this.hasAttribute("forth")) {
      imgList.push(this.getAttribute("forth"));
    }

    if (this.hasAttribute("fifth")) {
      imgList.push(this.getAttribute("fifth"));
    }

    const width = this.hasAttribute("width")
      ? this.getAttribute("width")
      : "100px";

    const height = this.hasAttribute("height")
      ? this.getAttribute("height")
      : "100px";

    var imgNumber = Math.floor(Math.random() * imgList.length + 1);
    var img = document.createElement("img");
    img.setAttribute("src", "./img/" + imgNumber + ".jpg");

    var style = document.createElement("style");
    style.textContent = "img{width:" + width + "; height:" + height + ";}";

    shadow.appendChild(style);
    shadow.appendChild(img);
  }
}

customElements.define("random-img", RandomImg);
