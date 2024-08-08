class formSubmit{
    constructor(settings){
        this.settings = settings;
        this.form = document.querySelector(settings.form);
        this.formButton = document.querySelector(settings.buutton);
        if (this.form) {
            this.url = this.form.getAttribute("action");

        }
    }
    displaySuccess(){
        this.form.innerHTMl = this.settings.success;
    }
    displayError(){
        this.form.innerHTMl =this.settings.error;
    }
    getFormObject(){
        const formObject = {};
        const fields = this.form.querySelectorAll("[name]");
        fields.forEach((field) =>{
            formObject[field.getAttribute("name")] = field.value;
        });
        return formObject;
    }

    async sendForm(){
        try{
        await fetch(this.url,{
            method: "POST",
            headers: {
                "content-type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(this.getFormObject()),
        });
        this.displaySuccess();
    }catch{
        this.displayError();
        throw new Error(error);
    }
}   

    init(){
        if(this.form) this.formButton.addEventListener("click", () =>this.displaySuccess());
    }
}

const formSubmit = new formSubmit({
    form: "[data-form]",
    button: "[data-button]",
    success: "<h1> class='success'>Mensagem enviada! </h1>",
    error: "<h1>class='error'>Não foi possivel enviar sua mesagem.</h1>",
});