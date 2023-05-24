import axios from "axios";
const baseUrl = "https://fhir.monash.edu/hapi-fhir-jpaserver/fhir";

export function getPatientList(currentPage: number, rowCount: number) {
    const apiCall: Promise<any> = axios.get(
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

    return apiCall;
}

export function getPatientsByName(name: string, currentPage: number, rowCount: number) {
    const apiCall: Promise<any> = axios.get(
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

    return apiCall;
}

export function getPatientById(id: string, currentPage: number, rowCount: number) {
    const apiCall: Promise<any> = axios.get(
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

    return apiCall;
}