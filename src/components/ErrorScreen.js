import React from 'react';
import { Link } from 'react-router-dom';

const ErrorScreen = ({errorMessage}) => {
        return (
        <div className="row">
          <div className="col s12">
            <h4 className="center error-text">{errorMessage}</h4>
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

export { ErrorScreen }