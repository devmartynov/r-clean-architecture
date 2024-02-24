import React from 'react';
import {Button, IconButton, Popover, styled, Typography} from '@mui/material';
import {Close} from '@mui/icons-material';
import {IDeleteTimerButtonProps} from './delete-timer-button.types.ts';

export default function DeleteTimerButton({onDelete}: IDeleteTimerButtonProps) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'delete-timer-popover' : undefined;

    return (
        <>
            <IconButton
                aria-describedby={id}
                onClick={handleClick}
            >
                <Close/>
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                sx={{padding: 2}}
            >
                <Wrapper>
                    <Typography mr={2}>
                        Вы уверены?
                    </Typography>
                    <Button variant="contained" onClick={onDelete}>
                        Отказаться
                    </Button>
                </Wrapper>
            </Popover>
        </>
    );
}

const Wrapper = styled('div')`
    display: flex;
    align-items: center;
    padding: 16px; 
`
