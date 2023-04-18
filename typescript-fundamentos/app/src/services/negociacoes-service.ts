import { NegociacoesDoDia } from "../interfaces/negociacao-do-dia.js";
import { Negociacao } from "../models/negociacao";

export class NegociacoesService {

    public obterNegociacoesDoDia(): Promise<Negociacao[]> {
          /**
         * A fetch vai buscar a informação, é uma operação assincrona, usamos o then, quando ele pegar 
         * a resposta ele vai converter o que estamos recebendo para json e o resultado vão ficar 
         * disponivel na proxima chamado do then
         * 
         * Fizemos uma requisição fetch para o enderço, recebemos os dados e convertemos para json, 
         * recebemos um array do tipo any, pegamos cada negociação de hoje e convertemos o array 
         * em um novo array onde cada dadoDeHoje será convertido para um negociação, e na terceira
         * chamada de then e pegamos cada negociação e adicionamos e quando ele acaba fizemos uma 
         * update pra atualizarmos a view com o dado que veio 
         */       
       return fetch('http://http://localhost:8080/dados')
            .then(res => res.json())
            .then((dados: NegociacoesDoDia[]) => {
                return dados.map(dadoDeHoje => {
                    return new Negociacao(
                        new Date(),
                        dadoDeHoje.vezes,
                        dadoDeHoje.montante);
                });
            });

    }
}