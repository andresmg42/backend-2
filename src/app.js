import express from 'express';
import morgan from "morgan";
import pkg from "../package.json";
import config from "./config";
import cors from "cors"
import routes from "./routes/index";
//import {createRoles} from "./libs/initialSetup";



const { database, port } = config;
const app = express();
//createRoles();
app.use(express.json());
app.set('pkg', pkg);
app.use(morgan('dev'));
app.use(cors());

// Settings
app.set("port", port);

app.get('/', (req, res)=>{
    res.json({
        name: app.get('pkg').name,
        description: app.get('pkg').description,
        version: app.get('pkg').version,
        author: app.get('pkg').author
    
    });
});

app.use(routes);

export default app;


