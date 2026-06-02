import { User, Project, Task, Activity, Notification } from './types'

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    joinDate: new Date('2024-01-15'),
    department: 'Management'
  },
  {
    id: 'user-2',
    name: 'Mike Chen',
    email: 'mike@example.com',
    role: 'manager',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    joinDate: new Date('2024-02-20'),
    department: 'Engineering'
  },
  {
    id: 'user-3',
    name: 'Emily Rodriguez',
    email: 'emily@example.com',
    role: 'user',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    joinDate: new Date('2024-03-10'),
    department: 'Design'
  },
  {
    id: 'user-4',
    name: 'James Wilson',
    email: 'james@example.com',
    role: 'user',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    joinDate: new Date('2024-03-15'),
    department: 'Engineering'
  },
  {
    id: 'user-5',
    name: 'Lisa Anderson',
    email: 'lisa@example.com',
    role: 'manager',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    joinDate: new Date('2024-01-20'),
    department: 'Marketing'
  }
]

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'Website Redesign',
    description: 'Complete redesign of the company website with modern UI/UX',
    status: 'active',
    startDate: new Date('2024-04-01'),
    endDate: new Date('2024-06-30'),
    progress: 65,
    teamMembers: ['user-2', 'user-3', 'user-4'],
    createdBy: 'user-1',
    createdAt: new Date('2024-04-01'),
    updatedAt: new Date('2024-05-15')
  },
  {
    id: 'proj-2',
    name: 'Mobile App Launch',
    description: 'Launch new mobile application across iOS and Android',
    status: 'active',
    startDate: new Date('2024-03-15'),
    endDate: new Date('2024-07-31'),
    progress: 40,
    teamMembers: ['user-2', 'user-4'],
    createdBy: 'user-1',
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-05-16')
  },
  {
    id: 'proj-3',
    name: 'API Integration',
    description: 'Integrate third-party payment and analytics APIs',
    status: 'active',
    startDate: new Date('2024-05-01'),
    endDate: new Date('2024-06-15'),
    progress: 80,
    teamMembers: ['user-4'],
    createdBy: 'user-2',
    createdAt: new Date('2024-05-01'),
    updatedAt: new Date('2024-05-14')
  },
  {
    id: 'proj-4',
    name: 'Brand Guidelines',
    description: 'Create comprehensive brand guidelines and style system',
    status: 'completed',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-03-31'),
    progress: 100,
    teamMembers: ['user-3', 'user-5'],
    createdBy: 'user-1',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-03-31')
  },
  {
    id: 'proj-5',
    name: 'Database Optimization',
    description: 'Optimize database queries and improve application performance',
    status: 'active',
    startDate: new Date('2024-05-10'),
    endDate: new Date('2024-06-10'),
    progress: 55,
    teamMembers: ['user-2', 'user-4'],
    createdBy: 'user-2',
    createdAt: new Date('2024-05-10'),
    updatedAt: new Date('2024-05-16')
  }
]

