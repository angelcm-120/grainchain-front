export function copyResults (results,event ) {
    
    const containerid = "results"
    if (results !== undefined) {
        window.getSelection().selectAllChildren(document.getElementById(containerid));
        var range = null;
        if (document.selection) {
            range = document.body.createTextRange();
            range.moveToElementText(document.getElementById(containerid));
            range.select().createTextRange();
            document.execCommand("copy");
        } else if (window.getSelection) {
            range = document.createRange();
            range.selectNode(document.getElementById(containerid));
            window.getSelection().addRange(range);
            document.execCommand("copy");

        }
    }
    
}

export  function formatQuery(content,setResults,setisError,setMsjError,user,setQuery,setExecuteHidden,isError) {
    setMsjError(undefined)

    if (isError){
        setResults(undefined)
        setisError(false)
        setMsjError(undefined)
    }
   
    let lines = content.toString().replace("\n", " ").replace("<p>", "").replace("&nbsp;", " ").replace(" <p>", "").replace("<p>&nbsp;</p>", "").split("</p>").filter(function (el) {
        return (el !== "" && el !== "↵<p>&nbsp;" && el !== "<p>&nbsp;</p>" && el !== "↵↵<p>&nbsp;");
    });
   
    setQuery(undefined)
    //Validate insuficient permissions
    let bError = false;
    if (user.roles !== 1) {

        let words = ["delete", "insert", "update", "delete", "drop", "create", "alter", "backup", "exec"]
        words.forEach(word => {
            if (content.toString().toLowerCase().includes(word)) {
                //bError = true
                setMsjError("APP.INQUIRIES.MESSAGES.ALERT.NOTAUTHORIZED")
            }
        })
    }

    //Validate query

    if (lines.length > 0) {

        lines.forEach(line => {
            if (line.toString().toLowerCase().includes('update') && !line.toString().toLowerCase().includes('where')) {
                //bError = true
                setMsjError("APP.INQUIRIES.MESSAGES.ALERT.INVALIDUPDATE")
            }

            if (line.toString().toLowerCase().includes('delete') && !line.toString().toLowerCase().includes('where')) {
                //bError = true
                setMsjError("APP.INQUIRIES.MESSAGES.ALERT.INVALIDDELETE")
            }

            if (line.toString().toLowerCase().includes('select ') && line.toString().toLowerCase().includes('from') && (!line.toString().toLowerCase().includes('where') && !line.toString().toLowerCase().includes('top'))) {
                //bError = true
                setMsjError("APP.INQUIRIES.MESSAGES.ALERT.INVALIDSELECT")
            }

            if (line.toString().toLowerCase().includes('select ') && line.toString().toLowerCase().includes('from') && !line.toString().toLowerCase().includes('nolock')) {
                //bError = true
                setMsjError("APP.INQUIRIES.MESSAGES.ALERT.INVALIDSELECT2")
            }
        })
    }

    let queryaux = content.toString().replace("\n", "")

    while (queryaux.includes("<br />") || queryaux.includes("<p>") || queryaux.includes("</p>") || queryaux.includes("&nbsp;") || queryaux.includes("<p>") || queryaux.includes("<p>") || queryaux.includes("<p>")) {
        queryaux = queryaux.replace("<br />", "\n")
        queryaux = queryaux.replace("<p>", " ")
        queryaux = queryaux.replace("</p>", " ")
        queryaux = queryaux.replace("&nbsp;", " ")
        queryaux = queryaux.replace(" >", ">")
        queryaux = queryaux.replace(" <", "<")
        queryaux = queryaux.replace("< ", "<")
        queryaux = queryaux.replace("> ", ">")
        queryaux = queryaux.replace(" '", "'")
        queryaux = queryaux.replace("' ", "'")
        queryaux = queryaux.replace(" =", "=")
        queryaux = queryaux.replace("= ", "=")
        queryaux = replaceNewLineChars(queryaux, " ")
        queryaux = queryaux.replace("&gt;", ">")
        queryaux = queryaux.replace("&lt;", "<")
        queryaux = queryaux.replace(" &gt;", ">")
        queryaux = queryaux.replace(" &lt;", " <")
    }
    
    queryaux = queryaux.replace("&gt;", " >")
    queryaux = queryaux.replace("&lt;", " <")
    queryaux = queryaux.replace(" &gt;", " >")
    queryaux = queryaux.replace(" &lt;", " <")
    queryaux = queryaux.replace("< ", " <")
    queryaux = queryaux.replace("> ", " >")
    queryaux=queryaux.trimEnd()
    queryaux=queryaux.trimRight()
    //queryaux = decode(queryaux)
    
    if (bError) {
        setisError(true)
        setExecuteHidden(true)
        setQuery(undefined)
    } else if (queryaux?.length > 0) {
        setExecuteHidden(false)
        setQuery(queryaux)
    } else {
        setExecuteHidden(true)
        setQuery(undefined)
    }
}


export const replaceNewLineChars = ((someString, replacementString = '') => { // defaults to just removing
    const TB = `\u{0009}`; // Tab
    const LF = `\u{000a}`; // Line Feed (\n)
    const VT = `\u{000b}`; // Vertical Tab
    const FF = `\u{000c}`; // Form Feed
    const CR = `\u{000d}`; // Carriage Return (\r)
    const CRLF = `${CR}${LF}`; // (\r\n)
    const NEL = `\u{0085}`; // Next Line
    const LS = `\u{2028}`; // Line Separator
    const PS = `\u{2029}`; // Paragraph Separator
    const lineTerminators = [TB, LF, VT, FF, CR, CRLF, NEL, LS, PS]; // all Unicode `lineTerminators`
    let finalString = someString.normalize(`NFD`); // better safe than sorry? Or is it?
    for (let lineTerminator of lineTerminators) {
        if (finalString.includes(lineTerminator)) { // check if the string contains the current `lineTerminator`
            let regex = new RegExp(lineTerminator.normalize(`NFD`), `gu`); // create the `regex` for the current `lineTerminator`
            finalString = finalString.replace(regex, replacementString); // perform the replacement
        };
    };
    return finalString.normalize(`NFC`); // return the `finalString` (without any Unicode `lineTerminators`)
});