// 1) Import the React and ReactDom libraries
import React from "react";
import ReactDOM from "react-dom/client";
import { UserPost } from "./components/user-file.component";

// 2) Get a reference to the div with ID root
const element = document.getElementById('root');

// 3) Tell React to take control of that element
const root = ReactDOM.createRoot(element); 

function App() {
    return (
        <div className="ui container comments">
            <div className="comment">
                <li> <UserPost /></li>
            </div>
        </div>
    );
}

root.render(<App />)