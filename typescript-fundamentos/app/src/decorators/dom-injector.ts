/**
 * Criamos um dom injector que é um decotaror de propriedade, que recebe como parametro o id do elemento do dom, que ele vai buscar e atribuir a propriedade 
 * nesse decorator não temos o descriptor, esse decorator é aplicado assim que a sua classe é declarada, no momento que o ts modificada a classe para gerar 
 * esse decorator
 */

export function domInjector(seletor: string) {
    return function(
        /**
         * Se colocamos o target em uma propriedade estatica de uma classe ele vai retornar a função construtura dessa classa
         * Se colocamos o decorator em uma propriedade que não é estatica, ela vai retornar o prototype da classe 
         * NESSE DECORATOR NÃO VAMOS TER UMA REFERENCIA PARA A INSTANCIA NEGOCIACAO-CONTROLLER
         */
        target: any,
        propertyKey: string) {

            /**
             * Quando o decorator for aplicado na propriedade da classe, vamos transformar essa propriedade em um getter 
             */
            console.log(`Modificando prototype ${target.constructor.name} e adicionando getter para a propriedade ${propertyKey}`);


            /**
             * Resolvemos a questão de cache criando um elemento, quando não houve elemento a primeira vez que acessamos a página e inserimos as informações
             * então ele vai cair no if, após ele fazer essa inclusão a primeira vez, ele passa a cai sempre no else que vai ser o retorno do elemento, pra 
             * o decorator não ficar procurando sempre o elemento como se fosse da primeira vez quando entra na página e insere as informações, ele para de 
             * procurando o elemento do dom toda vez, ele vai buscar agora o que esta em cache
             */
            let elemento: HTMLElement;

            const getter = function() {
                if (!elemento) {
                    elemento = <HTMLElement>document.querySelector(seletor);
                    console.log(`Buscando o elmento do DOM com o seletor ${seletor} para injetar em ${propertyKey}`);
                }

                return elemento;
            }

            /**
             *  Object.defineProperty vai pegar o objeto que define a classe e vamos transformar/adicionar um getter para propriedade propertyKey, ele vai setar no getter 
             * O target é o prototype
             * O propertyKey é a propriedade que queremos modificar 
             * E criamos um get 
             */
            Object.defineProperty(
                target, 
                propertyKey, 
                { get: getter }
            );
        }
}