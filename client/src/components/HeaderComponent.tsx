import React from 'react';


export const HeaderComponent = () => {


    return (
        <div>
            <h1 style={styles.headerText}>Ewurafua Plange Submission - PDF TEXT EXTRACTION</h1>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    headerText: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        margin: 'auto',
        fontFamily: 'Arial, sans-serif',
        marginTop: 30
    },
}