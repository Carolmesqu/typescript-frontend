import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { NegociacoesView } from "../views/negociacoes-views.js";
import { MensagemView } from "../views/mensagem-view.js";
import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { logarTempoDeExecucao } from "../decorators/logar-tempo-execucao.js";
import { inspect } from "../decorators/inspect.js";
import { domInjector } from "../decorators/dom-injector.js";
import { NegociacoesService } from "../services/negociacoes-service.js";
import { imprimir } from "../utils/imprimir.js";

export class NegociacaoController {
    /**
     * Estamos colocando o decorator por cima de propriedades dessa ve\z, não de metodo
     * Nós podemos criar decorator de propriedade
     */
    
    @domInjector('#data')
    private inputData: HTMLInputElement;
    @domInjector('#quantidade')    
    private inputQuantidade: HTMLInputElement;
    @domInjector('#valor')

    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');
    private negociacoesService = new NegociacoesService();
   
    constructor() {
        this.negociacoesView.update(this.negociacoes);
    }

    @inspect
    @logarTempoDeExecucao()
    public adiciona(): void {         
        const negociacao = Negociacao.criaDe(
            this.inputData.value, 
            this.inputQuantidade.value,
            this.inputValor.value
        ); 
        if(!this.ehDiaUtil(negociacao.data)) {
            this.mensagemView.update('Apenas negociações em dias úteis são aceitas');
            return ;
        }     
        this.negociacoes.adiciona(negociacao);
        imprimir(negociacao, this.negociacoes);
        this.limparFormulario();
        this.atualizaView();                       
    }

    public importaDados(): void {
        this.negociacoesService
        //Recebemos a negociação do dia
        .obterNegociacoesDoDia()
        //Temos uma lista de negociações já convertida
        .then(negociacoesDeHoje  => {
            //Precisamos filtrar a lista, pois não pode ter negociações que já existem na nossa lista de nagociações
            return negociacoesDeHoje.filter(negociacoesDeHoje => {
                //Para cada iteração do filter temos que retornar verdadeiro ou falso
                return !this.negociacoes
                .lista()
                //Aqui vemos com a lista se tem algum some 
                .some(negociacao => negociacao
                    .ehIgual(negociacoesDeHoje));
                //O some para quando encontra a primeira coisa verdadeira e retorna true (Se for V vai para a lista, se for F não vai)
            });
        })           
        .then(negociacoesDeHoje => {
            for (let negociacao of negociacoesDeHoje) {
                this.negociacoes.adiciona(negociacao);
            }
            this.negociacoesView.update(this.negociacoes);
        });
    }

    private ehDiaUtil(data: Date) {
        return data.getDay() > DiasDaSemana.DOMINGO && data.getDay() < DiasDaSemana.SABADO;
    }

    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso!');
    }
}