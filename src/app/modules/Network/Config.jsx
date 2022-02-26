const dev_hostname="devcycmovil"
const dev_port="8383"
const dev_protocol="http"
const dev_text="Dev Local"

const cnbv_dev_hostname="dev.cbm.apps.cbz.baz.cloud"
const cnbv_dev_port="8444"
const cnbv_dev_protocol="https"
const cnbv_dev_text="CNBV Dev"

const cnbv_int_hostname="int.cbm.apps.cbz.baz.cloud"
const cnbv_int_port="8444"
const cnbv_int_protocol="https"
const cnbv_int_text="CNBV Int"

const cnbv_qa_hostname="qa.cbm.apps.cbz.baz.cloud"
const cnbv_qa_port="8444"
const cnbv_qa_protocol="https"
const cnbv_qa_text="CNBV QA"

const prod_dmz_hostname="bazstore.com.mx"
const prod_dmz_port="8444"
const prod_dmz_protocol="https"
const prod_dmz_text="Prod DMZ"

const prod_int_hostname="tiendas.bazstore.com.mx"
const prod_int_port="8444"
const prod_int_protocol="https"
const prod_int_text="Prod Int"


const default_body= Buffer.from('peticion={"noEmpleado":"000000","noPlaca":"000000","fecha":"2020-02-04 14:36:00","longitud":19.3093334,"latitud":-99.1870559,"gerencia":{"pais":{"pais":1,"nombrePais":"México"},"region":{"pais":{"pais":1,"nombrePais":"México"},"region":8203,"nombreRegion":"8203 RCR BENITO JUAREZ 1"},"gerencia":9328,"nombreGerencia":"9328 GERENCIA PRUEBA CENTRAL"},"puesto":{"puesto":109,"descripcion":"JEFE DE PORTAFOLIO"},"aplicacion":{"aplicacion":85,"nombre":"VERIFICACION DE CREDITO MOVIL (NVC)","descripcion":"Nuevo sistema de verificacion de credito JVC y Baz Digital"},"dispositivo":{"dispositivo":2},"version":{"versionId":4260,"version":99},"os":"Android","os_version":"1523"}').toString('base64')
const default_auth="logind"
const default_cType="application/x-www-form-urlencoded"
 
export {
    dev_hostname,dev_port,dev_protocol,
    cnbv_dev_hostname,cnbv_dev_port,cnbv_dev_protocol,
    cnbv_int_hostname,cnbv_int_port,cnbv_int_protocol,
    cnbv_qa_hostname,cnbv_qa_port,cnbv_qa_protocol,
    prod_dmz_hostname,prod_dmz_port,prod_dmz_protocol,
    prod_int_hostname,prod_int_port,prod_int_protocol,
    default_body,
    default_auth,
    default_cType,
    dev_text,cnbv_dev_text,cnbv_int_text,cnbv_qa_text,prod_dmz_text,prod_int_text
}