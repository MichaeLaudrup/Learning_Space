// 1: Crear un archivo js con este formato: Una clase con un nombre personalizado que extienda de HTMLElement
// 2: Crear tu identificador personalizado customElements.define("lo-quesea", MyCustomInput);
// 3: Dentro del constructor creamos nuestras variables personalizadas.
// 4: Observar esas variables con static get observedAttributes() { return ["color"]; }



export class MyCustomInput extends HTMLElement {
    constructor(){
        super(); 
        this._color = 'white';  
        this._width = ''; 
        this._height = ''; 
    }

    //Funcion que se ejecuta despues del componente sea insertado en el DOM
    connectedCallback() {
        var shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
                            <style>
                                div {
                                    width:${this._width}; 
                                    height: 500px; 
                                    background-color:grey; 
                                    text-align:center; 
                                }
                                .my-input{
                                    display:inline-block; 
                                    background-color: ${this._color}; 
                                    border-radius: 10px; 
                                    padding: 1rem; 
                                    position:relative; 
                                    top:50%; 
                                    transform:translateY(-50%); 
                                    margin: 0 auto; 
                                    width:60%; 

                                }

                                .my-input input{
                                     width: 80%; 
                                     padding: .25rem;
                                     border: 2px solid black; 
                                }
                            
                            
                            </style>
                            <div>
                                <label class="my-input">
                                    <span>Custom input</span>
                                    <input type="text">
                                </label>
                            </div>
                             `; 
    }

    //Se establecen los atributos que se quieren escuchar
    static get observedAttributes() { return ["color", "width"]; }

    //Se establece un comportamiento cada vez que un atributo cambie
    attributeChangedCallback(attrName, oldValue, newValue) {
        console.log(attrName, oldValue, newValue)
        if(oldValue != newValue) this["_" + attrName] = newValue;
        console.log(this["_" + attrName])
    }

}

customElements.define("lo-quesea", MyCustomInput);