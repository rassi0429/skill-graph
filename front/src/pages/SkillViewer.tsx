import {useParams, useRoutes} from "react-router-dom";
import {Skill} from "../App.tsx";
import {useEffect, useState} from "react";
import {getSkill, saveSkill} from "../api.ts";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {SkillMap} from "../components/SkillMap.tsx";
import SimpleMde from "react-simplemde-editor";
import {MDXEditor} from "@mdxeditor/editor";
import "easymde/dist/easymde.min.css";
import {Box, Button, Container, TextField, useMediaQuery} from "@mui/material";

export const SkillViewer = () => {
    // get skill id from router
    const params = useParams()
    const query = window.location.search

    const [skill, setSkill] = useState<Skill | null>(null)
    const [editMode, setEditMode] = useState<boolean>(query.includes("edit"))

    useEffect(() => {
        // get skill from api
        if (params.id) {
            getSkill(params.id).then((res) => {
                setSkill(res)
            })

        }
    }, [params.id]);

    if (!skill) {
        return <h1>loading</h1>
    }

    // remove duplicate
    const skillList = [...skill.parents, skill, ...skill.children, ...skill.children?.map(s => [...s.parents])].flat().filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)


    if (editMode) {
        return (
            <>
                <SkillMap height={160}  highlight={skill} width={window.innerWidth} skills={skillList}/>
                <Box
                    sx={{
                        '& > :not(style)': { m: 1 },
                    }}>
                    <TextField id="title" label="Title" variant="outlined" value={skill.title} onChange={(e) => {
                        setSkill({...skill, title: e.target.value})
                    }}/>
                    <TextField id="description" label="description" variant="outlined" value={skill.description}
                               onChange={(e) => {
                                   setSkill({...skill, description: e.target.value})
                               }}/>
                    <Button variant={"outlined"} onClick={() => {
                        setEditMode(false)
                        saveSkill(skill)
                    }}>保存</Button>
                </Box>
                <Container sx={{display: "flex"}}>
                    <SimpleMde style={{width: "100%"}} value={skill.content}
                               onChange={(v) => setSkill({...skill, content: v})}/>
                    <div style={{width: "100%"}}>
                        <ReactMarkdown
                            remarkPlugins={[[remarkGfm, {singleTilde: false}]]}
                        >{skill.content}</ReactMarkdown>
                    </div>
                </Container>
            </>
        )
    }

    return (
        <>
            <SkillMap height={250} width={window.innerWidth} highlight={skill}
                      skills={skillList}/>
            <Container maxWidth={"sm"} sx={{paddingTop: 1}}>
                <Button variant={"outlined"} onClick={() => {
                    setEditMode(true)
                }}>編集</Button>
                <h1>{skill.title}</h1>
                <h2>{skill.description}</h2>
                <ReactMarkdown
                    remarkPlugins={[[remarkGfm, {singleTilde: false}]]}
                >{skill.content}</ReactMarkdown>
            </Container>
        </>
    )

}