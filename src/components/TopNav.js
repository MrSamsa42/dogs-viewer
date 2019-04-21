import React from 'react';
import { Link } from 'react-router-dom';

const TopNav = (props) => {
    return (
        <div className="navbar">
            <nav>
                <div className="nav-wrapper teal">
                    <Link to="/" className="brand-logo">Breed Explorer</Link>
                </div>
            </nav>
        </div>
    );
}

export { TopNav }