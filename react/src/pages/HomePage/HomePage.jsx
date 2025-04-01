import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function HomePage () {
    return (
        <div>
            Home Page
            <Link to='/song-library'>Song Library</Link>
            <Link to='/practice-log'>Practice Log</Link>
        </div>
    );
}

export default HomePage;