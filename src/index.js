import { homepage } from './Home'
import { projectsPage } from './scripts'


const InitialLoad = (() => {
  window.onload = event => {
    homepage()
    projectsPage()

  }

 
})()
