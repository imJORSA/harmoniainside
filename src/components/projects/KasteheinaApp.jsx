import ProjectPage from '../ProjectPage.jsx'
import Footer from '../Footer.jsx'
import data from '../../data/kasteheina.js'

export default function KasteheinaApp() {
  return (
    <>
      <ProjectPage {...data} />
      <Footer />
    </>
  )
}
