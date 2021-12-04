    import pool from "../database";
    
    export const createRoles = async()=>{

        const roles = await pool.query("SELECT * FROM roles")

        if(roles>0) return;
        await pool.query("INSERT INTO `roles (`IdRol_PK`, `RolName`, `RolDescription`) VALUES" +
            "('100', 'SuperAdmin', 'Acceso total'),"+
            "('90', 'Admin ', 'Maximo'), " +
            "('80', 'Gerente', 'Acceso Total Lectura'), "+
            "('60', 'Comercial ', 'Control requerimiento'), "+
            "('50', 'Lider ', 'control Ordenes'), "+
            "('40', 'Tecnico', 'ordenes'), "+
            "('30', 'Logitica ', 'a equipos'), "+
            "('20', 'TalentoHumano', 'Acceso Personal'), "+
            "('10', 'Cliente ', 'Acceso requerimiento'), "+
            "('0', 'Basico ', 'Acceso plataforma');")
        

}


    
