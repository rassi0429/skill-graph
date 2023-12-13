import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {AppStateProvider} from "./contexts/Application.tsx";
import {TranslationProvider} from "./contexts/Translation.tsx";
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <TranslationProvider>
                <AppStateProvider>
                    <App/>
                </AppStateProvider>
            </TranslationProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
