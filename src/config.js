/**
 * Reading Environment Variables
 */
 import { config } from "dotenv";
 config();
 



 export default {
   database: {
     connectionLimit: 10,
     host: process.env.DATABASE_HOST || "blb2gqtlbfim9rmwhdwe-mysql.services.clever-cloud.com",
     user: process.env.DATABASE_USER || "u7lb0nnb7lxg5l9h",
     password: process.env.DATABASE_PASSWORD || "DCswNU4euKT2O9QFg66V",
     database: process.env.DATABASE_NAME || "appservices2",
   },
   port: process.env.PORT || 4010,
   SECRET: 'RMS-WebApp-API'
 };
 
//  MYSQL_ADDON_HOST=blb2gqtlbfim9rmwhdwe-mysql.services.clever-cloud.com
//  MYSQL_ADDON_DB=blb2gqtlbfim9rmwhdwe
//  MYSQL_ADDON_USER=u7lb0nnb7lxg5l9h
//  MYSQL_ADDON_PORT=3306
//  MYSQL_ADDON_PASSWORD=DCswNU4euKT2O9QFg66V 
//  MYSQL_ADDON_URI=mysql://u7lb0nnb7lxg5l9h:DCswNU4euKT2O9QFg66V@blb2gqtlbfim9rmwhdwe-mysql.services.clever-cloud.com:3306/blb2gqtlbfim9rmwhdwe
//  Host