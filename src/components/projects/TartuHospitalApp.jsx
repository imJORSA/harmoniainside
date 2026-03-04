import ProjectPage from '../ProjectPage.jsx'
import Footer from '../Footer.jsx'
import data from '../../data/tartu_hospital.js'

export default function TartuHospitalApp() {
  return (
    <>
      <ProjectPage {...data} />
      <Footer />
    </>
  )
}
