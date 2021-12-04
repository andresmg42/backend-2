import pool from "../database";
import jwt from 'jsonwebtoken';
import config from "../config";
import { encryptPassword, decodeUserPermission, maxRoll,encodeUserPermission, permissionInit } from "../libs/helpers";


export const signup = async (req, res)=>{
    const {IdUser_PK, UserName, UserEmail, UserLastName, avatar,IdCompany_FK }=req.body;
    const password = await encryptPassword(IdUser_PK + "**");
    const userPermission = encodeUserPermission(permissionInit, IdUser_PK )
    const maxroll=encodeUserPermission(maxRoll(permissionInit), IdUser_PK )
       
    let newUser = {
        IdUser_PK,
        UserName, 
        password,
        UserLastName,
        IdCompany_FK,
        userPermission,
        UserEmail,
        maxRoll:maxroll,
        avatar
      };   
      // Saving in the Database

        try {
            const result = await pool.query("INSERT INTO users SET ? ", newUser);
            if(result.affectedRows > 0){
                newUser.TOKEN =jwt.sign({id:IdUser_PK}, config.SECRET, {
                    expiresIn: 86400 // 24 horas
                })
                newUser.Roles=[0];
                res.json({status:200, data:{newUser}, msj:"Usuario creado con exito"});}
            else{
                res.json({status:204, data:{}, msj:"No se pudo crear usuario, intente mas tarde"}); }
        }catch (error) {
                console.log(error.sqlMessage);
                const users = await pool.query("SELECT * FROM users WHERE  IdUser_PK=? AND Status ='active' ",[IdUser_PK]);
                console.log(users);
            if (users.length > 0) {
                return res.json({status:204, data: {} , msj: "el usuario se encuentra creado previamente"});}
            else{
                const usersDelete = await pool.query("SELECT * FROM users WHERE IdUser_PK=? AND Status ='delete' ",[IdUser_PK]);
                if (usersDelete.length > 0) {
                    return res.json({status:205, data: {} , msj: "el usuario se encuentra creado previamente, pero esta borrado, ¿desea restaurarlo?"});}
                else{
                    return res.json({status:206, data: {} , msj: error.sqlMessage});
                }
            }    
        }
    }
