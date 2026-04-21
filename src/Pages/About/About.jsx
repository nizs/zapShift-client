import React from 'react';
import toast from 'react-hot-toast';

const About = () => {
    return (
        <div>
            <button onClick={() => toast.success("Working!")}>
                Test Toast
            </button>
        </div>
    );
};

export default About;