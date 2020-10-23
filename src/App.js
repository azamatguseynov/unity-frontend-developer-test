import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import {HomePage} from "./pages/home/views/HomePage";

export const App = () => (
    <Container className="app" fixed>
        <Box data-testid="app-box" m={2}>
            <HomePage/>
        </Box>
    </Container>
);

export default App;