export const getAll = async (req, res)=>{   
    const users = await pool.query("SELECT * FROM users WHERE Status = 'active' ");
    if (users.length < 1) return res.json({status:204, data: {} , msj: "No se pudo realizar consulta de usuarios"});
    return res.json({status:200, data: users , msj: "Consulta de usuarios exitosa"});
}
export const getById = async (req, res)=>{ 
    const {ColumnName, Value} = req.body;
    try {
        const SqlString = "SELECT * FROM users WHERE " + ColumnName + " LIKE '" + Value + "' AND Status='active'";
        console.log(SqlString);
        const users = await pool.query(SqlString);
    if (users.length < 1) return res.json({status:204, data: {} , msj: "No se encontraron resultados"});
    return res.json({status:200, data: users , msj: "Consulta de usuarios exitosa"});
     
    } catch (error) {
        return res.json({status:205, data: {} , msj: error.sqlMessage});
    }
}
export const update = async (req, res)=>{  
    const updateUser = { };
    const {IdUser_PK}=req.body;
    if(req.body.UserName!= undefined) updateUser.UserName=req.body.UserName;
    if(req.body.Password!= undefined) updateUser.Password=req.body.Password;
    if(req.body.UserLastName!= undefined) updateUser.UserLastName=req.body.UserLastName;
    if(req.body.IdCompany_FK!= undefined) updateUser.IdCompany_FK=req.body.IdCompany_FK;
    if(req.body.UserEmail!= undefined) updateUser.UserEmail=req.body.UserEmail;
    if(req.body.avatar!= undefined) updateUser.avatar=req.body.avatar;
    if(req.body.Status!= undefined) updateUser.Status=req.body.Status;
    if(req.body.userPermission!= undefined) {
        updateUser.userPermission=req.body.userPermission
        updateUser.maxRoll=encodeUserPermission(maxRoll(decodeUserPermission(updateUser.userPermission,IdUser_PK)), IdUser_PK )
    };
    
    try {
        const result = await pool.query("UPDATE users SET ? WHERE IdUser_PK = ?", [updateUser, IdUser_PK]);
        if(result.affectedRows)
            res.json({status:200, data:{}, msj:"Usuario actualizado con exito"});
        else
            res.json({status:204, data:{}, msj:"No se pudo actualizar, intente mas tarde"}); 
    } catch (error) {
        console.log(error)
        return res.json({status:206, data: {} , msj: error.sqlMessage});
    } 
}
export const del = async (req, res)=>{ 
    const token = req.header("x-access-token");
    const decode=jwt.verify(token, config.SECRET)
    if(req.body.IdUser_PK===decode.id){
        return res.json({status:207, data:{}, msj:"No se puede borrar un usuario a si mismo"});
    }
         
    try {
        const result = await pool.query("UPDATE users SET Status='delete' WHERE IdUser_PK = ?", [ req.body.IdUser_PK]);
        if(result.affectedRows)
            res.json({status:200, data:{}, msj:"Usuario borrado con exito"});
        else
            res.json({status:204, data:{}, msj:"No se pudo borrar, intente mas tarde"}); 
      } catch (error) {
        return res.json({status:206, data: {} , msj: error.sqlMessage});
      } 
}
export const erase = async (req, res)=>{   
    try {
        const result = await pool.query("DELETE FROM users WHERE IdUser_PK = ?", [ req.body.IdUser_PK]);
        if(result.affectedRows){
            await pool.query("DELETE FROM userroles WHERE IdUser_FK = ?", [ req.body.IdUser_PK]);    
            res.json({status:200, data:{}, msj:"Usuario elminiado permanentemente con exito"});}
        else
            res.json({status:204, data:{}, msj:"No se pudo elminiado, intente mas tarde"}); 
      } catch (error) {
        return res.json({status:206, data: {} , msj: error.sqlMessage});
      } 
}
export const unDelete = async (req, res)=>{  
    try {
        const result = await pool.query("UPDATE users SET Status='active' WHERE IdUser_PK = ?", [ req.body.IdUser_PK]);
        if(result.affectedRows)
            res.json({status:200, data:{}, msj:"Usuario restaurado con exito"});
        else
            res.json({status:204, data:{}, msj:"No se pudo restaurar, intente mas tarde"}); 
      } catch (error) {
        return res.json({status:206, data: {} , msj: error.sqlMessage});
      } 
}


///--metodos uniamente ara desarrollo, eliminar par productivos
export const setPermission = async (req, res)=>{ 
    const {IdUser_PK, permission }=req.body;
    const cryptRol =  encodeUserPermission(permission, IdUser_PK )
    try {
        const maxroll=encodeUserPermission(maxRoll(permission), IdUser_PK )
       
        const result = await pool.query("UPDATE users SET userPermission=? , maxRoll=? WHERE IdUser_PK = ?", [ cryptRol, maxroll, IdUser_PK]);
        if(result.affectedRows)
            res.json({status:200, data:{}, msj:"Roles de usuario Configurado con éxito"});
        else
            res.json({status:204, data:{}, msj:"No se pudo configurar roles, intente mas tarde"}); 
      } catch (error) {
        return res.json({status:206, data: cryptRol, msj: error.sqlMessage});
      } 
}
export const getPermission = async (req, res)=>{ 
    const {IdUser_PK }=req.body;
    
    try {
        const users = await pool.query("SELECT * FROM users WHERE IdUser_PK=? ",[IdUser_PK]);
        console.log(users);
        const decryptRol =  decodeUserPermission(users[0].userPermission, IdUser_PK )
        res.json({status:200, data: decryptRol , msj:"obtener permisos de ususario"});
    } catch (error) {
        console.log(error);
        res.json({status:204, data: {} , msj:error});
    }
    
}

