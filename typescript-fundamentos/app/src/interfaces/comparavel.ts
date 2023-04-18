/**
 * Estamos utilizando uma interface para obrigar o desenvolvedor a implementar um metodo de comparação 
 * e ao mesmo tempo estamos utilizando o generic para dizer qual é o tipo recebido como parametro na
 * comparação, a combinação de interface com generics deixa o código bem flexivel 
 */

export interface Comparavel<T> {
    ehIgual(objeto: T): boolean;
}