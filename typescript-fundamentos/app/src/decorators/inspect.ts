/**
 * Quando não houver parametro na função do decorator podemos escrever da forma abaixo
 * Estamos exportando direto a função que é o decorator
 * 
 * QUANDO FAZEMOS COM A FUNÇÃO EXTERNA É PARA QUE POSSAMOS PASSAR PARAMETROS PARA O NOSSO DECORATOR 
 */

    export function inspect(
        /**
         * Se colocamos o decorator target no metodo estatico, target vai ser a função constructor 
         * Se colocarmos ele no metodo que não é estatico, metodo de instancia ele vai ser o prototype por isso colocamos any
         * O descriptor que tem a referencia do nosso metodo
         * O metodo original fica no descriptor.value
         */
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const metodoOriginal = descriptor.value;
        //Passamos para descriptor.value uma função anonima
        descriptor.value = function (...args: any[]) {
            console.log(`--- Método: ${propertyKey}`);
            console.log(`------ Parâmetros: ${JSON.stringify(args)}`);         
            //this é o contexto da novo função que foi adicionada no value
            const retorno = metodoOriginal.apply(this, args);
            console.log(`------ Retorno: ${JSON.stringify(retorno)}`);
            return retorno;
        }
        return descriptor;
    }
