/**
 * Uma classe, ela só pode estender uma outra classe, não existe herança multipla em ts, 
 * mas uma interface ela pode estender quantas outras interfaces ela quiser na aplicação
 */

import { Imprimivel } from "../utils/imprimivel.js";
import { Comparavel } from "./comparavel.js";


/**
 * A interface objeto vai receber como parametro T e o Comparavel vai receber o T passado
 * pela interface objeto. Criamos uma interface que estende uma ou mais interfaces 
 */
export interface Modelo<T> extends Imprimivel, Comparavel<T>  {
    
}