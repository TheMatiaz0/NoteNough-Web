import { render, screen } from '@testing-library/react';
import {BrowserRouter} from "react-router-dom";
import Home from '../Home';

const MockHome = () => {
    return (
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    )
}

describe("Home", () => {
  it('should render same text passed into title prop', async () => {
     render(<MockHome/>); 
  });  
})