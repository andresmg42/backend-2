import pool from "../database";
import jwt from 'jsonwebtoken';
import config from "../config";
import bcrypt from "bcryptjs";
import { encryptPassword, matchPassword ,  decodeUserPermission} from "../libs/helpers";


export const isSignin = async (req, res)=>{
    const token = req.header("x-access-token");

    if(!token) return res.json({status:204, data: {} , msj: "no se encontró TOKEN" });
    try{
        const decode=jwt.verify(token, config.SECRET)
        req.userId=decode.id
        const rows = await pool.query("SELECT * FROM users WHERE IdUser_PK = ?", [decode.id ]);
    
        if (rows.length < 1) return res.json({status:204, data: {} , msj: "TOKEN Inivalido "}); //*/
            res.json({status:200, data: {} , msj: "Sesion Activa"});
    }
    catch(e){
            console.log("token incorrecto"+ e);
            return res.json({status:204, data: {} , msj: "TOKEN error "})
    }
}

export const signin = async (req, res)=>{
    
    
    const {IdUser_PK, Password }=req.body
    const rows = await pool.query("SELECT * FROM users WHERE IdUser_PK = ? AND Status ='active'", [IdUser_PK ]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword =  await bcrypt.compare(Password, user.Password);
        if (validPassword) {
            user.TOKEN = jwt.sign({id:IdUser_PK}, config.SECRET, {
                expiresIn: 86400 // 24 horas
            })
            res.json({status:200, data: user , msj: "Bienvenido " + user.UserName});
        } else {
            res.json({status:205, data:{}, msj: "Contraseña Incorrecta"});
        } 
    }else{
        res.json({status:204, data:{}, msj:"Usuario incorrecto"});
    }
} 
export const recoverypsw = async (req, res)=>{
    const {IdUser_PK,  UserEmail  }=req.body;
    const rows = await pool.query("SELECT * FROM users WHERE IdUser_PK = ? AND UserEmail = ? ", [IdUser_PK, UserEmail ]);
    if (rows.length < 1) return res.json({status:204, data: {} , msj: "Usuarios o E-mail incorrectos "}); 
    const password = await encryptPassword(IdUser_PK + "**");
     // Updating in the Database
    const result = await pool.query("UPDATE users SET Password=? WHERE IdUser_PK=?", [password, IdUser_PK]);
    if(result.affectedRows) 
    return res.json({status:200, data:{}, msj:"Contraseña actualizada con exito"})
    return res.json({status:204, data:{}, msj:" No se pudo actualizar contraseña, intente mas tarde"})
}

   


   

