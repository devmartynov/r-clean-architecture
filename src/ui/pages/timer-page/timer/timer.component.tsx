import {useRef, useState} from 'react';
import {Typography, Button, Divider, Stack, styled, TextField} from '@mui/material';
import {useStopwatch} from 'react-timer-hook';
import {ITaskEntity} from '@/domain/entities/task.ts';
import {IProjectEntity} from '@/domain/entities/project.ts';
import {ITimerProps} from '@/ui/pages/timer-page/timer/timer.types.ts';
import {ProjectField} from '@/ui/pages/timer-page/project-field';
import {formatTimeDigit} from '@/ui/pages/timer-page/utils.ts';
import {DeleteTimerButton} from '@/ui/pages/timer-page/delete-timer-button';

export default function Timer({addTask, deleteTask, markTaskAsFinished}: ITimerProps) {
    const contextTaskRef = useRef<ITaskEntity | null>(null);
    const [taskName, setTaskName] = useState('');
    const {seconds, minutes, hours, isRunning, start, reset} = useStopwatch();

    const onProjectClick = (project: IProjectEntity) => {
        console.log(project);
        // todo
    };

    const toggleTimer = () => {
        if (isRunning) {
            markTaskAsFinished(contextTaskRef.current!.uid);
            reset(undefined, false);
            setTaskName('');
            contextTaskRef.current = null;
        } else {
            contextTaskRef.current = addTask({
                title: taskName || 'Без названия',
                startedAt: Date.now(),
            });
            start();
        }
    };

    const onDeleteTimer = () => {
        deleteTask(contextTaskRef.current!.uid, true);
        reset(undefined, false);
        setTaskName('');
        contextTaskRef.current = null;
    }

    return (
        <Container gap={2}>
            <Input
                placeholder="Над чем ты работаешь?"
                size="small"
                onChange={e => setTaskName(e.target.value)}
            />
            <ProjectField onClick={onProjectClick}/>
            <Divider orientation="vertical"/>
            <Digits>
                {formatTimeDigit(hours)}:{formatTimeDigit(minutes)}:{formatTimeDigit(seconds)}
            </Digits>
            <Divider orientation="vertical"/>
            <ToggleBtn
                variant="contained"
                color={isRunning ? 'error' : 'primary'}
                onClick={toggleTimer}
            >
                {isRunning ? 'Стоп' : 'Начать'}
            </ToggleBtn>
            {isRunning && (
                <DeleteTimerButton onDelete={onDeleteTimer}/>
            )}
        </Container>
    );
}

const ToggleBtn = styled(Button)({width: '100px'});

const Input = styled(TextField)({flexGrow: 1});

const Digits = styled(Typography)({
    fontWeight: 700,
    fontSize: '16px',
    color: 'black',
});

const Container = styled(Stack)(({theme}) => ({
    flexDirection: 'row',
    height: '60px',
    padding: '8px',
    boxSizing: 'border-box',
    alignItems: 'center',
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: 'white',
    marginBottom: '60px',
}));
