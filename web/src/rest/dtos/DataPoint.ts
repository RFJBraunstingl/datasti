export enum DataType {
    NumberOverNumber = 0,
    NumberOverDate = 1
}

export default class DataPoint{
    
    type: DataType;
    x: number | Date;
    y: number;
    sub_category: string;


    constructor(type: DataType, x: number | Date, y: number, sub_category?: string) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.sub_category = sub_category ? sub_category : "";
    }
}