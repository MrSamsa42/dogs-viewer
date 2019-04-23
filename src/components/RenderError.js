import React from 'react';
import { Link } from 'react-router-dom';

const RenderError = ({errorStatus}) => {
    let errorText;
    switch(errorStatus) {
        case 'invalid breed':
          errorText = 'Invalid breed name!'
        break;

        case 'API error':
            errorText = 'Error fetching the pictures'
            break;
        default:
            errorText = 'Unknown error'
    }
        return (
        <div className="row">
          <div className="col s12">
            <h4 className="center error-text">{errorText}</h4>
            <div className="center">
              <Link
                className="btn"
                to="/"
              >
                Back to Breeds
                </Link>
                </div>
            </div>
          </div>
        )
}

export { RenderError }