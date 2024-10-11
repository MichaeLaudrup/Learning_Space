class MyModalHTMLElement extends HTMLElement {
    constructor() {
        super();
        this.title = "";
        this.width = 0;
        this.height = 0;
        this.innerContent = this.innerHTML;
        this.cssURL = "";
        this.htmlURL = "";
        this.textButtons = "";
        this.jsCodeButtons = "";
        this.styles = undefined;
        this.innerContentMarkup = undefined; //Aqui se almacenara el html del archivo externo, solo el HTML propio del body
    }

    connectedCallback() {
        this.shadow = this.attachShadow({ mode: 'open' });
        console.log(this.shadow);
        this._requestHTMLCssFiles();
    }

    static get observedAttributes() {
        return ['titulo', 'ancho', 'altura', 'css-url', 'inner-content-url', 'text-buttons', "actions-buttons"];
    }
    attributeChangedCallback(attrName, oldValue, newValue) {
        if (oldValue === newValue) return;
        let requestHTML, requestCss = false;
        switch (attrName) {
            case "titulo":
                this.title = newValue;
                break;
            case "ancho":
                this.width = newValue;
                break;
            case "altura":
                this.height = newValue;
                break;
            case "css-url":
                this.cssURL = newValue;
                requestCss = true;
                break;
            case "inner-content-url":
                this.htmlURL = newValue;
                requestHTML = true;
                break;
            case "text-buttons":
                newValue = newValue.trim().slice(1, -1).split(',').map(word => word.trim());
                this.textButtons = newValue;
                break;
            case "actions-buttons":
                newValue = newValue.trim().slice(1, -1).split(',');
                this.jsCodeButtons = newValue
                break;
            default:
        }

        if (this.shadow) { //Si el shadow esta definido significa que no es la primera vez que se ejecuta esta funcion
            if (requestCss) {
                this._renderCss();
            } else if (requestHTML) {
                this._renderHTML();
            } else {
                this._renderCss();
                this._renderHTML();
            }
        }

    }

    _requestHTMLCssFiles() {
        this._getContent(this.cssURL, true);
        this._getContent(this.htmlURL, false);
    }

    _getContent(fileURL, isStyleURL) {
        let thisWebComponent = this;
        let request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                if (isStyleURL) {
                    thisWebComponent.styles = this.responseText;
                    thisWebComponent._renderCss();
                } else {
                    thisWebComponent.innerContentMarkup = this.responseText;
                    thisWebComponent._renderHTML();
                }
            }
        }
        request.open("GET", fileURL, true);
        request.send();
    }

    _renderCss() {
        let styleSheet = new CSSStyleSheet();
        let actualStyle = `:host { --width: ${this.width}; --height:${this.height}}\n` + this.styles;
        styleSheet.replaceSync(actualStyle);
        this.shadow.adoptedStyleSheets = [styleSheet];
    }

    _renderHTML() {
            this.shadow.innerHTML = `
            <div class="main-container">
            <div class="dialog">
                <header>
                    <h1>${this.title}</h1>
                    <span class="close">x</span>
                </header>
                <div class="dialog-body">
                    ${this.innerContentMarkup}
                </div>
                <footer class="dialog-foot">
                    ${this.textButtons.map((textButton,index) => {
                        return `<button class="btn-modal" onclick="window['${this.jsCodeButtons[index].trim()}']()">${textButton}</button>`
                    }).join('')}
                </footer>
        
            </div>
        </div>`;
        this.shadow.querySelector('.close').onclick = function (e){
            shadow.innerHTML = ""; 
        }
        let shadow = this.shadow; 
        this.shadow.querySelector('.close').onclick = function (e){
            shadow.innerHTML = ""; 
        }
    }


}

customElements.define('my-modal', MyModalHTMLElement)

function accept(){
    console.log("Pulsado OK")
}

function cancel(){
    console.log("Pulsado CANCEL")
}