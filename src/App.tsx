import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NotifyServiceImpl from '@/services/notify-service-impl.ts';
import ProjectRepositoryImpl from '@/data/project-repository-impl.ts';
import TasksRepositoryImpl from '@/data/tasks-repository-impl.ts';
import UserRepositoryImpl from '@/data/user-repository-impl.ts';
import {IUseCases} from '@/domain/use-cases/use-cases.types.ts';
import {
   addTaskUseCase,
   deleteProjectUseCase,
   deleteTaskUseCase,
   getProjectsUseCase,
   getTasksUseCase,
   markTaskFinishedUseCase,
   hasProjectTasksUseCase,
   getUserUseCase,
   setUserUseCase,
} from '@/domain/use-cases';
import UseCaseProvider from '@/ui/context/use-case.tsx';
import {ProjectsPage, ReportsPage, TimerPage} from '@/ui/pages';
import {Layout} from '@/ui/layout';
import {mockUser} from '@/ui/layout/header/utils.ts';

export default function createApp() {
   const notifier = new NotifyServiceImpl();
   const projectRepository = new ProjectRepositoryImpl();
   const tasksRepository = new TasksRepositoryImpl();
   const userRepository = new UserRepositoryImpl();

   const useCases: IUseCases = {
      addTask: addTaskUseCase(tasksRepository, userRepository, notifier),
      markTaskAsFinished: markTaskFinishedUseCase(tasksRepository, notifier),
      hasProjectTasks: hasProjectTasksUseCase(tasksRepository),
      deleteProject: deleteProjectUseCase(projectRepository, tasksRepository, notifier),
      deleteTask: deleteTaskUseCase(tasksRepository, notifier),
      getProjects: getProjectsUseCase(projectRepository),
      getTasks: getTasksUseCase(tasksRepository),
      setUser: setUserUseCase(userRepository),
      getUser: getUserUseCase(userRepository),
   };

   // todo это должно происходить после аутентификации. Удалить после добавления аутентификации
   useCases.setUser(mockUser);

   return (
       <UseCaseProvider useCases={useCases}>
          <Router>
             <Layout>
                <Routes>
                   <Route path="/projects" element={<ProjectsPage/>} />
                   <Route path="/reports" element={<ReportsPage/>} />
                   <Route path="/" element={<TimerPage/>} />
                </Routes>
             </Layout>
          </Router>
       </UseCaseProvider>
   );
}
