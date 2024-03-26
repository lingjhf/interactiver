import { InteractiveView, Tree, Container } from '@interactiver/view'

function App() {
  function initInteractiveView(el: HTMLDivElement) {
    new InteractiveView(el)
  }

  return (
    <div class='h-2000px w-2000px'>
      <div class='w-500px h-500px bg-blue-400' ref={initInteractiveView}>
      </div>
    </div>
  )
}

export default App
