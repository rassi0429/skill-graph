import {ForceGraph2D, ForceGraph3D, ForceGraphVR, ForceGraphAR} from 'react-force-graph';
import {Skill} from "../App.tsx";
import {forceManyBody} from "d3";
import {useEffect, useRef} from "react";
import {useRoutes} from "react-router-dom";

export type SkillMapProps = {
    skills: Skill[],
    highlight?: Skill,
    width?: number,
    height?: number,
}

const transformSkills = (skills: Skill[]) => {
    return {
        nodes: skills.map((skill) => ({
            id: skill.id,
            title: skill.title,
            description: skill.description,
            image: skill.image,
            content: skill.content,
            parents: skill.parents,
            rank: skill.rank,
        })),
        links: skills.map((skill) => {
            return skill.parents?.map((parent) => ({
                source: skill.id,
                target: parent.id,
            }))
        }).flat().filter((link) => link),
    }

}

export const SkillMap = ({skills, width, height, highlight}: SkillMapProps) => {
    const forceRef = useRef(null);
    // const router = useRoutes()

    useEffect(() => {
        // forceRef.current.d3Force('charge').strength(-4000);
        // forceRef.current.d3Force('link').distance(100);
        // forceCollide

    });

    const graphData = transformSkills(skills)
    console.log(graphData)

    return (
        <ForceGraph2D
            width={width || 400}
            height={height || 400}
            backgroundColor={"#ddd"}
            graphData={graphData}
            linkDirectionalArrowLength={10}
            linkDirectionalArrowRelPos={1}
            nodeCanvasObject={(node, ctx, globalScale) => {
                // Title box
                const label = `${node.id}: ${node.title}`
                let fontSize = (12 / globalScale) * 0.8
                if(node.rank) {
                   fontSize = (12 / globalScale) * ((5 - node.rank) * 0.3)
                }
                ctx.font = `${fontSize}px Sans-Serif`
                const textWidth = ctx.measureText(label).width
                const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 1)

                if (node.id == highlight?.id) {
                    ctx.fillStyle = 'rgba(255,249,184,0.8)'
                } else if(node.rank) {
                    ctx.fillStyle = `rgba(255,${255 - (node.rank * 20)},${255 - (node.rank * 20)},0.8)`
                } else {
                    ctx.fillStyle = 'rgba(122,122,122,0.8)'
                }


                ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions)

                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'
                ctx.fillStyle = 'rgba(0,0,0,0.8)'
                ctx.fillText(label, node.x, node.y)

                node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPa
            }}
            nodePointerAreaPaint={(node, color, ctx, globalScale) => {

                ctx.fillStyle = color;
                const bckgDimensions = node.__bckgDimensions;
                bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
            }}
            ref={forceRef}
            onNodeClick={(node) => {
                console.log(node)
                location.href = `/skill/${node.id}`
            }}
        />
    )
}