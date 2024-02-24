import React from 'react';
import {Button, MenuItem, MenuList, Popover, styled} from '@mui/material';
import {AddCircle} from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import {IProjectFieldProps} from '@/ui/pages/timer-page/project-field/project-field.types.ts';
import {mockProjects} from '@/ui/pages/timer-page/project-field/utils.ts';

export default function ProjectField({onClick}: IProjectFieldProps) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'projects-popover' : undefined;

    return (
        <>
            <Button
                startIcon={<AddCircle/>}
                aria-describedby={id}
                onClick={handleClick}
            >
                Проект
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Title>Выберите проект</Title>
                <MenuList>
                    {mockProjects.map(project => (
                        <MenuItem key={project.uid} onClick={() => onClick(project)}>
                            <Typography
                                variant="inherit"
                                sx={{color: project.color}}
                            >
                                {project.title}
                            </Typography>
                        </MenuItem>
                    ))}
                </MenuList>
            </Popover>
        </>
    );
}

const Title = styled(Typography)({
    padding: '16px',
});
