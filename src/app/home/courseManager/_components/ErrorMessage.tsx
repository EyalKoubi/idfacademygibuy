import React from 'react';

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    if (!message) return null;

    return (
        <div className="text-red-500">
            {message}
        </div>
    );
};

export default ErrorMessage;
