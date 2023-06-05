import axios from "axios";

export function getMedResById(id: any) {
    const result: any = axios
        .get(
            `https://hapi.fhir.org/baseR4/MedicationRequest?patient=${id}&_format=json&_pretty=true`
        )
        .then((res) => {
            return res;
        })
        .catch((error) => {
            console.log(error);
        });

    return result;
}

export function getDiaRptById(id: any) {
    const result: any = axios
        .get(
            `https://hapi.fhir.org/baseR4/DiagnosticReport?patient=${id}&_format=json&_pretty=true`
        )
        .then((res) => {
            return res;
        })
        .catch((error) => {
            console.log(error);
        });

    return result;
}

export function getAllergyById(apiUrl: string, id: any) {
    const apiCall: Promise<any> = axios.get(
        `${apiUrl}AllergyIntolerance`,
        {params: {
            patient: id
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

export function getObservationById(id: any) {
    const result: any = axios
        .get(
            ` https://hapi.fhir.org/baseR4/Observation?patient=${id}&_pretty=true&_count=36`
        )
        .then((res) => {
            return res;
        })
        .catch((error) => {
            console.log(error);
        });

    return result;
}