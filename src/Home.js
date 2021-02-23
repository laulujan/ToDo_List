const homepage = function () {
  // DOM Elements
  const contentDiv = document.querySelector('#content')

  // Creating Elements
  // Homepage Elements
  const header = document.createElement('header')
  const title = document.createElement('h1')
  title.textContent = 'ToDo List'
  const main = document.createElement('main')
  const container = document.createElement('section')
  container.classList.add('add-project-container')
  const projectBtn = document.createElement('button')
  projectBtn.classList.add('add-project-btn')
  projectBtn.classList.add('hidden')
  projectBtn.textContent = "Add project"
  const form = document.createElement('form')
  form.classList.add('hide-form')
  form.classList.add('add-project-form')
  const label = document.createElement('label')
  label.classList.add('add-project-label')
  label.textContent = 'Title'
  const input = document.createElement('input')
  input.classList.add('add-project-input')
  input.setAttribute('type', 'text');
  input.setAttribute('id', 'project-title-input');
  input.setAttribute('required', 'true');
  const projectBtnSubmit = document.createElement('button')
  projectBtnSubmit.classList.add('add-project-submit')
  const icon = document.createElement('i')
  icon.classList.add('fas')
  icon.classList.add('fa-plus')

  // Appending Elements to Each Other

  contentDiv.appendChild(header)
  header.appendChild(title)
  contentDiv.appendChild(main)
  contentDiv.appendChild(container)
  container.appendChild(projectBtn)
  container.appendChild(form)
  form.appendChild(label)
  form.appendChild(input)
  form.appendChild(projectBtnSubmit)
  projectBtnSubmit.appendChild(icon)
  
}

export { homepage }