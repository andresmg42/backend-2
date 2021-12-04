import pool from "../database";

export const createCompany = async (req, res)=>{
   
    const {Razon_Social,Representante_Legal, Actividad_Economica,Persona_Contacto,Telefono_Contacto, IdEmpresa_PK } =req.body;
    const insertData={
        IdEmpresa_PK,
        Razon_Social,
        Representante_Legal, 
        Actividad_Economica,
        Persona_Contacto,
        Telefono_Contacto
    };
    try {
        const result = await pool.query("INSERT INTO company SET ? ", [insertData]);
    if(result.affectedRows)
        res.json({status:200, data:{}, msj:"Compañia creada con exito con exito"});
    else
    res.json({status:204, data:{}, msj:"No se pudo crear compañia, intentelo nuevamente"});     

    } catch (error) {
        res.json({status:205, data:{}, msj:"No se pudo crear compañia, verifique que no ha sido creada previamente"});     
    }
}

export const getCompanyById =async (req, res)=>{
    const company = await pool.query("SELECT * FROM company WHERE IdEmpresa_PK=?", [req.params.id]);

    if(company.length>0)
        res.json({status:200, data:company, msj:"Empresa consultada con exito"});
    else
        res.json({status:204, data:{}, msj:"No se encontrardo datos para es ID"});
}

export const getCompanies = async (req, res)=>{
    const companies = await pool.query("SELECT * FROM company  WHERE Status='active' ")
    res.json({status:200, data:companies, msj:"Empresas consultadas con exito"});
}

export const deleteCompanyById = async (req, res)=>{
    const Status ="delete"; 
    const result = await pool.query("UPDATE company SET Status=? WHERE  Status='active' AND IdEmpresa_PK = ?", [Status, req.params.id]);
    if(result.affectedRows)
        res.json({status:200, data:{}, msj:"Compañia borrada con exito con exito"});
    else
        res.json({status:204, data:{}, msj:"No se pudo borra compañia, intente mas tarde"});     
}

export const undeleteCompany = async (req, res)=>{
    const Status ="active"
    const result = await pool.query("UPDATE company SET Status=? WHERE  Status='delete' AND IdEmpresa_PK = ?", [Status, req.params.id]);
    if(result.affectedRows)
        res.json({status:200, data:{}, msj:"Compañia restaurada con exito con exito"});
    else
        res.json({status:204, data:{}, msj:"No se pudo restaurar compañia, intente mas tarde"});     
}

export const updateCompany = async (req, res)=>{
    const {Razon_Social,Representante_Legal, Actividad_Economica,Persona_Contacto,Telefono_Contacto, IdEmpresa_PK } =req.body;
    const UpdateData={
        Razon_Social,
        Representante_Legal, 
        Actividad_Economica,
        Persona_Contacto,
        Telefono_Contacto
    };
    const result = await pool.query("UPDATE company SET ? WHERE IdEmpresa_PK = ?", [UpdateData, IdEmpresa_PK]);
    if(result.affectedRows)
        res.json({status:200, data:{}, msj:"Compañia actualizada con exito con exito"});
    else
        res.json({status:204, data:{}, msj:"No se pudo actualizar, intente mas tarde"});     
}

export const eraseCompanyById = async (req, res)=>{
    const Status ="delete"; 
    const result = await pool.query("UPDATE company SET Status=? WHERE  Status='active' AND IdEmpresa_PK = ?", [Status, req.params.id]);
    if(result.affectedRows)
        res.json({status:200, data:{}, msj:"Compañia borrada con exito con exito"});
    else
        res.json({status:204, data:{}, msj:"No se pudo borra compañia, intente mas tarde"});     
}


