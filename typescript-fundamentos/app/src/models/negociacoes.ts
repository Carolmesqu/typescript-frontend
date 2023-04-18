
import { Modelo } from "../interfaces/modelo.js";
import { Negociacao } from "./negociacao.js";

export class Negociacoes implements Modelo<Negociacoes> {
    
    /**
     * private negociacoes: Array<Negociacao> = [];
     * Podemos escrever da forma acima ou abaixo
     */
    
    private negociacoes: Negociacao[] = [];

    public adiciona(negociacao: Negociacao) {
        this.negociacoes.push(negociacao);
    }

    /** 
     *   lista(): ReadonlyArray<Negociacao> {
     *   return this.negociacoes;
     *   }
     * Podemos escrever da forma acima ou abaixo
     * readonly é somente leitura
     */

    public lista(): readonly Negociacao[] {
        return this.negociacoes;
    }

    public paraTexto(): string {
       return JSON.stringify(this.negociacoes, null, 2);
    }

    /**
     * Na hora que implementar o nosso comparavel, estamos dizendo que esse parametro é do tipo generico      
     */
    public ehIgual(negociacoes: Negociacoes): boolean {
        return JSON.stringify(this.negociacoes) === JSON.stringify(negociacoes.lista());
    }
}
