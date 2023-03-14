export interface adressAPiResultModel {
    features : adressPropertiesModel[]
}

export interface adressPropertiesModel {
    properties : adressModel
}

export interface adressModel {
    label : string,
    type: string,
    name: string,
    postcode: string,
    city: string,
    context: string,
    street: string,
}