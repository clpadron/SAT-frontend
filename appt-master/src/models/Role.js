export class Role {
  getRoles() {
    return [
      {
        name: 'Admin',
        id: 'ROLE_ADMIN'
      },
      {
        name: 'Student',
        id: 'ROLE_STUDENT'
      },
      {
        name: 'School admin',
        id: 'ROLE_SCHOOLADMIN'
      },
      {
        name: 'School organizer',
        id: 'ROLE_SCHOOLORG'
      },
      {
        name: 'Enterprise admin',
        id: 'ROLE_ORGADMIN'
      },
      {
        name: 'Mentor',
        id: 'ROLE_MENTOR'
      }
    ]
  }
}
