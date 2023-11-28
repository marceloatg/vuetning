import type { Ref } from "vue"

export interface ValidationError {
    readonly $propertyPath: string
    readonly $property: string
    readonly $validator: string
    readonly $message: string | Ref<string>
    readonly $params: object
    readonly $pending: boolean
    readonly $response: any,
    readonly $uid: string,
}
