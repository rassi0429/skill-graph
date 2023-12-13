import {SkillMap} from "../components/SkillMap.tsx";
import {Box, Button, TextField} from "@mui/material";
import {connectSkill, disconnectSkill, getAllSkills, newSkill} from "../api.ts";
import {useEffect, useRef, useState} from "react";
import {Skill} from "../App.tsx";


export const Top = () => {


    const [skills, setSkills] = useState<Skill[]>([])

    const parentRef = useRef<HTMLInputElement>(null)
    const  childRef = useRef<HTMLInputElement>(null)
    const parentRef2 = useRef<HTMLInputElement>(null)
    const  childRef2 = useRef<HTMLInputElement>(null)

    const doParent = () => {
        const parent = parentRef.current?.value
        const child = childRef.current?.value
        if (parent && child && parent !== child) {
            connectSkill(parent, child).then((res) => {
                window.location.reload()
            })
        }
    }

    const doDisconnect = () => {
        const parent = parentRef2.current?.value
        const child = childRef2.current?.value
        if (parent && child && parent !== child) {
            disconnectSkill(child, parent).then((res) => {
                window.location.reload()
            })
        }

    }

    useEffect(() => {
        getAllSkills().then((res) => {
            setSkills(res)
        })
    }, []);

    return (
        <>
            <SkillMap skills={skills} width={window.innerWidth} height={600}/>
            <div>
                !!!同時編集できません!!! 上書きになっちゃうので新しい記事を編集することをお勧めします。<br />
                記事名をクリックすると詳細画面にいける。<br/>
                新しい記事を押すと孤立した記事ができます<br />
                下のボタンで関係づけできます。（UXはあとでなんとかする）<br />
                外部サイトとかもココに置けるようにすれば知見をすべて見れるサイトにできそう
            </div>
            <Button variant={"outlined"} onClick={() => {
                newSkill().then((res) => {
                    window.location.href = `/skill/${res.id}?edit=true`
                })
            }}>新しい記事</Button>

            <Box sx={{m: 2}}>
                <TextField type={"number"} size={"small"} sx={{width: 150}} inputRef={parentRef} label={"記事ID"}/>の記事を
                <TextField type={"number"} size={"small"} sx={{width: 150}} inputRef={childRef} label={"記事ID"}/>の子供にする
                <Button variant={"outlined"} onClick={doParent}>やる</Button>
            </Box>
            <Box sx={{m: 2}}>
                <TextField type={"number"} size={"small"} sx={{width: 150}} inputRef={parentRef2} label={"矢印の先記事ID"}/>矢印の先
                <TextField type={"number"} size={"small"} sx={{width: 150}} inputRef={childRef2} label={"矢印の元記事ID"}/>矢印の根本
                <Button variant={"outlined"} onClick={doDisconnect}>関係をきる</Button>
            </Box>
        </>
    )
}