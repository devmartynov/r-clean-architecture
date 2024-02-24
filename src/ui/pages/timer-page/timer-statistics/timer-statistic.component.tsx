import Typography from '@mui/material/Typography';
import {Stack} from '@mui/material';
import {ITimerStatisticsProps} from './timer-statistics.types.ts';

export default function TimerStatistic({time, title}: ITimerStatisticsProps) {
    return (
        <Stack direction='row'>
            <Typography variant='body2' color='grey.700'>
                {title}&nbsp;&nbsp;
                <Typography component='span' color='black' fontWeight={700} fontSize='20px'>
                    {time}
                </Typography>
            </Typography>
        </Stack>
    );
}
