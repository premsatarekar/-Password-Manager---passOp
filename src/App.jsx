import Navbar from './assets/components/Navbar'
import Manager from './assets/components/Manager'
import Footers from './assets/components/Footers'


function App() {

  return (
    <>
    <div>
      <Navbar/>
      <div className='min-h-[87vh]'>
      <Manager/>
      </div>
      <Footers/>
    </div>
    </>
  )
}

export default App
