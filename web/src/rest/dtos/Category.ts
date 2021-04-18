// @ts-ignore
import DataOverNumber from "./DataOverNumber";

export default class Category {

    name: string;
    picture_svg: string;

    sub_categories: string[];
    data: DataOverNumber[];


    constructor(name: string, picture_svg: string, sub_categories: string[], data: DataOverNumber[]) {
        this.name = name;
        this.picture_svg = picture_svg;
        this.sub_categories = sub_categories;
        this.data = data;
    }

}