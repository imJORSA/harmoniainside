import ProjectPage from '../ProjectPage.jsx'
import data from '../../data/chezandreexterior.js'

export default function AndreExteriorApp() {
  return (
    <>
      <ProjectPage {...data} maxColumns={3} />
    </>
  )
}
