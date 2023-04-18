//Determinnamos o tipo T de type para view se tornar uma classe generica e as classes que a herdam poderem
//determinar individualmente cada um de seus tipos

import { inspect } from "../decorators/inspect.js";
import { logarTempoDeExecucao } from "../decorators/logar-tempo-execucao.js";

//view é uma classe abstrata, não podemos criar uma instancia diretamente dela.
export abstract class View<T> {
    
    //trabalhando com herança, o modificador protected, funciona de forma 
    //parecida com private, mas as classes de herança os filhos, podem acessar, 
    //todos que herderem vão ter acesso.
    protected elemento: HTMLElement;

    //No escapar inserimos o ? pra tornar esse segundo parametro opcional, o opcioanl só funciona no segundo parametro
    constructor(seletor: string, escapar?: boolean) {
        const elemento = document.querySelector(seletor);
        if (elemento) {
            this.elemento = elemento as HTMLElement;
        } else {
            throw Error(`Seletor ${seletor} não existe no DOM`);
        }       
    }

    @inspect // Depois ele vai ser modificado com inspect, ele roda sobre o metodo que já foi decorato abaixo 
    @logarTempoDeExecucao(true) //Primeiro ele modifica esse decorator     
    public update(model: T): void {        
        let template = this.template(model);      
        this.elemento.innerHTML = template;      
    }

   protected abstract template(model: T): string;
}