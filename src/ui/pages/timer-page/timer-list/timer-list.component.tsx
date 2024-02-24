import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {IconButton, styled} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {TimerStatistic} from '@/ui/pages/timer-page/timer-statistics';
import {ITimerListProps} from '@/ui/pages/timer-page/timer-list/timer-list.types.ts';
import {convertSecondsToHHMMSS} from '@/ui/pages/timer-page/timer-list/utils.ts';

export default function TimerList({items, onDelete}: ITimerListProps) {
    return (
        <Groups>
            {Object.entries(items).map(([date, data]) => (
                <Group key={date}>
                    <GroupHeader>
                        {date}
                        <TimerStatistic
                            title='Всего:'
                            time={convertSecondsToHHMMSS(data.totalTime)}
                        />
                    </GroupHeader>
                    <TasksList>
                        {data.tasks.map(task => (
                            <Task key={task.uid}>
                                <ListItemText
                                    primary={task.title}
                                    secondary={task.description}
                                />
                                <IconButton onClick={() => onDelete(task.uid)}>
                                    <Delete/>
                                </IconButton>
                            </Task>
                        ))}
                    </TasksList>
                </Group>
            ))}
        </Groups>
    );
}

const Groups = styled(List)({
    maxWidth: '100%',
});

const Task = styled(ListItem)(({theme}) => ({
    width: '100%',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    color: 'black',
    '&:not(&:last-child)': {
        borderBottom: `1px solid ${theme.palette.grey[300]}`
    }
}));

const TasksList = styled(List)({
    width: '100%',
    backgroundColor: 'white',
    padding: 0,
});

const Group = styled('div')(({theme}) => ({
    width: '100%',
    border: `1px solid ${theme.palette.grey[400]}`,
    borderBottomWidth: '8px',
    '&:not(&:last-child)': {
        marginBottom: '24px',
    }
}));

const GroupHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: theme.palette.text.secondary,
    height: '40px',
    padding: '8px 16px',
    backgroundColor: theme.palette.grey[300],
    borderBottom: `1px solid ${theme.palette.grey[400]}`
}));
