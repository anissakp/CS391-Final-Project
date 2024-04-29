// Ana Ramirez: SimplePopup.jsx

// Component from MUI library!
// source: https://mui.com/base-ui/react-popup/

import * as React from 'react';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';


// Pop up button to show the artwork's date
// component was not modified much from the MUI's example usage website; some details such as
// decoration as well as type of information passed were some modifications I made
export default function SimplePopup({ date }) {
    const [anchor, setAnchor] = React.useState(null);
     console.log(date) //checking it was passed correctly from the artwork page

    const handleClick = (event) => {
        setAnchor(anchor ? null : event.currentTarget);
    };

    const open = Boolean(anchor);
    const id = open ? 'simple-popper' : undefined;

    return (
        <div>

            <Button aria-describedby={id} type="button" onClick={handleClick}>
                Artwork Date
            </Button>
            <BasePopup id={id} open={open} anchor={anchor}>
                <PopupBody>{date}</PopupBody>
            </BasePopup>
        </div>
    );
}
//choosing color palette. 50 is the themed color. Purple is a color I like :)
const colors = {
    50: '#b50235',
    100: '#f540ac',
    200: '#333333',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#8a14ff',

};


//styling from the MUI library, did change colors and added a margin
const PopupBody = styled('div')(
    ({ theme }) => `
  width: max-content;
  padding: 12px 16px;
  margin: 8px;
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? colors[100] : colors[500]};
  background-color: ${theme.palette.mode === 'dark' ? colors[50] : '#fff'};
  box-shadow: ${
        theme.palette.mode === 'dark'
            ? `0px 4px 8px rgb(0 0 0 / 0.7)`
            : `0px 4px 8px rgb(0 0 0 / 0.1)`
    };
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  z-index: 1;
`,
);


const Button = styled('button')(
    ({ theme }) => `
  margin-top:10px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${theme.palette.mode === 'dark' ? colors[50] : colors[50]}; // Change background color
  padding: 8px 16px;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? colors[50] : colors[300]}; // Change text color
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${theme.palette.mode === 'dark' ? colors[800] : colors[50]}; // Change border color

  &:hover {
    background-color: ${theme.palette.mode === 'dark' ? colors[400] : colors[300]}; // Change background color on hover
    color: ${theme.palette.mode === 'dark' ? colors[50] : colors[50]}; // Change text color on hover
  }

  &:active {
    background-color: ${theme.palette.mode === 'dark' ? colors[300] : colors[400]}; // Change background color on click
    color: ${theme.palette.mode === 'dark' ? colors[50] : colors[50]}; // Change text color on click
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? colors[100] : colors[50]}; // Change shadow color
    outline: none;
  }

  &.disabled {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: none;
    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? colors[500] : colors[200]}; // background for when not in use
    }
  }
`,
);

SimplePopup.propTypes = {
    date: PropTypes.string.isRequired, // Date is passed on as a string from artwork page
};