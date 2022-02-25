import { emailObj, sendEmail } from '../../../../app/modules/Email/Client'

export const eMail = (user, ambient, query, error,db) => {
    try {        
        query = query.replace("<p>", "").replace("&nbsp;", "").replace(" <p>", "").replace(" </p>", "\n").replace("</p>", "\n")
        query = query.replace("<p>", "").replace("</p>", "")
        query = query.replace("&gt;", ">")
        query = query.replace("&lt;", "<")

        if ((query?.toString().toLowerCase().includes("delete") ||
            query?.toString().toLowerCase().includes("insert") ||
            query?.toString().toLowerCase().includes("update") ||
            query?.toString().toLowerCase().includes("exec") ||
            query?.toString().toLowerCase().includes("drop") ||
            query?.toString().toLowerCase().includes("create")) || error !== undefined) {
            var emailAux = { ...emailObj }
            if (user.id === 8) {
                emailAux.to = "emorag@elektra.com.mx;"
            }
            else if (user.id === 31) {
                emailAux.to = "vantonio@elektra.com.mx;"
            }
             else {
                emailAux.to = "emorag@elektra.com.mx;legomez@elektra.com.mx,vantonio@elektra.com.mx;eihernandez@elektra.com.mx;mindoval@elektra.com.mx;guillermo.dominguezm@elektra.com.mx;miguel.cabrera@elektra.com.mx"
            }
            emailAux.body = "Se informa que se ha realizado una consulta que generó error o que requiere elevación de permisos con el usuario:  <strong>" + user.email + "</strong> y los siguientes datos:<br/><br/> Query:  <strong>" + Buffer.from(query).toString('base64') + "</strong><br/>Ambiente:  <strong>" + ambient.text + "</strong><br/>DB:  <strong>" + db + "</strong>"
            if (error !== undefined) {
                emailAux.body += "<br/><br/>La consulta se ejecutó y generó el siguiente error: <br/><br/><br/>" + error
            }

           sendEmail(emailAux, user.accessToken)


        }
    } catch (error) {
        //no hace nada
    }

}