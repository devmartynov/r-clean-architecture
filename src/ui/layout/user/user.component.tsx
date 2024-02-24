import {Avatar, Stack, styled} from '@mui/material';
import {Person} from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import {IUserProps} from '@/ui/layout/user/user.types.ts';

export default function User({user}: IUserProps) {
    return (
        <Container gap={1}>
            <Typography>
                {user.name}
            </Typography>
            <UserAvatar>
                <Person/>
            </UserAvatar>
        </Container>
    );
}

const Container = styled(Stack)({
    flexDirection: 'row',
    alignItems: 'center',
});

const UserAvatar = styled(Avatar)({
    width: 32,
    height: 32
});
