import { Router } from 'express'
import { UserModel } from '../models/User';

export const userRouter = Router()

userRouter.get("/", function (req: any, res: any, next: any) {
    res.json(Date.now());
});

userRouter.get('/users', (req: any, res: any, next: any) => {
    // UserModel.findAll().then(users => console.log("All Users:", JSON.stringify(users)))

    UserModel
        .findAll({ subQuery: false })
        .then(results => {
            return res.json({ users: results }).end();
        })
        .catch(err => {
            console.log(err);
            return res
                .status(500)
                .json(err)
                .end();
        });
});


userRouter.post('/users', (req: any, res: any, next: any) => {
    let name = req.body.name;
    UserModel
        .create({id:24, name: name })
        .then(results => {
            return res.json('success').end();
        })
        .catch(error => {
            return res.json(error).end();
        });
});
