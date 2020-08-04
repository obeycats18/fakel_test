type InferDataActionT<T> = T extends { [key: string]: infer U } ? U : never
export type ActionsType<T extends { [key: string]: any }> = ReturnType<InferDataActionT<T>>