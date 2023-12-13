import {useTranslation} from "./contexts/Translation.tsx";
import {useAppState} from "./contexts/Application.tsx";
import {Header} from "./components/Header.tsx";


function App() {
    const {} = useAppState()
    const {language} = useTranslation()

    return (
        <>
            <Header/>
            <h1>Resonite SkillTree {language}</h1>
        </>
    )
}

export default App