export const mockTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Create homepage wireframe',
    description: 'Design wireframes for the new homepage layout',
    projectId: 'proj-1',
    status: 'completed',
    priority: 'high',
    assigneeId: 'user-3',
    dueDate: new Date('2024-05-10'),
    createdBy: 'user-2',
    createdAt: new Date('2024-04-05'),
    updatedAt: new Date('2024-05-08'),
    attachments: ['wireframe-v1.pdf'],
    comments: []
  },
  {
    id: 'task-2',
    title: 'Frontend implementation',
    description: 'Implement the homepage using React and Tailwind CSS',
    projectId: 'proj-1',
    status: 'in-progress',
    priority: 'high',
    assigneeId: 'user-4',
    dueDate: new Date('2024-05-25'),
    createdBy: 'user-2',
    createdAt: new Date('2024-04-10'),
    updatedAt: new Date('2024-05-15'),
    attachments: [],
    comments: []
  },
  {
    id: 'task-3',
    title: 'Setup CI/CD pipeline',
    description: 'Configure GitHub Actions for automated testing and deployment',
    projectId: 'proj-3',
    status: 'in-progress',
    priority: 'high',
    assigneeId: 'user-4',
    dueDate: new Date('2024-05-20'),
    createdBy: 'user-2',
    createdAt: new Date('2024-05-01'),
    updatedAt: new Date('2024-05-12'),
    attachments: [],
    comments: []
  },
  {
    id: 'task-4',
    title: 'iOS app development',
    description: 'Develop core features for iOS version of the mobile app',
    projectId: 'proj-2',
    status: 'in-progress',
    priority: 'urgent',
    assigneeId: 'user-2',
    dueDate: new Date('2024-06-15'),
    createdBy: 'user-1',
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date('2024-05-16'),
    attachments: [],
    comments: []
  },
  {
    id: 'task-5',
    title: 'Android app development',
    description: 'Develop core features for Android version of the mobile app',
    projectId: 'proj-2',
    status: 'todo',
    priority: 'high',
    assigneeId: 'user-4',
    dueDate: new Date('2024-06-20'),
    createdBy: 'user-1',
    createdAt: new Date('2024-03-25'),
    updatedAt: new Date('2024-05-10'),
    attachments: [],
    comments: []
  },
  {
    id: 'task-6',
    title: 'Integrate Stripe payment',
    description: 'Add Stripe payment gateway to the checkout flow',
    projectId: 'proj-3',
    status: 'completed',
    priority: 'high',
    assigneeId: 'user-4',
    dueDate: new Date('2024-05-15'),
    createdBy: 'user-2',
    createdAt: new Date('2024-05-02'),
    updatedAt: new Date('2024-05-14'),
    attachments: ['stripe-integration-docs.pdf'],
    comments: []
  },
  {
    id: 'task-7',
    title: 'Create color palette',
    description: 'Design color palette and define color usage guidelines',
    projectId: 'proj-4',
    status: 'completed',
    priority: 'medium',
    assigneeId: 'user-3',
    dueDate: new Date('2024-03-10'),
    createdBy: 'user-1',
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-03-08'),
    attachments: ['colors.figma'],
    comments: []
  },
  {
    id: 'task-8',
    title: 'Design system documentation',
    description: 'Write comprehensive documentation for the design system',
    projectId: 'proj-4',
    status: 'completed',
    priority: 'medium',
    assigneeId: 'user-5',
    dueDate: new Date('2024-03-20'),
    createdBy: 'user-1',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-03-18'),
    attachments: ['design-system-v1.pdf'],
    comments: []
  },
  {
    id: 'task-9',
    title: 'Database indexing',
    description: 'Add indexes to frequently queried columns',
    projectId: 'proj-5',
    status: 'in-progress',
    priority: 'high',
    assigneeId: 'user-2',
    dueDate: new Date('2024-05-28'),
    createdBy: 'user-2',
    createdAt: new Date('2024-05-10'),
    updatedAt: new Date('2024-05-15'),
    attachments: [],
    comments: []
  },
  {
    id: 'task-10',
    title: 'Query optimization',
    description: 'Identify and optimize slow running queries',
    projectId: 'proj-5',
    status: 'todo',
    priority: 'high',
    assigneeId: 'user-4',
    dueDate: new Date('2024-06-05'),
    createdBy: 'user-2',
    createdAt: new Date('2024-05-12'),
    updatedAt: new Date('2024-05-16'),
    attachments: [],
    comments: []
  },
  {
    id: 'task-11',
    title: 'User testing',
    description: 'Conduct user testing sessions for the new website',
    projectId: 'proj-1',
    status: 'todo',
    priority: 'medium',
    assigneeId: 'user-3',
    dueDate: new Date('2024-06-10'),
    createdBy: 'user-2',
    createdAt: new Date('2024-04-20'),
    updatedAt: new Date('2024-05-10'),
    attachments: [],
    comments: []
  },
  {
    id: 'task-12',
    title: 'API documentation',
    description: 'Document all API endpoints and request/response formats',
    projectId: 'proj-3',
    status: 'todo',
    priority: 'medium',
    assigneeId: 'user-4',
    dueDate: new Date('2024-06-10'),
    createdBy: 'user-2',
    createdAt: new Date('2024-05-05'),
    updatedAt: new Date('2024-05-16'),
    attachments: [],
    comments: []
  }
]

export const mockActivities: Activity[] = [
  {
    id: 'act-1',
    type: 'task-created',
    userId: 'user-2',
    description: 'Created task "Frontend implementation"',
    resourceId: 'task-2',
    createdAt: new Date('2024-05-16T10:30:00')
  },
  {
    id: 'act-2',
    type: 'task-updated',
    userId: 'user-4',
    description: 'Updated task "iOS app development" status to in-progress',
    resourceId: 'task-4',
    createdAt: new Date('2024-05-16T09:15:00')
  },
  {
    id: 'act-3',
    type: 'comment-added',
    userId: 'user-3',
    description: 'Commented on "Create homepage wireframe"',
    resourceId: 'task-1',
    createdAt: new Date('2024-05-15T14:20:00')
  },
  {
    id: 'act-4',
    type: 'project-updated',
    userId: 'user-1',
    description: 'Updated project "Website Redesign" progress to 65%',
    resourceId: 'proj-1',
    createdAt: new Date('2024-05-15T11:00:00')
  },
  {
    id: 'act-5',
    type: 'member-added',
    userId: 'user-1',
    description: 'Added Sarah Johnson to project "Mobile App Launch"',
    resourceId: 'proj-2',
    createdAt: new Date('2024-05-14T16:45:00')
  },
  {
    id: 'act-6',
    type: 'task-created',
    userId: 'user-2',
    description: 'Created task "Query optimization"',
    resourceId: 'task-10',
    createdAt: new Date('2024-05-12T13:30:00')
  },
  {
    id: 'act-7',
    type: 'task-updated',
    userId: 'user-4',
    description: 'Completed task "Integrate Stripe payment"',
    resourceId: 'task-6',
    createdAt: new Date('2024-05-14T10:20:00')
  },
  {
    id: 'act-8',
    type: 'project-created',
    userId: 'user-2',
    description: 'Created project "Database Optimization"',
    resourceId: 'proj-5',
    createdAt: new Date('2024-05-10T09:00:00')
  }
]

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'user-4',
    title: 'Task assigned',
    message: 'You have been assigned to "iOS app development"',
    read: false,
    createdAt: new Date('2024-05-16T10:00:00')
  },
  {
    id: 'notif-2',
    userId: 'user-2',
    title: 'Project update',
    message: 'Website Redesign project is now 65% complete',
    read: false,
    createdAt: new Date('2024-05-15T11:00:00')
  },
  {
    id: 'notif-3',
    userId: 'user-3',
    title: 'Comment on task',
    message: 'James Wilson commented on "Create homepage wireframe"',
    read: true,
    createdAt: new Date('2024-05-15T14:20:00')
  },
  {
    id: 'notif-4',
    userId: 'user-1',
    title: 'New project created',
    message: 'Database Optimization project has been created',
    read: true,
    createdAt: new Date('2024-05-10T09:00:00')
  }
]
