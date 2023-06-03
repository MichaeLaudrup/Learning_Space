

class MyCustomInput extends HTMLInputElement {
    constructor(){
        super(); 
        this._minletters = 3;
        this._mindigits = 2; 
        this._minupper = 1; 
        this._minlower = 1; 
        this._minespecial = 1; 
        this._valid = false; 
        this.addEventListener('input', function(e) {
            this._comprobePasswordIntegrity(); 
        }, {passive: true})
     
        this.setAttribute("valid", "false")
    }

    //Funcion que se ejecuta despues del componente sea insertado en el DOM
    connectedCallback() {
       /*  var shadowRoot = this.attachShadow({mode: 'closed'});
        shadowRoot.innerHTML = `<style>
            :host                       { --fg: #ffffff; --bg: #001e42; --csuccess: #04a904; --cerror: #8f0a0a }
           
            input[valid="false"]      { background: var(--cerror); color: var(--fg); }
            input[valid="true"]      { background: var(--csuccess); color: var(--fg); }
        </style>`; */
    }

    //Se establecen los atributos que se quieren escuchar
    static get observedAttributes() { return ["minletters", "mindigits", "minupper", "minlower", "minespecial", "value"]; }

    //Se establece un comportamiento cada vez que un atributo cambie
    attributeChangedCallback(attrName, oldValue, newValue) {
        if(oldValue != newValue) this["_" + attrName] = newValue;
        this._comprobePasswordIntegrity();  
        

    }

    _comprobePasswordIntegrity() {
        let actualPassword = this.value; 
        let contador = Array.from(actualPassword).reduce( (acumulador, caracter) => {
            if( /[a-zA-Z]/.test(caracter) ){
                acumulador.numLetras++; 
                if(/[a-z]/.test(caracter)) {
                    acumulador.numLower++; 
                }else{
                    acumulador.numMayus++; 
                }
            }else if(/[0-9]/.test(caracter)){
                acumulador.numDigitos++; 
            }else{
                acumulador.numEspeciales++; 
            }
                return acumulador; 
        }, {numLetras : 0, numDigitos: 0, numEspeciales: 0, numMayus: 0, numLower: 0} ); 

        let validCount = 0;
        if(contador.numLetras >= this._minletters) validCount++;
        if(contador.numDigitos >= this._mindigits) validCount++;
        if(contador.numEspeciales >= this._minespecial) validCount++;
        if(contador.numMayus >= this._minupper) validCount++;
        if(contador.numLower >= this._minlower) validCount++;

        this.setAttribute("valid", validCount == 5 ? true: false) ;

    }

    get minletters(){ return this._minletters; }
    set minletters(v){  if(v) this.setAttribute("minletters", v); }

    get mindigits(){ return this._mindigits; }
    set mindigits(v){  if(v) this.setAttribute("mindigits", v); }

    get minespecial(){ return this._minespecial; }
    set minespecial(v){  if(v) this.setAttribute("minespecial", v); }

    get minlower(){ return this._minlower; }
    set minlower(v){  if(v) this.setAttribute("minlower", v); }

    get minupper(){ return this._minupper; }
    set minupper(v){  if(v) this.setAttribute("minupper", v); }

    get valid(){ return this._valid; }
    set valid(v){  if(v) this.setAttribute("valid", v); }


}



export {MyCustomInput}; 