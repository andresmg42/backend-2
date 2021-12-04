import bcrypt from "bcryptjs";
import crypto from "crypto-js";

export const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};
export const maxRoll = (userPermission) => {
  if(userPermission.superAdmin.access) return { name: "superAdmin", value: 100 }
  else if(userPermission.admin.access) return { name: "admin", value: 90 }
  else if(userPermission.manager.access) return { name: "gerente", value: 80 }
  else if(userPermission.humanTalent.access) return { name: "talentoHumano", value: 60 }
  else if(userPermission.leader.access) return { name: "lider", value: 50 }
  else if(userPermission.technical.access) return { name: "tecnico", value: 40 }
  else if(userPermission.logistic.access) return { name: "logistica", value: 30 }
  else if(userPermission.commercial.access) return { name: "comercial", value: 20 }
  else if(userPermission.client.access) return { name: "cliente", value: 10 }
  else return { name: "Basico", value: 0 }
  
}
export const matchPassword = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (e) {
    console.log(e);
  }
};

export const  permissionInit ={
    user:{ access:false, PUT:false, DELETE:false, POST:false},
    companies:{ access:false, PUT:false, DELETE:false, POST:false},
    employes:{ access:false, PUT:false, DELETE:false, POST:false},
    client:{ access:false, PUT:false, DELETE:false, POST:false}, 
    commercial:{ access:false, PUT:false, DELETE:false, POST:false},
    logistic:{ access:false, PUT:false, DELETE:false, POST:false},
    technical:{ access:false, PUT:false, DELETE:false, POST:false},
    leader:{ access:false, PUT:false, DELETE:false, POST:false},
    humanTalent: { access:false, PUT:false, DELETE:false, POST:false},
    manager:{ access:false, PUT:false, DELETE:false, POST:false},
    admin:{ access:false, PUT:false, DELETE:false, POST:false},
    superAdmin: { access:false, PUT:false, DELETE:false, POST:false}
   
}  

export const encodeUserPermission =  (JSONRoles, key) => {
  return crypto.AES.encrypt(JSON.stringify(JSONRoles), key).toString();

};

export const decodeUserPermission =  (encryptedRoles, key) => {
  return  JSON.parse(crypto.AES.decrypt(encryptedRoles.toString(), key).toString(crypto.enc.Utf8));
};
