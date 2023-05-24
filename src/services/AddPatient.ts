import axios from "axios";

export function AddPatient(patientObj: any) {
    
    const apiCall: Promise<any> = axios.post(
        "http://hapi.fhir.org/baseR4/Patient",
        patientObj
    )
    .then((response) => {
        return response
    })
    .catch(function (error) {
        console.log(error);
    })

    return apiCall
}