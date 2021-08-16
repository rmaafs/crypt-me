import CryptoJS from "crypto-js";
import crypto from "crypto";
import { MongoClient } from "mongodb";
import credentials from "../credentials.json";

export default class Database {
  constructor() {
    //Conectamos la base de datos de mongodb
    MongoClient.connect(credentials.mongopath, {
      useUnifiedTopology: true,
    }).then((client) => {
      this.client = client;
      console.log("Connected to Database");

      this.db = this.client.db("crypt-me");
      this.coll = this.db.collection("regs"); //Collection
    });
  }

  /**
   * Función para añadir un registro a la base de datos
   * @param {string} text
   * @param {string} ip
   * @returns Promesa de mongodb
   */
  async addReg(text, ip) {
    return new Promise(async (resolve, reject) => {
      if (!this.isBase64(text)) {
        reject("Please, send a base64 string.");
        return;
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
      await this.coll
        .insertOne({
          ip: this.md5(ip),
          data: txtEncripted,
          end: dateEnd,
        })
        .then((data) => {
          if (data.insertedId) {
            resolve({ id: data.insertedId, end: dateEnd });
          }
          reject("No se asignó un ID en base de datos.");
        })
        .catch((err) => reject(err));

      /*const txtDecrypted = this.decrypt(txtEncripted, secret);
      console.log("txtDecrypted:", txtDecrypted);*/
    });
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
   * @param {string} encrypted Texto a encriptar
   * @param {string} key Secret key
   * @returns Texto encriptado
   */
  encrypt(encrypted, key) {
    var encrypted = CryptoJS.AES.encrypt(encrypted, key, {
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
   * @param {string} text
   * @returns Hash md5
   */
  md5(text) {
    return CryptoJS.MD5(text).toString();
  }
}
