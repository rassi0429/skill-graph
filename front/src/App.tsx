import {useTranslation} from "./contexts/Translation.tsx";
import {useAppState} from "./contexts/Application.tsx";
import {Header} from "./components/Header.tsx";
import {Box, Button, Container, CssBaseline, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {getAllSkills, newSkill} from "./api.ts";
import {SkillMap} from "./components/SkillMap.tsx";
import {Route, Routes} from "react-router-dom";
import {SkillViewer} from "./pages/SkillViewer.tsx";
import {Top} from "./pages/Top.tsx";


export type Skill = {
    id: number
    title: string
    description: string
    image: string
    content: string
    parents: Skill[]
    children?: Skill[]
}


function App() {
    const {} = useAppState()
    const {language} = useTranslation()



    return (
        <>
            <CssBaseline/>
            <Header/>
            <Routes>
                <Route index element={<Top />}/>
                <Route path={"/skill/:id"} element={<SkillViewer />}/>
            </Routes>

        </>
    )
}

export default App
