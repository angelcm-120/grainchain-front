import { sendmail } from '../Network/Services'

const defaultFrom = '"Equipo de CyC DevOps | Portal" <bazcobranza@bancoazteca.com>'
const defaultSubject = "CyC DevOps | Portal - Notificación"
const defaultTo = "bazcobranza@bancoazteca.com"

const emailObj = {
    from: defaultFrom,
    to: defaultTo,
    subject: defaultSubject,
    body: ""
}

function sendEmail(emailObj, accessToken) {
    if (emailObj.from === undefined) {
        emailObj.from = defaultFrom
    }

    if (emailObj.subject === undefined) {
        emailObj.subject = defaultSubject
    }

    if (emailObj.to === undefined) {
        emailObj.to = defaultTo
    }

    if (emailObj !== undefined && emailObj?.to !== undefined && emailObj?.subject !== undefined && emailObj?.body !== undefined) {
        setTimeout(() => {
            sendmail(emailObj, accessToken)
                .then(res => res.json())
                .then((result) => {
                    if (result.httpstatus === "OK") {
                        //El mensaje fue enviado con éxito

                    } else {
                        //El mensaje no se pudo enviar
                    }

                },
                    (error) => {
                        //Ocurrió un error al enviar el email
                    }
                )
        }, 1000);

    }
}

export {
    emailObj, sendEmail
}