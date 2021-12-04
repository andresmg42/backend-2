import { json } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import pool from "../database";
import { encryptPassword, decodeUserPermission, encodeUserPermission, permissionInit } from "../libs/helpers";

function convertToBinary (number) {
    if (number > 0) {
        return convertToBinary( parseInt(number / 2) ) + (number % 2)
    };
    return '';
}
function verifyPermission (rol, method, route) {
    if(rol!=undefined) {
        const urlstart=JSON.stringify(rol).indexOf(route,1)
        const urlAccess=JSON.stringify(rol).indexOf('access',urlstart)+8
        const RouteAccees=JSON.stringify(rol).substring(urlAccess, urlAccess+1)=="f"?false:true
        var PUTStart=JSON.stringify(rol).indexOf('PUT',urlstart)+5
        var DELETEStart=JSON.stringify(rol).indexOf('DELETE',urlstart)+8
        var POSTStart=JSON.stringify(rol).indexOf('POST',urlstart)+6
        const PUTAccees=JSON.stringify(rol).substring(PUTStart, PUTStart+1)=="f"?false:true
        const DELETEAccees=JSON.stringify(rol).substring(DELETEStart, DELETEStart+1)=="f"?false:true
        const POSTAccees=JSON.stringify(rol).substring(POSTStart, POSTStart+1)=="f"?false:true
        console.log(method + "/ "+route +"=> " + RouteAccees  +" PUT " + PUTAccees +" DELETE " + DELETEAccees +" POST " + POSTAccees);
        if (rol.superAdmin.access===true){
            return true; 
        }
        else if (rol.admin.access===true){
            return true; 
        }    
        else{ 
            if(RouteAccees){
                if(method==='POST' && POSTAccees) 
                    return true;
                else if(method==='PUT' && PUTAccees) 
                    return true;
                else if(method==='DELETE' && DELETEAccees) 
                    return true;
                else if(method==='GET') 
                    return true;
                else 
                    return false;      
            }else
                return false
        }
    }else
    return false;
}



export const verifyToken = async (req, res, next) =>{
    const token = req.header("x-access-token");
    const {baseUrl, method, url }  = req;
    const route =  "" + baseUrl.replace("/api/", "") + "";

    if(!token) return res.json({status:304, data: {} , msj: "no se encontró TOKEN" });
    try{
        const decode=jwt.verify(token, config.SECRET)
        req.userId=decode.id
        const rows = await pool.query("SELECT * FROM users WHERE IdUser_PK = ?", [decode.id ]);
        if (rows.length > 0) {
                const permission  =decodeUserPermission(rows[0].userPermission, decode.id, route );
                if (verifyPermission(permission, method, route)) {
                    next();
                }
                else
                    return res.json({status:305, data: {} , msj: "Usuario no cuenta con permisos para esta realiazar esta accion"});
        } 
        else
            return res.json({status:306, data: {} , msj: "TOKEN Inivalido "});
    }
    catch(e){
        console.log(e);
        return res.json({status:307, data: e , msj: e})
    }
    


}