import { BaseOptions, Validator, BaseOptionKeys, BaseOptionRuleOutput } from './type/index'

/**
 * @see https://stackoverflow.com/questions/70815177/typescript-complex-type-inference/70827227#70827227
 */

function Rule<R extends Validator | BaseOptions>(options: R) {
    return {} as { [T in keyof R]: T extends BaseOptionKeys ? BaseOptionRuleOutput[T] : R[T] }
}
