import React from 'react';

const MyComponent = () => {
    return (
        <div style={styles.page}>
            <div style={styles.imageContainer}>
                <img
                    src="https://i.ibb.co/jZJ1S7mc/THE-STUDY-LOK-IDEATION-2.png"
                    alt="Landing page"
                    style={styles.image}
                />
            </div>
            <div style={styles.content}>
                <h1 style={styles.heading}>Welcome to the next section</h1>
                <p style={styles.paragraph}>
                    This section is part of the scrollable page and maintains the black background for seamless transition.
                </p>
            </div>
        </div>
    );
};

const styles = {
    page: {
        backgroundColor: "#000",
        color: "#fff",
    },
    imageContainer: {
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start", // keep image aligned to the top
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "auto",
        maxHeight: "100vh", // ensures it doesn't exceed viewport height
        objectFit: "contain", // keeps full image visible
        display: "block",
    },
    content: {
        padding: "2rem",
        minHeight: "100vh",
    },
    heading: {
        fontSize: "2rem",
    },
    paragraph: {
        fontSize: "1.2rem",
        marginTop: "1rem",
    }
};

export default MyComponent;
