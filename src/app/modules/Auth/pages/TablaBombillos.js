import React, { useState } from "react";
import { getIluminacionBombillos } from "../_redux/bombillosCrud";
import { BombillosTabla } from "../../../../../src/app/modules/Auth/pages/BombillosTabla";

function BombillosContent(props) {
  const [bombillos, setBombillos] = useState([]);
  const [totalBombillos, setTotalBombillos] = useState(0);

  function getBombillos(event) {
    getMatrizIluminacion()
  }

  const getMatrizIluminacion = () => {
    setTimeout(() => {
      try {
        getIluminacionBombillos()
          .then((res) => res.json())
          .then(
            (result) => {
              if (result?.resultado?.length > 0) {
                setBombillos(result.resultado)
                let total = 0
						    result.resultado.map((fila) => {
                  	fila = fila.split('')
						        fila.map((col) => {
                      if(col === "3") {
                        total += 1
                      }
                    })

                })
                setTotalBombillos(total)
              } else {
                setBombillos([])
              }
            },
            (error) => {
              console.log(error)
            }
          );
      } catch (Exception) {
        console.log('500')
      }
    }, 500);
  };

  return (
    <div >
      {/* begin::Head */}
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">
          Optimización de bombillos
        </h3>
      </div>
      {/* end::Head */}

      {bombillos?.length > 0 &&
        <div>
          <div>
            <div>
              {bombillos?.length > 0 && <BombillosTabla data={bombillos} />}
            </div>
            <div>
              <h5>Total de bombillos: {totalBombillos}</h5>
            </div>
          </div>
          <button
            id="kt_login_signin_submit"
            type="button"
            onClick={getBombillos}
            className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
          >
            <span>Generar Matriz</span>
          </button>
        </div>
      }
      {bombillos?.length === 0 &&
        <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
          <button
            id="kt_login_signin_submit"
            type="button"
            onClick={getBombillos}
            className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
          >
            <span>Generar Matriz</span>
          </button>
        </div>
      }
    </div>
  );
}

export default BombillosContent;
