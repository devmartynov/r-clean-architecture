import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {INotifyService} from '@/domain/services/notifier-service.ts';
import NotifyServiceImpl from '@/services/notify-service-impl.ts';
import {IProjectsRepository} from '@/domain/repositories/projects-repository.ts';
import ProjectRepositoryImpl from '@/data/project-repository-impl.ts';
import {ITasksRepository} from '@/domain/repositories/tasks-repository.ts';
import TasksRepositoryImpl from '@/data/tasks-repository-impl.ts';
import {IUseCases} from '@/domain/use-cases/use-cases.types.ts';
import {
   addTaskUseCase,
   deleteProjectUseCase,
   deleteTaskUseCase,
   getProjectsUseCase,
   getTasksUseCase,
   markTaskFinishedUseCase,
   hasProjectTasksUseCase
} from '@/domain/use-cases';
import UseCaseProvider from '@/ui/context/use-case.tsx';
import {ProjectsPage, ReportsPage, TimerPage} from '@/ui/pages';
import {Layout} from '@/ui/layout';

export default function createApp() {
   const notifier: INotifyService = new NotifyServiceImpl();
   const projectRepository: IProjectsRepository = new ProjectRepositoryImpl();
   const tasksRepository: ITasksRepository = new TasksRepositoryImpl();

   const useCases: IUseCases = {
      addTask: addTaskUseCase(tasksRepository, notifier),
      markTaskAsFinished: markTaskFinishedUseCase(tasksRepository, notifier),
      hasProjectTasks: hasProjectTasksUseCase(tasksRepository),
      deleteProject: deleteProjectUseCase(projectRepository, tasksRepository, notifier),
      deleteTask: deleteTaskUseCase(tasksRepository, notifier),
      getProjects: getProjectsUseCase(projectRepository),
      getTasks: getTasksUseCase(tasksRepository),
   };

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
