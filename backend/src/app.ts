import express from "express";
import mongoose from "mongoose";
import path from "path";

// Routes
import tasksRoutes from "./api/routes/tasks/tasks.routes";
import usersRoutes from "./api/routes/users/user.routes";

class App {
    public app: express.Application;
    private readonly port: string | number;
    private readonly mongoUri: string;

    constructor(appInit: {
        port: string | number;
        mongoUri: string;
        middlewares: any
    }) {
        this.app = express();
        this.port = appInit.port;
        this.mongoUri = appInit.mongoUri;

        this.initializeMiddlewares(appInit.middlewares);
        this.connectDatabase(appInit.mongoUri)
        this.assets();
        this.routes();
    }

    // Initialize all the Middlewares specify when creating the App
    private initializeMiddlewares(middlewares: { forEach: (arg0: (middleware: any) => void ) => void}): void {
        middlewares.forEach(middleware => {
            this.app.use(middleware);
        });
    }

    // Create a connection with MongoDB
    private connectDatabase(uri: string): void {
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(db => console.log(`Db connected to ${db.connection.host}`))
            .catch(err => console.log(err));
    }

    // Serve static files
    private assets(): void {
        this.app.use('/static', express.static(path.join(__dirname, 'public')));
    }

    // Server routes
    private routes(): void {
        this.app.use('/api/v1/tasks', tasksRoutes);
        this.app.use('/api/v1/users', usersRoutes);
    }

    // Method that starts the server
    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server ready in port ${this.port}`);
        })
    }
}

    export default App;
