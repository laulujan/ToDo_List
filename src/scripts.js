import Project from './Project'
import Todo from './Todo'

const projectsPage = () => {
  if (!localStorage.getItem('projects')) {
    localStorage.setItem('projects', '[]')
  }

  let projects = JSON.parse(localStorage.getItem('projects'))

  const setLocalStorage = () => {
    localStorage.setItem('projects', JSON.stringify(projects))
  }

  const createInitialProject = () => {
    const defaultProject = Project('Default Project')

    const firstTodo = Todo(
      'Update Resume',
      'Update my resume with my current employment information',
      '2021-02-27',
      'high'
    )
    defaultProject.todos.push(firstTodo)

    defaultProject.todos.push(
      Todo('Finalize budget', 'March personal budget', '2021-02-27', 'medium')
    )

    defaultProject.todos.push(
      Todo(
        'Change profile picture',
        "Update social media's profile picture",
        '2021-12-31',
        'low'
      )
    )

    projects.push(defaultProject)
    setLocalStorage()
  }

  if (projects.length < 1) {
    createInitialProject()
  }

  const removeElement = (parent, element) => {
    if (element) {
      parent.removeChild(element)
    }
  }

  const createProjectCardHeader = (projectObj, parentProject) => {
    const projectHeader = document.createElement('header')
    projectHeader.classList.add('project-header')
    createProjectTitle(projectObj, projectHeader)
    createProjectUtils(projectHeader)
    parentProject.appendChild(projectHeader)
  }

  const createProjectUtils = parentElement => {
    const utilContainer = document.createElement('div')
    utilContainer.classList.add('project-utils')
    createProjectEditBtn(utilContainer)
    createProjectDeleteBtn(utilContainer)
    parentElement.appendChild(utilContainer)
  }

  const updateProjectTitle = e => {
    e.preventDefault()
    const newTitle = document.querySelector('#edit-project-title-input')
    const projectCard = e.target.closest('.project-card')
    const header = projectCard.querySelector('.project-header')
    const projectTitle = projectCard.querySelector('.project-title')
    const editProjectTitleForm = projectCard.querySelector(
      '.edit-project-title-form'
    )
    projectTitle.textContent = newTitle.value
    projectCard.removeChild(editProjectTitleForm)
    header.style.display = 'flex'
    const project = projects.find(project => project.id === projectCard.id)
    project.title = newTitle.value
    setLocalStorage()
  }

  const openEditProject = e => {
    const projectCard = e.target.closest('.project-card')
    const projectHeader = e.target.closest('.project-header')
    const currentTitle = projectHeader.querySelector('.project-title')
    const editProjectTitleForm = document.createElement('form')
    editProjectTitleForm.classList.add('edit-project-title-form')
    const titleInput = document.createElement('input')
    titleInput.classList.add('edit-project-input')
    titleInput.id = 'edit-project-title-input'
    titleInput.placeholder = currentTitle.textContent
    titleInput.required = true
    editProjectTitleForm.appendChild(titleInput)
    editProjectTitleForm.addEventListener('submit', updateProjectTitle)
    projectHeader.style.display = 'none'
    projectCard.prepend(editProjectTitleForm)
  }

  const createProjectEditBtn = parentElement => {
    const editBtn = document.createElement('button')
    editBtn.classList.add('project-edit-btn')
    const faEdit = document.createElement('i')
    faEdit.classList.add('fas')
    faEdit.classList.add('fa-pen')
    editBtn.addEventListener('click', openEditProject)
    editBtn.appendChild(faEdit)
    parentElement.appendChild(editBtn)
  }

  const deleteProject = e => {
    const main = document.querySelector('main')
    const parentProject = e.target.closest('.project-card')
    projects = projects.filter(project => project.id !== parentProject.id)
    main.removeChild(parentProject)
    setLocalStorage()
  }

  const createProjectDeleteBtn = parentElement => {
    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('project-delete-btn')
    const faDelete = document.createElement('i')
    faDelete.classList.add('fas')
    faDelete.classList.add('fa-trash')
    deleteBtn.appendChild(faDelete)
    deleteBtn.addEventListener('click', deleteProject)
    parentElement.appendChild(deleteBtn)
  }

  const createProjectTitle = (projectObj, parentElement) => {
    const projectTitle = document.createElement('h3')
    projectTitle.classList.add('project-title')
    projectTitle.textContent = projectObj.title
    parentElement.appendChild(projectTitle)
  }

  const createEditTitleInput = (todo, parentElement) => {
    const container = document.createElement('div')
    container.classList.add('edit-todo-container')
    const label = document.createElement('label')
    label.classList.add('edit-todo-label')
    label.htmlFor = 'edit-todo-title'
    label.textContent = 'Todo title:'
    container.appendChild(label)
    const input = document.createElement('input')
    input.classList.add('edit-todo-input')
    input.type = 'text'
    input.id = 'edit-todo-title'
    input.setAttribute('maxlength', '23')
    input.placeholder = todo.title
    input.value = todo.title
    input.required = true
    container.appendChild(input)
    parentElement.appendChild(container)
  }

  const createEditDescriptionInput = (todo, parentElement) => {
    const container = document.createElement('div')
    container.classList.add('edit-todo-container')
    const label = document.createElement('label')
    label.classList.add('edit-todo-label')
    label.htmlFor = 'edit-todo-description'
    label.textContent = 'Todo description:'
    container.appendChild(label)
    const input = document.createElement('input')
    input.classList.add('edit-todo-input')
    input.type = 'text'
    input.id = 'edit-todo-description'
    input.placeholder = todo.description
    input.value = todo.description
    input.required = true
    container.appendChild(input)
    parentElement.appendChild(container)
  }

  const createEditDueDateInput = (todo, parentElement) => {
    const container = document.createElement('div')
    container.classList.add('edit-todo-container')
    const label = document.createElement('label')
    label.classList.add('edit-todo-label')
    label.htmlFor = 'edit-todo-due-date'
    label.textContent = 'Due date:'
    container.appendChild(label)
    const input = document.createElement('input')
    input.classList.add('edit-todo-input')
    input.type = 'date'
    input.id = 'edit-todo-due-date'
    input.value = todo.due
    input.min = setTodayAsMinimumDueDate()
    input.required = true
    container.appendChild(input)
    parentElement.appendChild(container)
  }

  const createEditPriorityInput = (todo, parentElement) => {
    const container = document.createElement('div')
    container.classList.add('edit-todo-container')
    const label = document.createElement('label')
    label.classList.add('edit-todo-label')
    label.textContent = 'Priority level:'
    label.htmlFor = 'edit-todo-priority'
    const input = document.createElement('select')
    input.classList.add('edit-todo-input')
    input.id = 'edit-todo-priority'
    input.required = true
    const highOption = document.createElement('option')
    highOption.value = 'high'
    highOption.textContent = 'high'
    const mediumOption = document.createElement('option')
    mediumOption.value = 'medium'
    mediumOption.textContent = 'medium'
    const lowOption = document.createElement('option')
    lowOption.value = 'low'
    lowOption.textContent = 'low'
    switch (todo.priority) {
      case 'high':
        highOption.selected = true
        break
      case 'medium':
        mediumOption.selected = true
        break
      case 'low':
        lowOption.selected = true
        break
    }
    input.appendChild(highOption)
    input.appendChild(mediumOption)
    input.appendChild(lowOption)
    container.appendChild(label)
    container.appendChild(input)
    parentElement.appendChild(container)
  }

  const updateProjectTodo = (
    projectId,
    todoId,
    title,
    description,
    dueDate,
    priority
  ) => {
    const projectToChange = projects.find(project => project.id === projectId)
    const todoToChange = projectToChange.todos.find(todo => todo.id === todoId)
    todoToChange.title = title
    todoToChange.description = description
    todoToChange.due = dueDate
    todoToChange.priority = priority
  }

  const updateDOMTodo = (todo, title, description, dueDate, priority) => {
    const task = todo.querySelector('.todo-item-task')
    task.textContent = title
    const todoDescription = todo.querySelector('.todo-description')
    todoDescription.textContent = description
    const todoDue = todo.querySelector('.todo-due')
    todoDue.textContent = formateDate(dueDate)
    const priorityMarker = todo.querySelector('.priority-marker')
    priorityMarker.textContent = priority
    priorityMarker.className = `priority-marker ${priority}`
  }

  const updateTodos = (
    todoItem,
    projectId,
    todoId,
    title,
    description,
    dueDate,
    priority
  ) => {
    updateProjectTodo(projectId, todoId, title, description, dueDate, priority)
    updateDOMTodo(todoItem, title, description, dueDate, priority)
  }

  const handleEditSubmit = e => {
    e.preventDefault()
    const parentProject = e.target.closest('.project-card')
    const editTodoForm = e.target.closest('.edit-todo-form')
    const updatedTitle = editTodoForm.querySelector('#edit-todo-title')
    const updatedDescription = editTodoForm.querySelector(
      '#edit-todo-description'
    )
    const updatedDueDate = editTodoForm.querySelector('#edit-todo-due-date')
    const updatedPriority = editTodoForm.querySelector('#edit-todo-priority')
    const todoItem = editTodoForm.nextElementSibling
    updateTodos(
      todoItem,
      parentProject.id,
      todoItem.id,
      updatedTitle.value,
      updatedDescription.value,
      updatedDueDate.value,
      updatedPriority.value
    )
    editTodoForm.parentElement.removeChild(editTodoForm)
    todoItem.style.display = 'unset'
    setLocalStorage()
  }

  const createEditTodoForm = todo => {
    const editForm = document.createElement('form')
    editForm.classList.add('edit-todo-form')
    createEditTitleInput(todo, editForm)
    createEditDescriptionInput(todo, editForm)
    createEditDueDateInput(todo, editForm)
    createEditPriorityInput(todo, editForm)
    const updateTodoBtn = document.createElement('button')
    updateTodoBtn.classList.add('update-todo-btn')
    updateTodoBtn.textContent = 'Update todo'
    editForm.appendChild(updateTodoBtn)
    editForm.addEventListener('submit', handleEditSubmit)
    return editForm
  }

  const openEditTodo = e => {
    const parentProject = e.target.closest('.project-card')
    const todoList = e.target.closest('.todo-list')
    const todoItem = e.target.closest('.todo-item')
    const project = projects.find(project => project.id === parentProject.id)
    const todo = project.todos.find(todo => todo.id === todoItem.id)
    const editTodoForm = createEditTodoForm(todo)
    todoList.insertBefore(editTodoForm, todoItem)
    todoItem.style.display = 'none'
  }

  const createEditBtn = parentElement => {
    const editBtn = document.createElement('button')
    editBtn.classList.add('todo-edit-btn')
    const faEdit = document.createElement('i')
    faEdit.classList.add('fas')
    faEdit.classList.add('fa-pen')
    editBtn.appendChild(faEdit)
    editBtn.addEventListener('click', openEditTodo)
    parentElement.appendChild(editBtn)
  }

  const updateNumTodos = (parentProject, todoArrayLength) => {
    const numTodos = parentProject.querySelector('.num-todos')
    numTodos.textContent = `${todoArrayLength} todo${
      todoArrayLength === 1 ? '' : 's'
    }`
  }

  const deleteTodo = e => {
    const parentProject = e.target.closest('.project-card')
    const parentTodo = e.target.closest('.todo-item')
    const project = projects.find(project => project.id === parentProject.id)
    project.todos = project.todos.filter(todo => todo.id !== parentTodo.id)
    const projectTodoList = parentProject.querySelector('.todo-list')
    projectTodoList.removeChild(parentTodo)
    updateNumTodos(parentProject, project.todos.length)
    setLocalStorage()
  }

  const createDeleteBtn = parentElement => {
    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('todo-delete-btn')
    const faDelete = document.createElement('i')
    faDelete.classList.add('fas')
    faDelete.classList.add('fa-trash')
    deleteBtn.appendChild(faDelete)
    deleteBtn.addEventListener('click', deleteTodo)
    parentElement.appendChild(deleteBtn)
  }

  const createTodoUtilBtns = parentElement => {
    const utilContainer = document.createElement('div')
    utilContainer.classList.add('todo-item-utils')
    createEditBtn(utilContainer)
    createDeleteBtn(utilContainer)
    parentElement.appendChild(utilContainer)
  }

  const createCheckbox = parentElement => {
    const todoCheck = document.createElement('input')
    todoCheck.type = 'checkbox'
    todoCheck.classList.add('todo-check')
    parentElement.appendChild(todoCheck)
  }

  const handleTodoClick = e => {
    toggleTodoDescription(e)
    toggleTodoUtilButtons(e)
  }

  const toggleOpacity = element => {
    if (!element.style.opacity || element.style.opacity === '0') {
      element.style.opacity = 1
      element.style.pointerEvents = 'unset'
    } else {
      element.style.opacity = 0
      element.style.pointerEvents = 'none'
    }
  }

  const toggleTodoUtilButtons = e => {
    const utilButtons = e.target.nextElementSibling.nextElementSibling
    toggleOpacity(utilButtons)
  }

  const toggleTodoDescription = e => {
    const todoDescription = e.target.closest('.todo-item').children[1]
    if (
      !todoDescription.style.display ||
      todoDescription.style.display === 'none'
    ) {
      todoDescription.style.display = 'block'
    } else {
      todoDescription.style.display = 'none'
    }
  }

  const createTodoTask = (todo, parentElement) => {
    const todoItemTask = document.createElement('h3')
    todoItemTask.classList.add('todo-item-task')
    todoItemTask.textContent = todo.title
    todoItemTask.addEventListener('click', handleTodoClick)
    parentElement.appendChild(todoItemTask)
  }

  const createPriorityMarker = (todo, parentElement) => {
    const priorityMarker = document.createElement('div')
    priorityMarker.classList.add('priority-marker')
    priorityMarker.textContent = todo.priority
    switch (todo.priority) {
      case 'low':
        priorityMarker.classList.add('low')
        break
      case 'medium':
        priorityMarker.classList.add('medium')
        break
      case 'high':
        priorityMarker.classList.add('high')
        break
    }
    parentElement.appendChild(priorityMarker)
  }

  const createTodoContainer = (todo, parentElement) => {
    const todoItemContainer = document.createElement('div')
    todoItemContainer.classList.add('todo-item-container')
    createCheckbox(todoItemContainer)
    createTodoTask(todo, todoItemContainer)
    createPriorityMarker(todo, todoItemContainer)
    createTodoUtilBtns(todoItemContainer)
    parentElement.appendChild(todoItemContainer)
  }

  const formateDate = date => {
    const dateArray = date.split('-')
    const flippedDateArray = dateArray.reverse()
    const formattedDate = flippedDateArray.join('/')
    return formattedDate
  }

  const createTodoInfo = (todo, parentElement) => {
    const todoInfo = document.createElement('div')
    todoInfo.classList.add('todo-info')
    const todoDescription = document.createElement('div')
    todoDescription.classList.add('todo-description')
    todoDescription.textContent = todo.description
    todoInfo.appendChild(todoDescription)
    const todoDue = document.createElement('div')
    todoDue.classList.add('todo-due')
    todoDue.textContent = `Due: ${formateDate(todo.due)}`
    todoInfo.appendChild(todoDue)
    parentElement.appendChild(todoInfo)
  }

  const createTodo = (todo, parentElement) => {
    const todoItem = document.createElement('li')
    todoItem.classList.add('todo-item')
    todoItem.id = todo.id
    createTodoContainer(todo, todoItem)
    createTodoInfo(todo, todoItem)
    parentElement.appendChild(todoItem)
  }

  const createProjectTodos = (projectTodos, parentProject) => {
    const todoList = document.createElement('ul')
    todoList.classList.add('todo-list')
    for (let i = 0; i < projectTodos.length; i++) {
      createTodo(projectTodos[i], todoList)
    }
    parentProject.appendChild(todoList)
  }

  const resetElementRotation = element => {
    element.style.transform = 'rotate(0deg)'
  }

  const rotateElement = element => {
    if (
      !element.style.transform ||
      element.style.transform === 'rotate(0deg)'
    ) {
      element.style.transform = 'rotate(45deg)'
    } else {
      element.style.transform = 'rotate(0deg)'
    }
  }

  const toggleProjectUtilButtons = parentElement => {
    const utilButtons = parentElement.querySelector('.project-utils')
    toggleOpacity(utilButtons)
  }

  const handleProjectBtnClick = e => {
    const parent = e.target.closest('.project-card')
    const addTodoBtn = parent.querySelector('.fa-plus')
    parent.classList.toggle('hide-todo-list')
    e.target.classList.toggle('flip')
    toggleProjectUtilButtons(parent)
    resetElementRotation(addTodoBtn)
    const todoForm = parent.querySelector('.new-todo-form')
    removeElement(parent, todoForm)
  }

  const createFooterNums = (projectObj, parentElement) => {
    const numTodos = document.createElement('p')
    numTodos.classList.add('num-todos')
    numTodos.textContent = `${projectObj.todos.length} todo${
      projectObj.todos.length === 1 ? '' : 's'
    }`
    parentElement.appendChild(numTodos)
  }

  const createNewTodoFormTitleInput = parentElement => {
    const newTitleContainer = document.createElement('div')
    newTitleContainer.classList.add('new-todo-form-container')
    const newTodoFormTitleLabel = document.createElement('label')
    newTodoFormTitleLabel.classList.add('new-todo-form-label')
    newTodoFormTitleLabel.htmlFor = 'new-todo-form-title-input'
    newTodoFormTitleLabel.textContent = 'Todo title:'
    const newTodoFormTitleInput = document.createElement('input')
    newTodoFormTitleInput.classList.add('new-todo-form-input')
    newTodoFormTitleInput.type = 'text'
    newTodoFormTitleInput.setAttribute('maxlength', '23')
    newTodoFormTitleInput.id = 'new-todo-form-title-input'
    newTodoFormTitleInput.required = true
    newTitleContainer.appendChild(newTodoFormTitleLabel)
    newTitleContainer.appendChild(newTodoFormTitleInput)
    parentElement.appendChild(newTitleContainer)
  }

  const createNewTodoFormDescriptionInput = parentElement => {
    const newDescriptionContainer = document.createElement('div')
    newDescriptionContainer.classList.add('new-todo-form-container')
    const newTodoFormDescriptionLabel = document.createElement('label')
    newTodoFormDescriptionLabel.classList.add('new-todo-form-label')
    newTodoFormDescriptionLabel.htmlFor = 'new-todo-form-description-input'
    newTodoFormDescriptionLabel.textContent = 'Todo description:'
    const newTodoFormDescriptionInput = document.createElement('input')
    newTodoFormDescriptionInput.type = 'text'
    newTodoFormDescriptionInput.classList.add('new-todo-form-input')
    newTodoFormDescriptionInput.id = 'new-todo-form-description-input'
    newTodoFormDescriptionInput.required = true
    newDescriptionContainer.appendChild(newTodoFormDescriptionLabel)
    newDescriptionContainer.appendChild(newTodoFormDescriptionInput)
    parentElement.appendChild(newDescriptionContainer)
  }

  const setTodayAsMinimumDueDate = () => {
    const today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth() + 1 // Months act like an array so Jan is 0, etc.
    const yyyy = today.getFullYear()
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    const todayFormatted = `${yyyy}-${mm}-${dd}`
    return todayFormatted
  }

  const createNewTodoFormDueDateInput = parentElement => {
    const newDueDateContainer = document.createElement('div')
    newDueDateContainer.classList.add('new-todo-form-container')
    const newTodoFormDueDateLabel = document.createElement('label')
    newTodoFormDueDateLabel.classList.add('new-todo-form-label')
    newTodoFormDueDateLabel.htmlFor = 'new-todo-form-due-date-input'
    newTodoFormDueDateLabel.textContent = 'Due date:'
    const newTodoFormDueDateInput = document.createElement('input')
    newTodoFormDueDateInput.type = 'date'
    newTodoFormDueDateInput.classList.add('new-todo-form-input')
    newTodoFormDueDateInput.id = 'new-todo-form-due-date-input'
    newTodoFormDueDateInput.required = true
    newTodoFormDueDateInput.min = setTodayAsMinimumDueDate()
    newDueDateContainer.appendChild(newTodoFormDueDateLabel)
    newDueDateContainer.appendChild(newTodoFormDueDateInput)
    parentElement.appendChild(newDueDateContainer)
  }

  const createNewTodoFormPriorityInput = parentElement => {
    const newPriorityInputContainer = document.createElement('div')
    newPriorityInputContainer.classList.add('new-todo-form-container')
    const priorityLabel = document.createElement('label')
    priorityLabel.classList.add('new-todo-form-label')
    priorityLabel.textContent = 'Priority level:'
    priorityLabel.htmlFor = 'new-todo-form-priority-input'
    const priorityInput = document.createElement('select')
    priorityInput.classList.add('new-todo-form-input')
    priorityInput.id = 'new-todo-form-priority-input'
    priorityInput.required = true
    const defaultOption = document.createElement('option')
    defaultOption.value = ''
    defaultOption.disabled = true
    defaultOption.selected = true
    defaultOption.hidden = true
    defaultOption.textContent = 'Choose priority level'
    priorityInput.appendChild(defaultOption)
    const highOption = document.createElement('option')
    highOption.value = 'high'
    highOption.textContent = 'high'
    priorityInput.appendChild(highOption)
    const mediumOption = document.createElement('option')
    mediumOption.value = 'medium'
    mediumOption.textContent = 'medium'
    priorityInput.appendChild(mediumOption)
    const lowOption = document.createElement('option')
    lowOption.value = 'low'
    lowOption.textContent = 'low'
    priorityInput.appendChild(lowOption)
    newPriorityInputContainer.appendChild(priorityLabel)
    newPriorityInputContainer.appendChild(priorityInput)
    parentElement.appendChild(newPriorityInputContainer)
  }

  const createSubmitBtn = parentElement => {
    const submitTodoBtn = document.createElement('button')
    submitTodoBtn.classList.add('submit-todo-btn')
    submitTodoBtn.textContent = 'Add todo'
    parentElement.appendChild(submitTodoBtn)
  }

  const onNewTodoSubmit = e => {
    e.preventDefault()
    const parentProject = e.target.closest('.project-card')
    const newTodoForm = parentProject.querySelector('.new-todo-form')
    const todoList = parentProject.querySelector('.todo-list')
    const addTodoBtn = parentProject.querySelector('.fa-plus')
    const newTitle = parentProject.querySelector('#new-todo-form-title-input')
    const newDescription = parentProject.querySelector(
      '#new-todo-form-description-input'
    )
    const newDueDate = parentProject.querySelector(
      '#new-todo-form-due-date-input'
    )
    const newPriority = parentProject.querySelector(
      '#new-todo-form-priority-input'
    )
    const newTodo = Todo(
      newTitle.value,
      newDescription.value,
      newDueDate.value,
      newPriority.value
    )
    let todoArrayLength
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].id === parentProject.id) {
        projects[i].todos.push(newTodo)
        todoArrayLength = projects[i].todos.length
      }
    }
    createTodo(newTodo, todoList)
    resetElementRotation(addTodoBtn)
    removeElement(parentProject, newTodoForm)
    setLocalStorage()
    updateNumTodos(parentProject, todoArrayLength)
  }

  const createNewTodoForm = () => {
    const newTodoForm = document.createElement('form')
    newTodoForm.classList.add('new-todo-form')
    createNewTodoFormTitleInput(newTodoForm)
    createNewTodoFormDescriptionInput(newTodoForm)
    createNewTodoFormDueDateInput(newTodoForm)
    createNewTodoFormPriorityInput(newTodoForm)
    createSubmitBtn(newTodoForm)
    newTodoForm.addEventListener('submit', onNewTodoSubmit)
    return newTodoForm
  }

  const toggleNewTodoForm = e => {
    const parentProject = e.target.closest('.project-card')
    const todoForm = parentProject.querySelector('.new-todo-form')
    const projectAddTodoBtn = parentProject.querySelector('.fa-plus')
    if (!todoForm) {
      const projectFooter = parentProject.querySelector('.project-footer')
      const newTodoForm = createNewTodoForm()
      parentProject.insertBefore(newTodoForm, projectFooter)
      rotateElement(projectAddTodoBtn)
    } else {
      resetElementRotation(projectAddTodoBtn)
      removeElement(parentProject, todoForm)
    }
  }

  const createAddTodoBtn = parentElement => {
    const addTodoBtn = document.createElement('button')
    addTodoBtn.classList.add('add-todo-btn')
    const faPlus = document.createElement('i')
    faPlus.classList.add('fas')
    faPlus.classList.add('fa-plus')
    addTodoBtn.appendChild(faPlus)
    addTodoBtn.addEventListener('click', toggleNewTodoForm)
    parentElement.appendChild(addTodoBtn)
  }

  const createProjectToggler = parentElement => {
    const projectBtn = document.createElement('button')
    projectBtn.classList.add('project-button')
    const faChevron = document.createElement('i')
    faChevron.classList.add('fas')
    faChevron.classList.add('fa-chevron-down')
    projectBtn.appendChild(faChevron)
    projectBtn.addEventListener('click', handleProjectBtnClick)
    parentElement.appendChild(projectBtn)
  }

  const createProjectCardFooter = (projectObj, parentProject) => {
    const projectFooter = document.createElement('footer')
    projectFooter.classList.add('project-footer')
    createFooterNums(projectObj, projectFooter)
    createAddTodoBtn(projectFooter)
    createProjectToggler(projectFooter)
    parentProject.appendChild(projectFooter)
  }

  const createProjectCard = project => {
    const main = document.querySelector('main')
    const projectCard = document.createElement('section')
    projectCard.classList.add('project-card')
    projectCard.classList.add('hide-todo-list')
    projectCard.id = project.id
    createProjectCardHeader(project, projectCard)
    createProjectTodos(project.todos, projectCard)
    createProjectCardFooter(project, projectCard)
    main.appendChild(projectCard)
    return projectCard
  }

  // add new project logic

  const addProjectBtn = document.querySelector('.add-project-btn')
  const addProjectForm = document.querySelector('.add-project-form')
  const projectTitleInput = document.querySelector('#project-title-input')

  const toggleAddProjectForm = e => {
    addProjectForm.classList.toggle('hide-form')
    projectTitleInput.value = ''
  }

  addProjectBtn.addEventListener('click', toggleAddProjectForm)

  const createProject = e => {
    e.preventDefault()
    const newProject = Project(projectTitleInput.value)
    projects.push(newProject)
    createProjectCard(newProject)
    setLocalStorage()
    toggleAddProjectForm()
  }

  addProjectForm.addEventListener('submit', createProject)

  // initiate project

  for (let i = 0; i < projects.length; i++) {
    createProjectCard(projects[i])
  }
}

export { projectsPage }
