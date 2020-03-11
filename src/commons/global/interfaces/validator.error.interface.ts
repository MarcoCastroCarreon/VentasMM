export interface ValidatorErrorInterfaceObject {
    target: Object,
    property: string,
    children?: Array<ValidatorErrorInterfaceObject>,
    constraints: Object
}

