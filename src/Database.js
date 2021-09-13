import CryptoJS from "crypto-js";
import crypto from "crypto";
import { MongoClient, ObjectId } from "mongodb";
import credentials from "../credentials.json";
import { Promise } from "es6-promise";

const LANG_NOT_FOUND =
  "Registro no encontrado. Ingresa un ID válido, o problablemente el ID que ingresaste ya fue eliminado.";

/**
 * Clase con funciones y conexiones a la base de datos.
 * @param {function} callbackStartServer Función que se llamará cuando esté lista la conexión.
 */
class Database {
  constructor(callbackStartServer) {
    //Conectamos la base de datos de mongodb
    MongoClient.connect(credentials.mongopath, {
      useUnifiedTopology: true,
    }).then(async (client) => {
      this.client = client;
      console.log("Connected to Database");

      this.db = this.client.db("crypt-me");
      this.coll = this.db.collection("regs"); //Collection

      //Iniciamos el API REST
      callbackStartServer();
    });
  }

  /**
   * Función para añadir un registro a la base de datos
   * @param {string} text Texto en base64 a encriptar
   * @param {string} ip IP del cliente
   * @returns Promesa de mongodb
   */
  async addReg(text, ip) {
    return await new Promise((resolve, reject) => {
      if (!text) {
        return reject('Por favor, envía el texto a encriptar como "text".');
      } else if (!this.isBase64(text)) {
        return reject("Por favor, envía un texto en formato base64.");
      }

      //Obtenemos el key con el que encriptaremos el texto
      const secret = this.generateRandomKey();

      //Encriptamos el texto
      const txtEncripted = this.encrypt(text, secret);

      //Obtenemos la fecha de caducidad
      var dateEnd = new Date();
      //Agregamos un día
      dateEnd.setDate(dateEnd.getDate() + 1);
      dateEnd = dateEnd.getTime();

      //Guardamos en base de datos
      this.coll
        .insertOne({
          ip: this.md5(ip),
          data: txtEncripted,
          end: dateEnd,
        })
        .then((data) => {
          if (data.insertedId) {
            this.systemLog("Creado " + data.insertedId.toString());
            return resolve({
              id: data.insertedId,
              secret: secret,
              end: dateEnd,
            });
          }
          return reject("No se asignó un ID en base de datos.");
        })
        .catch((err) => reject(err));
    });
  }

  /**
   * Función para obtener un contenido
   * @param {string} id ID del registro
   * @param {string} secret Clave para desencriptar el archivo
   * @returns Promesa con el JSON de respuesta
   */
  async getReg(id, secret) {
    return await new Promise((resolve, reject) => {
      if (!id) {
        return reject('Por favor, envía el ID como "id".');
      } else if (!secret) {
        return reject(
          'Por favor, envía la llave de desencriptación como "secret".'
        );
      }

      //Buscamos el registro en base de datos
      let objectId = null;
      try {
        objectId = new ObjectId(id);
      } catch (e) {
        return reject(LANG_NOT_FOUND);
      }
      this.coll
        .findOne({
          _id: objectId,
        })
        .then((data) => {
          //Si obtuvimos algún registro
          if (data && data.data) {
            //Desencriptamos el texto almacenado en BD
            const text = this.decrypt(data.data, secret);
            if (text) {
              //Eliminamos el registro en BD
              this.deleteReg(objectId);

              return resolve({ text: text });
            } else {
              //Por seguridad, eliminaremos el registro para evitar fuerza bruta.
              this.deleteReg(objectId);

              return reject(LANG_NOT_FOUND);
            }
          } else {
            reject(LANG_NOT_FOUND);
          }
        })
        .catch(() => {
          reject(LANG_NOT_FOUND);
        });
    });
  }

  /**
   * Función que elimina un registro de la base de datos
   * @param {ObjectId} objectId ObjectId de MongoDB
   * @returns Promesa con la información de la petición
   */
  async deleteReg(objectId) {
    await this.coll
      .deleteOne({ _id: objectId })
      .then(() => this.systemLog("Eliminado " + objectId.toString()))
      .catch((err) =>
        this.systemLog(objectId.toString() + " no fue eliminado: " + err)
      );
  }

  /**
   * Función que elimina registros que excedieron su vigencia.
   */
  async deleteDueRegs() {
    await this.coll
      .deleteMany({ end: { $lte: Date.now() } })
      .then((data) => {
        if (data.deletedCount > 0) {
          this.systemLog(
            data.deletedCount + " registros borrados automáticamente."
          );
        }
      })
      .catch((err) => console.log(err));
  }

  /**
   * Función para imprimir un log en pantalla.
   * @param {string} text Texto a imprimir
   */
  systemLog(text) {
    console.log(new Date() + ": " + text);
  }

  /**
   * Función que verifica si un texto está encriptado en base64
   * @param {string} str Texto
   * @returns Verdadero o falso
   */
  isBase64(str) {
    var base64regex =
      /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    return base64regex.test(str);
  }

  /**
   * Función que genera una llave aleatoria para encriptar
   * @returns Texto generado
   */
  generateRandomKey() {
    const str = crypto.randomBytes(20).toString("hex") + Date.now();
    return this.md5(str);
  }

  /**
   * Función para encriptar un texto usando un secret
   * @param {string} txtEncripted Texto a encriptar
   * @param {string} key Secret key
   * @returns Texto encriptado
   */
  encrypt(txtEncripted, key) {
    var encrypted = CryptoJS.AES.encrypt(txtEncripted, key, {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.toString();
  }

  /**
   * Función que desencripta un texto
   * @param {string} encrypted Texto encriptado
   * @param {string} key Secret para desencriptar
   * @returns Texto desencriptado
   */
  decrypt(encrypted, key) {
    var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  /**
   * Función para generar un hash de md5
   * @param {string} text Texto a evalúar
   * @returns Hash md5
   */
  md5(text) {
    return CryptoJS.MD5(text).toString();
  }

  /**
   * Función para cerrar la conexión de la base de datos.
   */
  closeConnection() {
    this.client.close();
  }
}

export default Database;
