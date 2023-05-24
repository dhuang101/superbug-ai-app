import axios from "axios";
const baseUrl = "https://fhir.monash.edu/hapi-fhir-jpaserver/fhir";

export async function getPatientList(currentPage: number, rowCount: number) {
    const result: any = axios.get(
            "https://hapi.fhir.org/baseR4/Patient",
            {params: {
                _sort: "_id",
                _getpagesoffset: currentPage,
                _count: rowCount
            }}
        )
        .then((res) => {
            return res.data.entry;
        })
        .catch((error) => {
            console.log(error);
        });

    return result;
}

export function getPatientsByName(name: string, currentPage: number, rowCount: number) {
    const result: any = axios.get(
            "https://hapi.fhir.org/baseR4/Patient",
            {params: {
                _sort: "_id",
                _getpagesoffset: currentPage,
                _count: rowCount,
                name: name
            }}
        )
        .then((res) => {
            return res.data.entry;
        })
        .catch((error) => {
            console.log(error);
        });

    return result;
}

export async function getPatientById(id: any, currentPage: number, rowCount: number) {
    const result: any = axios.get(
            "https://hapi.fhir.org/baseR4/Patient",
            {params: {
                _sort: "_id",
                _getpagesoffset: currentPage,
                _count: rowCount,
                _id: id
            }}
        )
        .then((res) => {
            return res.data.entry;
        })
        .catch((error) => {
            console.log(error);
        });

    return result;
}