
// const host = 'http://localhost:3000';

import {Skill} from "./App.tsx";

export const getAllSkills = async () => {
    const response = await fetch(`/api/skills`);
    return response.json();
}


export const getSkill = async (id: string) => {
    const response = await fetch(`/api/skill/${id}`);
    return response.json();
}

export const saveSkill = async (skill: Skill) => {
    const response = await fetch(`/api/skill/${skill.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(skill)
    });
    return response.json();
}

export const newSkill = async () => {
    const response = await fetch(`/api/skill`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}

export const connectSkill = async (id: string, parentId: string) => {
    const response = await fetch(`/api/skill/${id}/connect`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({parentId})
    });
    return response.json();
}

export const disconnectSkill = async (id: string, parentId: string) => {
    const response = await fetch(`/api/skill/${id}/disconnect`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({parentId})
    });
    return response.json();
}