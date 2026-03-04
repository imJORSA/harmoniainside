import ProjectPage from '../ProjectPage.jsx'
import Footer from '../Footer.jsx'
import data from '../../data/galeria.js'

export default function GaleriaApp() {
  return (
    <>
      <ProjectPage {...data} />
      <Footer />
    </>
  )
}
