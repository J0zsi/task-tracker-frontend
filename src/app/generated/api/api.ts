export * from './tagController.service';
import { TagControllerService } from './tagController.service';
export * from './taskController.service';
import { TaskControllerService } from './taskController.service';
export * from './userController.service';
import { UserControllerService } from './userController.service';
export const APIS = [TagControllerService, TaskControllerService, UserControllerService];
