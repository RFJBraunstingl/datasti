import DataPoint, {DataType} from "../rest/dtos/DataPoint";

export function RandomData(dataPoints: number = 100): DataPoint[] {
    const max = Math.random() * 1000000;
    return [...Array(dataPoints)].map((e, i) => {
        return new DataPoint(
            DataType.NumberOverNumber,
            Math.random() * max,
            Math.random() * max);
    });
}

export function RandomDateData(dataPoints: number = 31): DataPoint[] {
    const max = Math.random() ;
    return [...Array(dataPoints)].map((e, i) => {
        return new DataPoint(
            DataType.NumberOverDate,
            new Date(2020, 7, i+1),
            Math.random() * 40);
    });
}