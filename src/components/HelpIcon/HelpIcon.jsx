import React from "react";
import Tooltip from "@material-ui/core/Tooltip";

const HelpIcon = (props) => {
  const color = "#ccd6f6";

  const getIcon = () => {
    return (
      <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 512 512"
        //style="enable-background:new 0 0 512 512;"
        style={{
          width: "21px",
          position: "absolute",
          top: "7px",
          cursor: "pointer",
        }}
        space="preserve"
      >
        <g>
          <g>
            <g>
              <circle fill={color} cx="256" cy="378.5" r="25" />
              <path
                fill={color}
                d="M256,0C114.516,0,0,114.497,0,256c0,141.484,114.497,256,256,256c141.484,0,256-114.497,256-256
				C512,114.516,397.503,0,256,0z M256,472c-119.377,0-216-96.607-216-216c0-119.377,96.607-216,216-216
				c119.377,0,216,96.607,216,216C472,375.377,375.393,472,256,472z"
              />
              <path
                fill={color}
                d="M256,128.5c-44.112,0-80,35.888-80,80c0,11.046,8.954,20,20,20s20-8.954,20-20c0-22.056,17.944-40,40-40
				c22.056,0,40,17.944,40,40c0,22.056-17.944,40-40,40c-11.046,0-20,8.954-20,20v50c0,11.046,8.954,20,20,20
				c11.046,0,20-8.954,20-20v-32.531c34.466-8.903,60-40.26,60-77.469C336,164.388,300.112,128.5,256,128.5z"
              />
            </g>
          </g>
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
      </svg>
    );
  };

  return (
    <div style={{ textAlign: "right", maxWidth: props.maxWidth || "280px" }}>
      <Tooltip
        title={
          <div
            style={{
              fontSize: "12px",
              fontFamily: "rubik, sans-serif",
              fontWeight: "normal",
            }}
          >
            👋 El texto que quieras compartir, será encriptado antes de mandarlo
            a nuestros servidores y también lo estará en nuestras bases de
            datos.
            <br />
            Esto significa que solo tú sabrás el contenido.
            <br />
            <br />
            <b>🔒 Por tu seguridad:</b>
            <ul>
              <li>
                📋 Sólo se podrá consultar una vez el texto, así que asegúrate
                que copien el contenido una vez abierto, ya que borramos tu
                registro en nuestras bases de datos después de consultarlo.
              </li>
              <li>
                👮‍♀️ Si intentan consultar tu texto sin la contraseña correcta,
                será eliminado tu registro de nuestras bases de datos para
                evitar fuerza bruta.
              </li>
              <li>
                ⌛ Si tu contenido no fue consultado en menos de 24 horas, será
                eliminado.
              </li>
              <li>
                🔑 Cuando nosotros encriptamos tu contenido, generaremos una{" "}
                <b>llave</b> aleatoria que te compartiremos.
                <br />
                La llave es la responsable de encriptar tu contenido, por lo que
                si intentan desencriptarla con una llave incorrecta, el
                contenido no será el real.
                <br />
                <b>📢 Nosotros no guardamos la llave.</b>
              </li>
            </ul>
            💻 Si eres desarrollador, revisa la consola para ver el repositorio
            en GitHub y la manera en que puedes integrar tus proyectos a nuestra
            API REST. 🤓
          </div>
        }
        arrow
      >
        {getIcon()}
      </Tooltip>
    </div>
  );
};

export default HelpIcon;
