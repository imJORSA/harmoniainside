import ProjectPage from '../ProjectPage.jsx'
import Footer from '../Footer.jsx'
import data from '../../data/astri.js'

export default function AstriApp() {
  return (
    <>
      <ProjectPage {...data} />
      <Footer />
    </>
  )
}
