import {useEffect, useState} from 'react';
import {INewTask} from '@/domain/entities/task.ts';
import {useUseCases} from '@/ui/context/use-case.tsx';
import {TimerList} from '@/ui/pages/timer-page/timer-list';
import {Timer} from '@/ui/pages/timer-page/timer';
import {IGroupedTasks} from '@/domain/use-cases/use-cases.types.ts';

export default function TimerPage() {
    const [tasks, setTasks] = useState<IGroupedTasks>({});
    const {getTasks, addTask, markTaskAsFinished, deleteTask} = useUseCases();

    useEffect(() => {
       setTasks(getTasks());
    }, [])

    const addTaskAndRefreshList = (task: INewTask) => {
        const createdTask = addTask(task);
        setTasks(getTasks());
        return createdTask;
    }

    const markTaskAsFinishedAndRefreshList = (uid: string) => {
        markTaskAsFinished(uid);
        setTasks(getTasks());
    }

    const deleteTaskAndRefreshList = (uid: string, forceDelete?: boolean) => {
        deleteTask(uid, forceDelete);
        setTasks(getTasks());
    }

    return (
        <>
            <Timer
                deleteTask={deleteTaskAndRefreshList}
                addTask={addTaskAndRefreshList}
                markTaskAsFinished={markTaskAsFinishedAndRefreshList}
            />
            <TimerList
                items={tasks}
                onDelete={deleteTaskAndRefreshList}
            />
        </>
    );
}
