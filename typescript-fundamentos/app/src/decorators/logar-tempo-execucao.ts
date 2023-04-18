/**
 * Decoretor para medir a perfomance de qualquer metodo 
 */

export function logarTempoDeExecucao(emSegundos: boolean = false ) {
    /**
     * O decorator é função abaixo, ele da acesso ao descriptor e o descriptor é o metodo que se jogarmos qualquer coisa no value 
     * ele vai subscrever na classe, nele definimos uma nova função onde guarda o 1 tempo, 2 guarda o retorno original, 3 guardamos 
     * o tempo final e 4 por ultimo exibimos o tempo gasto no console, e damos o retorno do metodo original
     */
    return function(
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        /**
         * Esse metodo é como se fosse desencachar da instancia da classe, e ta colocando dentro de uma variavel que contem referencia 
         * com o metodo
         * 
         */
        const metodoOriginal = descriptor.value;
        /**
         * Abaixo vamos subscrever o comportamento. No array abaixo, fizemos dessa forma para as funções que userem esse decoretor, 
         * consigam utilizar a qtd que tiverem de parametros dela, dessa formas criamos um array que vai receber n parametros.
         * No metodoOriginal utilizamos o apply para chamarmos a execução do metodoOriginal e o apply precisamos passar quais são
         * os contextos e os parametros (metodoOriginal, executa no contexto de THIS é o this do bloco da função descriptor.value
         * e os paramentros são os args do array) 
         */
        descriptor.value = function(...args: Array<any>) {
            let divisor =1;
            let unidade = 'milesegundos';
            if (emSegundos) {
                divisor = 1000;
                unidade = 'segundos';
            }
            const t1 = performance.now();
            //Dentro vamos chamar o metodo original
            const retorno = metodoOriginal.apply(this, args);
            const t2 = performance.now();
            //O nome do metodo conseguimos atraves do propertyKey
            console.log(`${propertyKey}, tempo de execução: ${(t2-t1)/divisor} ${unidade}`);
            retorno
        };

        return descriptor;
    }
}