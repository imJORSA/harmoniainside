import ProjectPage from '../ProjectPage.jsx'
import Footer from '../Footer.jsx'
import data from '../../data/vilnius.js'

export default function VilniusApp() {
  return (
    <>
      <ProjectPage {...data} />
      <Footer />
    </>
  )
}
