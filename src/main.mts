import express from 'express';
import {PrismaClient} from '@prisma/client'
import {createViteDevServer} from "./viteServer.mjs";


console.log(process.env.DATABASE_URL)

const app = express();
app.use(express.json())

const prisma = new PrismaClient()

if (process.env.NODE_ENV === "production") {
    app.use(express.static('front/dist'))
} else {
    createViteDevServer("./front").then(({app: viteApp}) => {
        app.use(viteApp)
    })
}

// get all skills
app.get("/api/skills", async (req, res) => {
    const skills = await prisma.skill.findMany({
        include: {
            parents: true
        }
    })
    res.json(skills)
    console.log("get all skills")
})


// get skill by id
app.get("/api/skill/:id", async (req, res) => {
    const skill = await prisma.skill.findUnique({
        where: {id: Number(req.params.id)},
        include: {
            parents: true,
            children: {
                include: {
                    parents: true
                }
            }
        }
    })
    res.json(skill)
    console.log("get skill by id", req.params.id)
})

// new Skill
app.post("/api/skill", async (req, res) => {
    const skill = await prisma.skill.create({
        data: {
            title: "New Skill",
            description: "New Skill",
            image: "",
            content: "",
        }
    })
    res.json(skill)
    console.log("new skill")
})


// update skill
app.post("/api/skill/:id", async (req, res) => {

    console.log("update skill", req.params.id)
    const skill = await prisma.skill.update({
        where: {id: Number(req.params.id)},
        data: {
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            content: req.body.content,
        }
    })
    res.json(skill)
})

// connect parent skill
app.post("/api/skill/:id/connect", async (req, res) => {
    const skill = await prisma.skill.update({
        where: {id: Number(req.params.id)},
        data: {parents: {connect: {id: Number(req.body.parentId)}}}
    })
    res.json(skill)
    console.log("connect parent skill", req.params.id, req.body.parentId)
})

// disconnect parent skill
app.post("/api/skill/:id/disconnect", async (req, res) => {
    const skill = await prisma.skill.update({
        where: {id: Number(req.params.id)},
        data: {parents: {disconnect: {id: Number(req.body.parentId)}}}
    })
    res.json(skill)
    console.log("disconnect parent skill", req.params.id, req.body.parentId)
})


app.listen(3000, () => {
    console.log('Server is running');
})

// handle unhanded promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err}`)
    // close server & exit process
    // server.close(() => process.exit(1))
})