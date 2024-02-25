import {Link} from 'react-router-dom';
import {AppBar, Box, Toolbar, Typography, Button, styled} from '@mui/material';
import {pages} from '@/ui/layout/header/utils.ts';
import {User} from '@/ui/layout/user';
import {useUseCases} from '@/ui/context/use-case.tsx';

export default function Header() {
    const {getUser} = useUseCases();
    return (
        <AppBar position="static">
            <Toolbar>
                <Title>
                    Тайм-трекер
                </Title>
                <Box sx={{display: 'flex', marginRight: 'auto'}}>
                    {pages.map(page => (
                        <NavLink
                            // @ts-expect-error - :(
                            component={Link}
                            to={page.to}
                            key={page.to}
                        >
                            {page.label}
                        </NavLink>
                    ))}
                </Box>
                <User user={getUser()}/>
            </Toolbar>
        </AppBar>
    );
}

const NavLink = styled(Button)({
   my: 2,
   color: 'white',
   display: 'block',
});

const Title = styled(Typography)(({theme}) => ({
    fontWeight: 700,
    fontSize: theme.typography.h6.fontSize,
    lineHeight: theme.typography.h6.lineHeight,
    marginRight: 10,
}));
