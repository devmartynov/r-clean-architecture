import {Stack, styled} from '@mui/material';
import {ToastContainer} from 'react-toastify';
import {ILayoutProps} from '@/ui/layout/layout.types.ts';
import {Header} from '@/ui/layout/header';

export default function Layout({children}: ILayoutProps) {
    return (
        <>
            <Header/>
            <MainContentContainer>
                {children}
            </MainContentContainer>
            <ToastContainer/>
        </>
    );
}

const MainContentContainer = styled(Stack)(({theme}) => ({
    flexGrow: 1,
    padding: '24px',
    backgroundColor: theme.palette.grey[200],
}));
