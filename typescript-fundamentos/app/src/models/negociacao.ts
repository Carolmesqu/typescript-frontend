import { Modelo } from "../interfaces/modelo.js";

export class Negociacao implements Modelo<Negociacao> { 

    constructor(
        private _data: Date,
        public readonly quantidade: number,
        public readonly valor: number
    ) {}

       //Todo metodo estatico podemos chamar diretamente da classe, metodos estaticos sempre public
       public static criaDe(dataString: string, quantidadeString: string, valorString: string): Negociacao {        
        const exp = /-/g;
        const date = new Date(dataString.replace(exp, ','));
        const quantidade = parseInt(quantidadeString);
        const valor = parseFloat(valorString);    
        return new Negociacao(date, quantidade, valor);
    }

    get volume(): number {
        return this.quantidade * this.valor;
    }

    //Fizemos uma programação defensiva na data abaixo, sendo assim qualquer modificação que façam vai ser na copia da data e não na private _data
    get data(): Date {
        const data = new Date(this._data.getTime());
        return this._data;
    }

    public paraTexto(): string {
        
        return `
        Data: ${this.data},
        Quantidade: ${this.quantidade},
        Valor: ${this.valor}
    `;
    } 

    public ehIgual(negociacao: Negociacao): boolean {
        return this.data.getDate() === negociacao.data.getDate()
        && this.data.getMonth() === negociacao.data.getMonth()
        && this.data.getFullYear() === negociacao.data.getFullYear();
    }
} 

/**
 * const o: Imprimivel = new Negociacao(new Date(), 1, 100);
 * 
 * Este é um exemplo que garantimos que atraves do polimorfismo, se o objto herda o Imprimivel, o metodo imprimir vai aceitar e rodar 
 * 
 */